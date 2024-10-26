import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { firestore } from '../firebaseconfig';
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';
import moment from 'moment/moment';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);

    localStorage.clear();
    localStorage.setItem('logged', true);
    localStorage.setItem('localEmail', email);

    return response;
  } catch (e) {
    // return e;
    console.log('first');
  }
};

let UserRef = collection(firestore, 'users');
console.log(UserRef);
import { auth } from '../firebaseconfig';
export const RegisterAPI = async (email, password, username) => {
  const user_unique_id = UserUniqueID();

  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    addDoc(UserRef, {
      userEmail: email,
      userUniqueUUID: user_unique_id,
      username,
    });

    return response;
  } catch (err) {
    return false;
  }
};

export function GoogleLoginAPI() {
  try {
    let provider = new GoogleAuthProvider();
    let resp = signInWithPopup(auth, provider);

    return resp;
  } catch (err) {
    return err;
  }
}
import { DateTime } from 'luxon';

export function getTimeFormatMessage() {
  const timestamp = DateTime.now();
  return timestamp.toFormat('yyyyMMddHHmmssSSS');
}

export function getTimeFormatPost(timeformat) {
  return moment().format(timeformat);
}

export const UserUniqueID = () => {
  return uuidv4();
};

export async function GetCurrentUser(findEmailDetails, setPresentLoginUser) {
  const currenUserQuery = await query(
    UserRef,
    where('userEmail', '==', localStorage['localEmail']),
  );

  onSnapshot(currenUserQuery, (response) => {
    // let LoggedUserone = response.docs.map((item) => item.data());

    let LoggedUserone = response.docs.map((item) => {
      return { ...item.data(), userId: item.id };
    });
    // console.log(LoggedUserone, 'LoggedUserone');
    localStorage['userId'] = LoggedUserone[0].userId;
    LoggedUserone['userId'] = LoggedUserone[0].userId;

    localStorage.setItem('myObject', JSON.stringify(LoggedUserone[0]));

    setPresentLoginUser(LoggedUserone[0]);
  });
}
export function LoggedUser() {
  const [presentUser, setCurrentUser] = useState([]);

  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  return presentUser;
}

export async function DifferentProfileDetails(findIdDetails) {
  const document = doc(UserRef, findIdDetails);
  const docSnapShot = await getDoc(document);
  const result = docSnapShot.data();
  return { ...result, userId: findIdDetails };
}

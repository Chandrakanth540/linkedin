import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebaseconfig';
import { useState } from 'react';
let UserRef = collection(firestore, 'users');
export const FollowApi = (userId, targetUserId) => {
  const targetUserDoc = doc(UserRef, targetUserId);
  const targetdocCollection = collection(targetUserDoc, 'FollowRequests');
  const obj = { userId: userId };
  const docSet = doc(targetdocCollection, userId);
  setDoc(docSet, obj);

  const mainUserDoc = doc(UserRef, userId);
  const maindocCollection = collection(mainUserDoc, 'Following');
  const mainobj = {
    userId: targetUserId,
    userFollow: true,
    targetFollow: false,
  };
  const maindocSet = doc(maindocCollection, targetUserId);
  setDoc(maindocSet, mainobj);
};

export const FollowRequestsApi = (setFriendRequests) => {
  const userId = localStorage['userId'];
  console.log('hello beauty', userId);

  if (userId) {
    const mainUserDoc = doc(UserRef, userId);
    const docInsideCollection = collection(mainUserDoc, 'FollowRequests');
    var alldocs = [];

    const unsubscribe = onSnapshot(docInsideCollection, (snapshot) => {
      alldocs = snapshot.docs.map((doc) => doc.id);
      setFriendRequests(alldocs);
    });
    return unsubscribe;
  }
};

export const followingPeople = (setFollowing, setFollowPeopleIds) => {
  const userId = localStorage['userId'];
  if (userId) {
    const mainUserDoc = doc(UserRef, userId);
    const maindocCollection = collection(mainUserDoc, 'Following');

    const unsubscribe = onSnapshot(maindocCollection, (snapshot) => {
      const updatedFollowingPeople = [];
      const followPeopleIds = [];
      snapshot.forEach((doc) => {
        updatedFollowingPeople.push({ userId: doc.id, ...doc.data() });
        followPeopleIds.push(doc.id);
      });
      setFollowing(updatedFollowingPeople);
      setFollowPeopleIds(followPeopleIds);
    });

    return unsubscribe;
  }
};

export const UnFollowPeople = async (targetUserobj) => {
  const unfollowid = targetUserobj.userId;
  const userId = localStorage['userId'];
  if (userId) {
    const mainUserDoc = doc(UserRef, userId);
    const maindocCollection = collection(mainUserDoc, 'Following');
    const targetDocRef = doc(maindocCollection, unfollowid);
    const mainRequestCollection = collection(mainUserDoc, 'FollowRequests');
    const requestDocRef = doc(mainRequestCollection, unfollowid);
    const obj = { userId: unfollowid };
    const mainobj = {
      userId: userId,
      userFollow: true,
      targetFollow: false,
    };
    const mainUserDoctar = doc(UserRef, unfollowid);
    const maindocCollectiontar = collection(mainUserDoctar, 'Following');
    const targetDocReftar = doc(maindocCollectiontar, userId);
    if (targetUserobj.targetFollow && targetUserobj.userFollow) {
      await deleteDoc(targetDocRef);
      await setDoc(requestDocRef, obj);
      await updateDoc(targetDocReftar, mainobj);
    } else {
      await deleteDoc(targetDocRef);
      const removeReq = doc(UserRef, unfollowid);
      const removeReqColl = collection(removeReq, 'FollowRequests');
      const removeReqCollDoc = doc(removeReqColl, userId);
      await deleteDoc(removeReqCollDoc);
    }
  }
};

export const AcceptRequestApi = async (targetId) => {
  const userId = localStorage['userId'];
  if (userId) {
    const mainUserDoc = doc(UserRef, userId);
    const maindocCollection = collection(mainUserDoc, 'Following');
    const obj = { userId: targetId, userFollow: true, targetFollow: true };
    const docSet = doc(maindocCollection, targetId);
    setDoc(docSet, obj);

    const targetUserDoc = doc(UserRef, targetId);
    const targetDocCollection = collection(targetUserDoc, 'Following');
    const targetDocSet = doc(targetDocCollection, userId);
    const targetObj = { userId: userId, userFollow: true, targetFollow: true };
    setDoc(targetDocSet, targetObj);

    const docInsideCollection = collection(mainUserDoc, 'FollowRequests');
    const targetUserRef = doc(docInsideCollection, targetId);
    await deleteDoc(targetUserRef);
    // await addDoc(maindocCollection, targetId);
  }
};

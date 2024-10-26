import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firestore } from '../firebaseconfig';
import { getTimeFormatPost } from './loginapi';
import { orderBy } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { getTimeFormatMessage } from './loginapi';
import { useState } from 'react';
import { toast } from 'react-toastify';

const chatRef = collection(firestore, 'Mainchat');

export const Chatstore = (user_id, targetUser_id, message, dummy) => {
  let secretCode = '';
  if (user_id > targetUser_id) {
    secretCode = user_id + '_' + targetUser_id;
  } else {
    secretCode = targetUser_id + '_' + user_id;
  }
  let docRefOne = doc(chatRef, `${secretCode}`);
  let collectionFromDoc = collection(docRefOne, `${secretCode}`);
  let timeStamp = getTimeFormatMessage();

  let object = {
    userId: user_id,
    targetUserId: targetUser_id,
    message: message,
    timeStamp: timeStamp,
    receivedDateTime: getTimeFormatPost('LLL'),
  };
  addDoc(collectionFromDoc, object)
    .then(() => {
      console.log('Yeah done msg');
    })
    .catch(() => {
      console.log('got error');
    });
  dummy.current.scrollIntoView({ behavior: 'smooth' });
};

export const AccessUserChat = async (
  user_id,
  targetUser_id,
  setBothUserChat,
  // setIsLoading,
  dummy,
) => {
  let secretCode = '';
  if (user_id > targetUser_id) {
    secretCode = user_id + '_' + targetUser_id;
  } else {
    secretCode = targetUser_id + '_' + user_id;
  }

  const docName = doc(chatRef, secretCode);
  const userTargetChat = collection(docName, secretCode);
  const timestampField = 'timeStamp';
  // setIsLoading(true);
  const unsubscribe = onSnapshot(userTargetChat, (snapshot) => {
    const sortedDocs = snapshot.docs
      .map((doc) => ({ ...doc.data(), docId: doc.id }))
      .sort((a, b) => a[timestampField] - b[timestampField]);

    console.log('inside');
    if (user_id != localStorage['userId']) {
      // toast.success('Received message');
    }
    console.log(sortedDocs);
    // setIsLoading(false);
    setBothUserChat(sortedDocs);
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  });
};

export const DeleteMessagePermanent = (user_id, targetUser_id, doc_id) => {
  let secretCode = '';
  if (user_id > targetUser_id) {
    secretCode = user_id + '_' + targetUser_id;
  } else {
    secretCode = targetUser_id + '_' + user_id;
  }
  console.log(doc_id, user_id, targetUser_id);
  const docName = doc(chatRef, secretCode);
  const userTargetChat = collection(docName, secretCode);
  const deletedoc = doc(userTargetChat, doc_id);
  deleteDoc(deletedoc);
};

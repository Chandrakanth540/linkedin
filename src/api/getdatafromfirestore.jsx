import { auth, firestore } from '../firebaseconfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { memo, useState } from 'react';
import PostDataDesign from './postDatadesign';
let dbRef = collection(firestore, 'postData');
export const GetDataFireStore = (setCompleteData, setIsLoading) => {
  setIsLoading(true);
  onSnapshot(dbRef, (resp) => {
    setIsLoading(false);
    setCompleteData(
      resp.docs.map((doc) => {
        return { ...doc.data(), postid: doc.id };
      }),
    );
  });
};

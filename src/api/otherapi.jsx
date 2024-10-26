import { updateDoc } from 'firebase/firestore';
import {
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { firestore } from '../firebaseconfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseconfig';
import { LoggedUser } from './loginapi';
import { firestoreapi } from './firestoreapi';

let LikeRef = collection(firestore, 'LikesForPost');
export const LikeStorage = (user_id, FeedPostId, isLiked, setIsLiked) => {
  // console.log(user_id, FeedPostId, whatLike, 'isit100');

  try {
    let doc_ = doc(LikeRef, `${user_id}_${FeedPostId}`);
    if (!isLiked) {
      setDoc(doc_, { FeedPostId, singleUserId: user_id });
    } else {
      deleteDoc(doc_);
    }
  } catch (err) {
    console.log(err);
  }
  setIsLiked(!isLiked);
};

export const GetLikesInfo = (user_Id, post_Id, setLikesData, setIsLiked) => {
  // console.log(user_Id, post_Id);

  const singleQuery = query(LikeRef, where('FeedPostId', '==', post_Id));

  onSnapshot(singleQuery, (response) => {
    let likes = response.docs.map((item) => item.data());
    let Liked = likes.some((singleLike) => singleLike.singleUserId == user_Id);
    // console.log(likes);
    setLikesData(likes?.length);
    setIsLiked(Liked);
  });
};

export const CheckUpdateData = (updatedata, userData) => {
  const UseFulData = {};
  for (let key in updatedata) {
    if (updatedata[key].length > 0) {
      UseFulData[key] = updatedata[key];
    }
  }
  DatabaseUpdateData(UseFulData, userData);
};

let UserRef = collection(firestore, 'users');
export const DatabaseUpdateData = (UpdatingData, userData) => {
  console.log(UpdatingData, userData);
  let userEdit = doc(UserRef, userData.userId);
  try {
    updateDoc(userEdit, UpdatingData);
    console.log('updated');
  } catch (err) {
    console.log(err);
  }
};

export const ImageUpload = (
  imageFile,
  userData,
  setProgress,
  setImageStore,
  setProfileModal,
) => {
  console.log(imageFile);
  const storageRef = ref(storage, `files/${imageFile.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progresstime = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      setProgress(progresstime);
      // console.log(progress);
    },
    (error) => {
      console.log('failed uploaded');
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        console.log('File available at', response);
        DatabaseUpdateData({ profilePicUrl: response }, localStorage);
        setImageStore('');
        setProfileModal(false);
      });
    },
  );
};

export const postImageUpload = (
  value,
  imageFile,
  userData,
  setProgress,
  setModalOpen,
  setValue,
  setImageForPost,
  content,
) => {
  console.log(imageFile);
  const storageRef = ref(storage, `posts/${imageFile.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      setProgress(progress);
      console.log(progress);
    },
    (error) => {
      console.log('failed uploaded');
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        console.log('File available at', response);
        setModalOpen(false);
        setValue('');
        setImageForPost('');
        setProgress(0);
        var objPost = {};
        if (content == 'image') {
          objPost = { userPost: value, postImageUrl: response };
        } else if (content == 'video') {
          objPost = { userPost: value, postVideoUrl: response };
        }
        firestoreapi(objPost, userData);
        // postImageGetting({ postImageUrl: response });
      });
    },
  );
};

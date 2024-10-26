import { firestore } from '../firebaseconfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { getTimeFormatPost } from './loginapi';
import { auth } from '../firebaseconfig';
import { postImageUpload } from './otherapi';

let dbRef = collection(firestore, 'postData');
// import { doc,deleteDoc } from "firebase/firestore";
export const firestoreapi = (dataFromhomeModel, loggedUser) => {
  let object = {
    UserTimeStamp: getTimeFormatPost('LLL'),
    userEmail: auth.currentUser.email,
    userId: loggedUser.userId,
  };
  for (let key in dataFromhomeModel) {
    if (dataFromhomeModel[key].length > 0) {
      object[key] = dataFromhomeModel[key];
    }
  }

  addDoc(dbRef, object)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const DeletePost = async (postId) => {
  let docu = doc(dbRef, postId);
  try {
    await deleteDoc(docu);
    console.log('Post deleted successfully.');
  } catch (error) {
    console.log('Error deleting post:', error);
  }
};

let UserRef = collection(firestore, 'users');
export const ChatUsersData = async (setFriends) => {
  var alldocs = [];
  const docref = await getDocs(UserRef);

  docref.forEach((doc) => {
    alldocs.push({ ...doc.data(), userId: doc.id });
  });
  console.log(alldocs);
  setFriends(alldocs);
};

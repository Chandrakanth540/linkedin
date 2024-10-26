import { useMemo, useState } from 'react';
import { GetLikesInfo, LikeStorage } from './otherapi';
import { GetCurrentUser } from './loginapi';
import { useOutletContext } from 'react-router';
const LikeSymbolComponent = (details) => {
  const [LikesData, setLikesData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  // const [userData, setCurrentUser] = useState([]);

  // useMemo(() => {
  //   GetCurrentUser(setCurrentUser);
  // }, []);
  const userData = useOutletContext();

  const post_Id = details.PostId;

  const user_Id = userData.userId;
  const HandleLikeBtn = () => {
    LikeStorage(user_Id, post_Id, isLiked);
    setIsLiked(!isLiked);
  };
  useMemo(() => {
    GetLikesInfo(user_Id, post_Id, setLikesData, setIsLiked);
  }, [post_Id, user_Id]);

  return (
    <>
      <p>
        <button onClick={() => HandleLikeBtn()}>Like{LikesData}</button>
      </p>
    </>
  );
};
export default LikeSymbolComponent;

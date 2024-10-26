import { NavLink, useOutletContext } from 'react-router-dom';
import LikeSymbolComponent from '../api/likesymbcompo';
import { DeletePost } from '../api/firestoreapi';
import '../../src/css/postcomponent.scss';
import profilepic from '../assets/images/profilepic.svg';
import { BsEmojiSmileUpsideDown, BsThreeDots } from 'react-icons/bs';
import { AiFillDelete, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaCommentDots, FaRegCommentDots } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineRepeatOne } from 'react-icons/md';
import { RiEyeLine, RiRepeatLine, RiShareCircleFill } from 'react-icons/ri';
import { useEffect, useMemo, useState } from 'react';
import postImg from '../../src/assets/images/img3.jpg';
import bluetick from '../../src/assets/images/bluetick.png';
import {
  DifferentProfileDetails,
  GetCurrentUser,
  LoggedUser,
} from '../api/loginapi';
import { GetLikesInfo } from '../api/otherapi';
import { LikeStorage } from '../api/otherapi';
import ImagePreview from './common/extra/imagepreview';
import { Avatar, Image, Skeleton } from 'antd';
import { TiUserOutline } from 'react-icons/ti';
let targetUsersInfo = {};
const PostComponent = (item) => {
  // const userData = LoggedUser();
  // console.log(userData, 'extra');
  // const outletCon=useOutletContext()
  const [previewImage, setPreviewImage] = useState(false);
  const outletCon = useOutletContext();
  const [options, setOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesData, setLikesData] = useState(0);
  const [isComment, setIsComment] = useState(false);
  useEffect(() => {
    GetLikesInfo(outletCon.userId, item.postid, setLikesData, setIsLiked);
  }, [item.postid, outletCon.userId]);
  const deletePost = (postDetails) => {
    DeletePost(postDetails.userPostId);
  };

  const onLikeClickHandle = () => {
    LikeStorage(outletCon.userId, item.postid, isLiked, setIsLiked);
  };
  const [bringData, setBringData] = useState({});

  useEffect(() => {
    if (outletCon.userId != item.userId) {
      getDifferentIdDetails();
    } else {
      setBringData(outletCon);
    }
  }, [outletCon, item.userId]);
  async function getDifferentIdDetails() {
    const result = await DifferentProfileDetails(item.userId);
    setBringData(result);
  }

  return (
    <>
      <section className="section-main">
        <div className="for-flex-dots">
          <div className="pic-name-head-div">
            <NavLink
              to={`/homecomponent/profilepage?id=${item.userId}`}
              state={item}
            >
              <div>
                <Avatar
                  size={60}
                  src={bringData.profilePicUrl}
                  icon={<TiUserOutline />}
                />
                {/* <img
                  src={bringData?.profilePicUrl || profilepic}
                  alt=""
                  className="profile-pic-post"
                /> */}
              </div>
              <div className="username-time-div">
                <div>
                  {bringData ? bringData.username : 'UnKnown'}
                  {bringData?.bluetick && (
                    <img
                      src={bluetick}
                      alt="not a prblm"
                      height={13}
                      width={13}
                    />
                  )}
                </div>
                <div className="post-timestamp">{item.UserTimeStamp}</div>
              </div>
            </NavLink>
          </div>
          <div className="dots-fixing">
            <button onClick={() => setOptions(!options)}>
              {options ? <RxCross2 /> : <BsThreeDots />}
            </button>
            {options ? (
              <>
                <div className="image-preview-div-main">
                  <div onClick={() => setPreviewImage(!previewImage)}>
                    <RiEyeLine />
                  </div>
                  <div className="image-preview-Image">
                    <Image width={15} src={item.postImageUrl} />
                  </div>
                </div>
                <div>
                  {item.userId == outletCon.userId ? (
                    <AiFillDelete
                      onClick={() => {
                        deletePost({ userPostId: item.postid });
                        setOptions(!options);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div
          className="post-content-main"
          dangerouslySetInnerHTML={{ __html: item?.userPost }}
        ></div>
        <div className="post-img-div">
          {item?.postImageUrl && (
            <img src={item?.postImageUrl} alt="" className="post-img" />
          )}
        </div>
        <div className="post-img-div">
          {item?.postVideoUrl && (
            <video controls className="post-video">
              <source src={item?.postVideoUrl} type="video/mp4" />
              <source src={item?.postVideoUrl} type="video/mpeg" />
              <source src={item?.postVideoUrl} type="video/quicktime" />
              <source src={item?.postVideoUrl} type="video/x-msvideo" />
              <source src={item?.postVideoUrl} type="video/x-matroska" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="post-footer">
          <div>
            <button
              className="post-btns-like-cmnt"
              onClick={() => onLikeClickHandle()}
            >
              <div className="like-div-name">
                {!isLiked ? (
                  <AiOutlineLike size={30} />
                ) : (
                  <AiFillLike size={30} id="fillLikeanim" />
                )}
                <div className="like-Name">{likesData} Likes</div>
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => setIsComment(!isComment)}
              className="post-btns-like-cmnt"
            >
              <div className="comment-div-name">
                {!isComment ? (
                  <FaRegCommentDots size={30} />
                ) : (
                  <FaCommentDots size={30} />
                )}
                <div className="comment-Name">comment</div>
              </div>
            </button>
          </div>

          <div className="repost-div">
            <RiRepeatLine size={30} />
            <div>Repost</div>
          </div>
          <div className="share-div">
            <RiShareCircleFill size={30} />
            <div>Share</div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PostComponent;

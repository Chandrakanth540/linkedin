import { IoMdPeople } from 'react-icons/io';
import defimg from '../../src/assets/images/img4.jpg';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FollowApi } from '../api/followers';
import { auth } from '../firebaseconfig';
import { useUserData } from '../maintopbar';
import { useState } from 'react';
import { TiUserOutline } from 'react-icons/ti';
import { Avatar, Skeleton } from 'antd';
let followed = [];
const FriendIndex = (prop) => {
  const friendData = prop.prop;
  const { presentLoginUser } = useUserData();
  console.log(presentLoginUser, 'panja');

  const FollowButtonHandler = () => {
    // toast.success('clicked');
    followed.push(friendData.userId);
    FollowApi(presentLoginUser.userId, friendData.userId);
  };

  return (
    <>
      {friendData.userId != presentLoginUser.userId ? (
        <section className="section-main-friend">
          <div className="div-friend-index">
            <NavLink to={`/homecomponent/profilepage?id=${friendData.userId}`}>
              <div>
                <Avatar
                  size={100}
                  src={friendData.profilePicUrl}
                  icon={<TiUserOutline />}
                />
              </div>
            </NavLink>
            <div className="username-headline-friend">
              <span className="friend-username">
                {friendData ? (
                  friendData.username || 'Unknown'
                ) : (
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 4,
                    }}
                    active
                  />
                )}
              </span>
              <span className="friend-headline">
                {friendData.headline || 'Power'}
              </span>
            </div>
          </div>
          <div>
            <button
              className="frnd-rqst-btn"
              onClick={() => FollowButtonHandler()}
            >
              Follow
              <IoMdPeople className="frnd-rqst-icon" size={20} />
            </button>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};
export default FriendIndex;

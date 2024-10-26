import { NavLink } from 'react-router-dom';
import defimg from '../../assets/images/img5.jpg';
import { IoMdPeople } from 'react-icons/io';
import { useState } from 'react';
import { useEffect } from 'react';
import { DifferentProfileDetails } from '../../api/loginapi';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { UnFollowPeople } from '../../api/followers';

import { Avatar } from 'antd';
import { TiUser, TiUserAddOutline, TiUserOutline } from 'react-icons/ti';
let GlobalUsersData = {};
const FollowingComp = (prop) => {
  const { userId } = prop;
  console.log(prop, 'rase untade');
  const [friendData, setFriendData] = useState([]);
  useEffect(() => {
    if (GlobalUsersData[userId]) {
      // If the data for the userId exists in the GlobalUsersData, use it directly
      setFriendData(GlobalUsersData[userId]);
    } else {
      fetchData(userId);
    }

    // Cleanup function to prevent state update after component unmounts
    return () => {
      setFriendData([]);
    };
  }, [userId]);
  // console.log(result);
  const fetchData = async (userId) => {
    const result = await DifferentProfileDetails(userId);
    setFriendData(result);

    // Store the fetched data in the GlobalUsersData
    GlobalUsersData[userId] = result;
  };

  const UnFollowButtonHandler = async (userId) => {
    await UnFollowPeople(prop);
  };

  return (
    <section className="section-main-friend-following">
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
            {friendData.username || 'Name'}
          </span>
          <span className="friend-headline">
            {friendData.headline || 'Headline'}
          </span>
        </div>
      </div>
      <div>
        <p className="frnd-following-btn">
          <RiUserFollowFill className="frnd-following-icon" size={15} />
          Following
        </p>
      </div>

      <div className="btns-div-unfollow">
        <button
          className="frnd-unfollow-btn"
          onClick={() => UnFollowButtonHandler(friendData.userId)}
        >
          UnFollow
          <RiUserUnfollowFill className="frnd-rqst-icon" size={15} />
        </button>
      </div>
    </section>
  );
};
export default FollowingComp;

// .frnd-unfollow-btn {
//   padding: 16px;
//   text-align: center;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 3px;
//   background-color: hsla(0, 100%, 50%, 0.13);

//   outline: none;
//   font-weight: 700;
//   border: none;
//   border-radius: 20px;
// }

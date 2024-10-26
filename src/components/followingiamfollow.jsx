import { useEffect } from 'react';
import { followingPeople } from '../api/followers';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosPeople, IoMdPeople } from 'react-icons/io';
import defimg from '../assets/images/img5.jpg';
import { useReducer } from 'react';
import FollowingComp from './topbariconComponents/followingcomp';
import { useUserData } from '../maintopbar';
import { Empty } from 'antd';

const FollowingPeople = () => {
  const { following } = useUserData();
  // useEffect(() => {
  //   getfollow();
  // }, []);
  // const [following, setFollowing] = useState([]);
  // const getfollow = async () => {
  //   const result = await followingPeople();
  //   setFollowing(result);
  // };
  // console.log(following, 'value');

  return (
    <>
      <div className="following-name-div">
        <IoIosPeople size={40} />
        <p>Perfiles que sigues</p>
      </div>
      {following.length > 0 ? (
        <div className="friend-index-main">
          {following.map((friendData) => {
            return <FollowingComp {...friendData} />;
          })}
        </div>
      ) : (
        <div className="empty-sign-friend-requests">
          <Empty
            description="Currently, you follow no one"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
    </>
  );
};
export default FollowingPeople;

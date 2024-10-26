import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import defimg from '../../src/assets/images/profilepic.svg';
// import defimg from '../../src/assets/images/img4.jpg';
import { DifferentProfileDetails } from '../api/loginapi';
import { Avatar, Skeleton } from 'antd';
import { TiUserOutline } from 'react-icons/ti';
import { BsPersonFillCheck } from 'react-icons/bs';
import { AcceptRequestApi } from '../api/followers';
const FriendRequests = (prop) => {
  const userId = prop.userId;
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    GetRequestUser();
  }, [userId]);
  const GetRequestUser = async () => {
    const result = await DifferentProfileDetails(userId);
    setFriendRequests(result);
  };

  const AcceptBtnHandler = async (targetId) => {
    await AcceptRequestApi(targetId);
  };
  return (
    <>
      {friendRequests ? (
        <section className="section-main-friend">
          <div className="div-friend-index">
            <NavLink
              to={`/homecomponent/profilepage?id=${friendRequests.userId}`}
            >
              <div className="friend-img-div">
                <Avatar
                  size={100}
                  icon={<TiUserOutline />}
                  src={friendRequests.profilePicUrl}
                />
              </div>
            </NavLink>
            <div className="username-headline-friend">
              <span className="friend-username">
                {friendRequests.username || <div>Unknown</div>}
                {/* {friendRequests ? friendRequests.username : <Skeleton active />} */}
              </span>
              <span className="friend-headline">
                {friendRequests.headline || 'Power'}
              </span>
            </div>
          </div>
          <div>
            <button
              className="frnd-rqst-btn"
              onClick={() => AcceptBtnHandler(friendRequests.userId)}
              style={{ backgroundColor: '#D5F5E3' }}
            >
              Accept
              <BsPersonFillCheck className="frnd-rqst-icon" size={15} />
            </button>
          </div>
        </section>
      ) : (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
          active
        />
      )}
    </>
  );
};
export default FriendRequests;

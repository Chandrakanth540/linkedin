import { useEffect, useState } from 'react';
import { ChatUsersData } from '../api/firestoreapi';
import '../css/friendcomponent.scss';
import { NavLink } from 'react-router-dom';
import FriendIndex from './friendsindex';
import { Outlet } from 'react-router-dom';
import { Badge } from 'antd';
import { useUserData } from '../maintopbar';
import WaterFloatBtn from './topbariconComponents/watermarkbtn';
const FriendComponent = () => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    ChatUsersData(setFriends);
  }, []);
  const { friendRequests } = useUserData();

  return (
    <>
      <section>
        <div className="title-heads-friend-request">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'friendscomp-nav-active' : 'friendscomp-nav-inactive'
            }
            to="/homecomponent/friends"
            end
          >
            <div>
              <p>Friends</p>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'friendscomp-nav-active' : 'friendscomp-nav-inactive'
            }
            to="/homecomponent/friends/reqstfrnds"
          >
            <div>
              <p className="requests-p">
                Requests
                <Badge count={friendRequests.length} size={'small'} />
              </p>
            </div>
          </NavLink>
        </div>
      </section>
      <WaterFloatBtn />
      <Outlet />
    </>
  );
};
export default FriendComponent;

import { createContext, useContext, useEffect, useState } from 'react';
import Topbar from './components/topbarcomponent';
import { GetCurrentUser } from './api/loginapi';
import { auth } from './firebaseconfig';
import { Outlet } from 'react-router';
import { ChatUsersData } from './api/firestoreapi';
import { FollowRequestsApi, followingPeople } from './api/followers';
import { useReducer } from 'react';
import { FloatButton, Popover, Spin } from 'antd';
import { ThreeDots } from 'react-loader-spinner';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GiThreeFriends } from 'react-icons/gi';
// import { IoChatbubblesOutline } from 'react-icons/io';
import { BsChatText } from 'react-icons/bs';
import { BarLoader } from 'react-spinners';
// import { BarLoader } from 'react-spinners/BarLoader';
// export const initialState = {
//   idWithDetails: {},
// };

// export const reducer = (state, action) => {
//   if (action.type === 'IdDetails') {
//     const detail = action.payload;
//     return {
//       ...state,
//       idWithDetails: {
//         ...state.idWithDetails,
//         [detail.userId]: detail,
//       },
//     };
//   }
//   return state; // Return the state for other action types
// };
export const userDetailsContext = createContext();

export const useUserData = () => useContext(userDetailsContext);

const MainTopBar = () => {
  const [presentLoginUser, setPresentLoginUser] = useState({});
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followPeopleIds, setFollowPeopleIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await GetCurrentUser(localStorage['localEmail'], setPresentLoginUser);
      await ChatUsersData(setFriends);
      await FollowRequestsApi(setFriendRequests);
      await followingPeople(setFollowing, setFollowPeopleIds);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  console.log(following, friendRequests, 'gnan');

  return (
    <>
      {!isLoading ? (
        <userDetailsContext.Provider
          value={{
            presentLoginUser,
            friendRequests,
            friends,
            following,
            followPeopleIds,
          }}
        >
          <Topbar />
        </userDetailsContext.Provider>
      ) : (
        <>
          <div className="loader-starting-home">
            {/* <Spin tip="Loading..." size="large">
              <div className="content" />
            </Spin> */}
            <div>
              Enlace <span>Hub</span>
            </div>
            <BarLoader color="#36d7b7" width={150} />
          </div>
        </>
      )}
    </>
  );
};
export default MainTopBar;

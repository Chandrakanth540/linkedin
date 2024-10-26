import { createContext, useState } from 'react';
import Headtitle from '../headtitle';
import SignOutPopUp from './common/popup/signoutpop';
import { AiOutlineSearch, AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { TiSocialYoutube, TiUserOutline } from 'react-icons/ti';
import profile from '../assets/images/profilepic.svg';
import {
  BsFillBriefcaseFill,
  BsPeopleFill,
  BsPeople,
  BsChat,
  BsChatFill,
  BsBriefcase,
} from 'react-icons/bs';
import { RiSearchFill } from 'react-icons/ri';
import { ImHome3 } from 'react-icons/im';
import { Avatar, Button, Popover } from 'antd';
import { IoMdNotificationsOutline, IoMdNotifications } from 'react-icons/io';
import { TbGridDots, TbChartGridDots } from 'react-icons/tb';
import { CgYoutube } from 'react-icons/cg';
import '../css/topbarcomp.scss';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import { useOutletContext } from 'react-router-dom';
import { GetCurrentUser } from '../api/loginapi';
import { useMemo } from 'react';
const Topbar = () => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const text = <span>Title</span>;
  // const userData = useLocation();
  const navigate = useNavigate();
  const [popupOne, setpopupOne] = useState(false);

  const [iconClicked, setIconClicked] = useState({
    search: false,
    home: false,
    people: false,
    briefcase: false,
    chat: false,
    notification: false,
    profile: false,
    setting: false,
    video: false,
  });
  const duplicate = {
    search: false,
    home: false,
    people: false,
    briefcase: false,
    chat: false,
    notification: false,
    profile: false,
    setting: false,
    video: false,
  };

  // console.log(iconClicked,duplicate)
  const topbaxnavActive = {
    boxShadow: '1px 1px 1px 1px black',
  };

  const signOutFromAccount = () => {
    console.log('master');
    toast.success('logout successful');
  };
  const [userData, setCurrentUser] = useState({});

  useMemo(() => {
    GetCurrentUser(localStorage['localEmail'], setCurrentUser);
  }, []);
  // console.log(userData, 'kind');

  return (
    <>
      <div className="topbar-home">
        <div>
          <Headtitle />
        </div>

        {/* --------------------------------------------------------------- */}

        <div>
          <NavLink to="/homecomponent/settings">
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <RiSearchFill size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">search</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <AiOutlineSearch size={30} />
                </div>
              )
            }
          </NavLink>
        </div>
        {/* ------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------------------- */}
        <div>
          <NavLink to="/homecomponent" end>
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <ImHome3 size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">Home</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <AiOutlineHome size={30} />
                </div>
              )
            }
          </NavLink>
        </div>

        {/* ---------------------------------------------- */}

        <div>
          <NavLink to="/homecomponent/friends">
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <BsPeopleFill size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">Friends</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <BsPeople size={30} />
                </div>
              )
            }
          </NavLink>
        </div>

        {/* ------------------------------------------------ */}
        <div>
          <NavLink to="/homecomponent/business">
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <BsFillBriefcaseFill size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">Business</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <BsBriefcase size={30} />
                </div>
              )
            }
          </NavLink>
        </div>
        {/* --------------------------------------------- */}

        <div>
          <NavLink to="/homecomponent/chatbox">
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <BsChatFill size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">Chat</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <BsChat size={30} />
                </div>
              )
            }
          </NavLink>
        </div>

        {/* ------------------------------------------------------ */}

        <div>
          <NavLink to="/homecomponent/notification">
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <IoMdNotifications size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">Notifi..</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <IoMdNotificationsOutline size={30} />
                </div>
              )
            }
          </NavLink>
        </div>

        {/* ----------------------------------------------- */}
        <div>
          <NavLink to={`/homecomponent/profilepage?id=${userData.userId}`}>
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      {/* <img
                        src={userData?.profilePicUrl || profile}
                        alt=""
                        height={31}
                        width={31}
                        // onClick={() => {
                        //   signOut(auth);
                        //   navigate('/');
                        //   localStorage.clear();
                        // }}
                        className="topbarprofilepic"
                      /> */}
                      <Avatar
                        size={45}
                        src={userData.profilePicUrl}
                        icon={<TiUserOutline />}
                      />
                    </div>
                    <div>
                      <span className="span-icon-name">Notifi..</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  {/* <img
                    src={userData?.profilePicUrl || profile}
                    alt=""
                    height={31}
                    width={31}
                    className="topbarprofilepic"
                  /> */}
                  <Avatar
                    size={45}
                    src={userData.profilePicUrl}
                    icon={<TiUserOutline />}
                  />
                </div>
              )
            }
          </NavLink>
        </div>

        {/* -------------------------------------------------------- */}
        <div>
          <Popover
            placement="bottom"
            title={text}
            content={
              <div>
                <div>
                  <button
                    onClick={() => {
                      signOut(auth);
                      navigate('/');
                      localStorage.clear();
                    }}
                  >
                    signout
                  </button>
                </div>
                <div>
                  <button>
                    <NavLink to="/homecomponent/following">Followers</NavLink>
                  </button>
                </div>
              </div>
            }
            trigger="click"
          >
            {/*<NavLink
            // to="/homecomponent/settings"
            // onClick={() => {
            //   signOut(auth);
            //   navigate('/');
            //   localStorage.clear();
            // }}
            >
              {({ isActive }) =>
                !isActive ? (
                  <>
                    <div>
                      <div className="topbaxnavActive topnavicons">
                        <TbChartGridDots size={30} />
                      </div>
                      <div>
                        <span className="span-icon-name">Settings</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="topnavicons">
                    <TbGridDots size={30} />
                  </div>
                )
              }
            </NavLink>*/}
            <div className="topnavicons">
              <TbGridDots size={30} />
            </div>
          </Popover>
        </div>
        {/* ------------------------------------------------------- */}

        <div>
          <NavLink to="/homecomponent/settings">
            {({ isActive }) =>
              isActive ? (
                <>
                  <div>
                    <div className="topbaxnavActive topnavicons">
                      <TiSocialYoutube size={30} />
                    </div>
                    <div>
                      <span className="span-icon-name">Video</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="topnavicons">
                  <CgYoutube size={30} />
                </div>
              )
            }
          </NavLink>
        </div>
        {/* ------------------------------------------------ */}
      </div>
      <Outlet context={userData} />
    </>
  );
};
export default Topbar;

import '../../src/css/chatcomponent.scss';
import { NavLink } from 'react-router-dom';
import SingleChatPlot from './singlechatplot';
import { Card } from 'antd';
import defimg from '../../src/assets/images/img9.webp';
import { useEffect } from 'react';
import { useState } from 'react';
import { DifferentProfileDetails } from '../api/loginapi';
const ChatFriendComponent = (prop) => {
  console.log(prop);

  const { friend } = prop;

  const [chatFriend, setChatFriend] = useState([]);
  useEffect(() => {
    bringData();
  }, []);
  const bringData = async () => {
    const result = await DifferentProfileDetails(friend);
    setChatFriend(result);
  };
  console.log(chatFriend, 'lavada');

  return (
    <>
      {/* <Card
        // title="Card title"
        bordered={false}
        // style={{
        //   width: 300,
        // }}
      > */}
      <section>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'navlink-active-chatfriend' : ''
          }
          to={`singlechatplot?id=${chatFriend.userId}`}
          end
        >
          <div className="chatfriend-main-div">
            <div>
              {chatFriend.profilePicUrl ? (
                <img
                  src={chatFriend?.profilePicUrl}
                  alt=""
                  className="chatfrnd-profilepic"
                />
              ) : (
                <img src={defimg} alt="" className="chatfrnd-profilepic" />
              )}
            </div>
            {chatFriend.username ? (
              <div>
                <p className="chatfrnd-name">{chatFriend?.username}</p>
              </div>
            ) : (
              <div>
                <p className="chatfrnd-name">Elijah</p>
              </div>
            )}
          </div>
        </NavLink>
      </section>
      {/* </Card> */}
    </>
  );
};
export default ChatFriendComponent;

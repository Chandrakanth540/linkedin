import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { DifferentProfileDetails } from '../api/loginapi';
import {
  AccessUserChat,
  Chatstore,
  DeleteMessagePermanent,
} from '../api/chatapi';
import { BsFillSendFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Watermark, message } from 'antd';
import { AiOutlineSend } from 'react-icons/ai';
// import { IoSendOutline } from 'react-icons/io';
import { Button, Popover } from 'antd';
import { useUserData, userDetailsContext } from '../maintopbar';

const SingleChatPlot = () => {
  const { presentLoginUser } = useUserData();
  console.log(presentLoginUser, 'its presentuser chatplot');

  const dummy = useRef();
  const text = <span>Title</span>;
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const [targetUserData, setTargetUserData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetUserId = searchParams.get('id');
  useEffect(() => {
    getUserDetails(targetUserId);
  }, [targetUserId]);
  const getUserDetails = async (targetUserId) => {
    const result = await DifferentProfileDetails(targetUserId);
    // localStorage.setItem(cacheKey, JSON.stringify(result));
    setTargetUserData(result);
  };
  console.log(targetUserData);
  const outletCon = useOutletContext();
  console.log(outletCon, targetUserData);
  // const [isLoading, setIsLoading] = useState(false);
  const [bothUserChat, setBothUserChat] = useState([]);
  const [Message, setMessage] = useState('');
  // ---------------------------------------
  // const cacheKey = `${targetUserId}`;
  // const cachedChat = useMemo(() => {
  //   const cachedData = localStorage.getItem(cacheKey);
  //   return cachedData ? JSON.parse(cachedData) : null;
  // }, [cacheKey]);
  // useEffect(() => {
  //   if (!cachedChat) {
  //     getUserDetails(targetUserId);
  //   }
  // }, [cachedChat]);
  // ---------------------------------------

  const SendMessage = () => {
    const trigger = 'click';
    setMessage('');
    Chatstore(outletCon.userId, targetUserId, Message, dummy);
    dummy.current.scrollIntoView({ behavior: 'smooth' });
    // AccessUserChatOnSendMessage();
  };
  const GettingChat = async () => {
    const trigger = 'click';
    await AccessUserChat(
      outletCon.userId,
      targetUserId,
      setBothUserChat,
      // setIsLoading,
      dummy,
    );
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  useMemo(() => {
    GettingChat();
  }, [outletCon.userId, targetUserId]);

  const messageDeleteHandle = (docId) => {
    const trigger = 'click';
    DeleteMessagePermanent(outletCon.userId, targetUserId, docId);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && Message.length > 0) {
      // Call your function here
      event.preventDefault();
      SendMessage();
      setMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (event.key == 'ArrowDown') {
      setMessage((prev) => prev + '\n');
    }
  };
  // useEffect(() => {
  //   if (dummy.current) {
  //     dummy.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, []);
  // if (dummy.current) {
  //   dummy.current.scrollIntoView({ behavior: 'smooth' });
  // }
  return (
    <>
      <section className="singlechatplot-section">
        <div className="singlechatplot-name-pic-div">
          <div>
            <img
              src={targetUserData.profilePicUrl}
              alt="profile-pic"
              className="chat-left-top-image"
            />
          </div>
          <div>
            <h3>{targetUserData.username}</h3>
          </div>
        </div>
        <Watermark content={targetUserData.username}>
          <div className="chat-box-main-div">
            {bothUserChat.length > 0 ? (
              bothUserChat.map((msg) => {
                return (
                  <div>
                    {msg.userId == outletCon.userId ? (
                      <Popover
                        placement="top"
                        title={''}
                        // content={content}
                        content={
                          <div className="del-for-every-div">
                            <button
                              onClick={() => messageDeleteHandle(msg.docId)}
                            >
                              <RiDeleteBin5Line />
                              unsend
                            </button>

                            {msg ? msg.receivedDateTime : msg.timeStamp}
                          </div>
                        }
                        trigger="click"
                      >
                        <div className="loginUser-msg-div">
                          <p>{msg.message}</p>
                        </div>
                      </Popover>
                    ) : (
                      <div className="targetUser-msg-div">
                        <p>{msg.message}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <h3
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Start conversation
              </h3>
            )}
          </div>
        </Watermark>
        <div ref={dummy}></div>

        <div className="msg-send-input-box">
          <div>
            <textarea
              className="textarea"
              onKeyDown={handleKeyPress}
              value={Message}
              spellCheck={false}
              name=""
              id=""
              cols="70"
              rows="1"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="send-icon">
            {Message.length > 0 ? (
              <button className="send-icon-btn" onClick={() => SendMessage()}>
                <IoMdSend size={30} />
              </button>
            ) : (
              <button className="send-icon-btn">
                <AiOutlineSend size={30} />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default SingleChatPlot;

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AccessUserChat, Chatstore } from '../../api/chatapi';
import { LoggedUser, getTimeFormatMessage } from '../../api/loginapi';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore';
const RoughBook = () => {
  const [Message, setMessage] = useState('');
  const loginUser = LoggedUser();
  const location = useLocation();
  const item = new URLSearchParams(location.search).get('data');
  const data = item ? JSON.parse(decodeURIComponent(item)) : null;

  const AccessUserChatOnSendMessage = async () => {
    await AccessUserChat(loginUser.userId, data.userId, setBothUserChat);
  };

  const SendMessage = () => {
    Chatstore(loginUser.userId, data.userId, Message);
    AccessUserChatOnSendMessage();
  };

  const [bothUserChat, setBothUserChat] = useState([]);
  useEffect(() => {
    AccessUserChat(loginUser.userId, data.userId, setBothUserChat);
  }, []);

  return (
    <>
      {bothUserChat.map((item) => {
        return (
          <>
            <div>
              {item.userId == loginUser.userId ? (
                <div
                  style={{
                    textAlign: 'right',
                    color: 'black',
                    backgroundColor: 'gray',
                  }}
                >
                  <h2>{item.message}</h2>
                </div>
              ) : (
                <h2
                  style={{
                    textAlign: 'left',
                    color: 'red',
                    backgroundColor: 'wheat',
                  }}
                >
                  {item.message}
                </h2>
              )}
            </div>
          </>
        );
      })}
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => SendMessage()}>send</button>
      </div>
      <div>RoughBook</div>;
    </>
  );
};
export default RoughBook;

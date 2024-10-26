import { useEffect, useState } from 'react';
import { ChatUsersData } from '../../api/firestoreapi';
import ChatFriendComponent from '../chatfriendscomp';
import { Outlet, useLoaderData, useOutletContext } from 'react-router';
import '../../css/chatcomponent.scss';
import { Card, Watermark } from 'antd';
import Split from 'react-split';
import SingleChatPlot from '../singlechatplot';
import { useUserData } from '../../maintopbar';

const ChatTopBarComponent = () => {
  // const useOutletCon = useOutletContext();

  const { followPeopleIds } = useUserData();
  console.log(followPeopleIds, 'newone');

  return (
    <>
      <Split className="split">
        <div className="div-main-chat-cmp">
          <Card className="card-for-names">
            {followPeopleIds.map((friend) => {
              return (
                <>
                  <div className="">
                    <ChatFriendComponent friend={friend} />
                  </div>
                </>
              );
            })}
          </Card>
        </div>
        <div>
          {/* <Outlet context={useOutletCon} /> */}
          {/* </Watermark> */}
          <SingleChatPlot />
        </div>
      </Split>
    </>
  );
};
export default ChatTopBarComponent;

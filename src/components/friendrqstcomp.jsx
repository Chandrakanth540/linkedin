import { useEffect, useState } from 'react';
import { FollowRequestsApi } from '../api/followers';
import FriendRequests from './friendrequests';
import { useLoaderData } from 'react-router';
import { Empty, Watermark } from 'antd';
import { useUserData } from '../maintopbar';

const FriendRqstComp = () => {
  const { friendRequests } = useUserData();
  return (
    <>
      {friendRequests.length > 0 ? (
        <Watermark content="Enlace Hub">
          <div className="friend-index-main">
            {friendRequests.map((singleRqst) => {
              return <FriendRequests userId={singleRqst} />;
            })}
          </div>
        </Watermark>
      ) : (
        <div className="empty-sign-friend-requests">
          <Empty
            description="No Requests"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
    </>
  );
};
export default FriendRqstComp;

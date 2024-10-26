import { useEffect, useState } from 'react';
import { ChatUsersData } from '../api/firestoreapi';
import FriendIndex from './friendsindex';
import { FollowRequestsApi } from '../api/followers';
import { useLoaderData } from 'react-router';
import { Watermark } from 'antd';
import { useReducer } from 'react';
import { initialState, reducer } from './common/extra/usereducer';
import { useUserData } from '../maintopbar';
import { useContext } from 'react';
let friends = null;

const FriendToRequest = () => {
  const result = useUserData();
  console.log(result, 'alluserdata');

  const { friendRequests, friends, following, followPeopleIds } = useUserData();

  return (
    <Watermark content="Enlace Hub">
      <div className="friend-index-main">
        {friends.map((oneFrnd) => {
          return (
            <>
              {friendRequests != null &&
              !followPeopleIds.includes(oneFrnd.userId) &&
              !friendRequests.includes(oneFrnd.userId) &&
              !following.includes(oneFrnd.userId) ? (
                <FriendIndex prop={oneFrnd} />
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
    </Watermark>
  );
};
export default FriendToRequest;

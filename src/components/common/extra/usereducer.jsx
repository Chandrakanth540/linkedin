export const initialState = {
  friends: [],
  friendRequests: [],
  presentLoginUser: {},
};
export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FRIENDS':
      return { ...state, friends: action.payload };
    case 'UPDATE_FRIEND_REQUESTS':
      return { ...state, friendRequests: action.payload };
    case 'UPDATE_LOGINUSER_DETAILS':
      return { ...state, presentLoginUser: action.payload };
    default:
      return state;
  }
}

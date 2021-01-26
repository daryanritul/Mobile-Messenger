import * as actions from '../actions/actions.types';

import auth from '@react-native-firebase/auth';

const userId = auth().currentUser ? auth().currentUser.uid : '';

const initialState = {
  declineLoading: false,
  friends: {
    list: [],
    receivedRequests: [],
    sentRequests: [],
    profileUrl: {},
  },
};

const setFriendsList = (state, payload) => {
  return {
    ...state,
    friends: {
      ...state.friends,
      list: payload.filter((value) => value.status === true),
      receivedRequests: payload.filter(
        (value) => value.status === false && value.friend1.uid !== userId,
      ),
      sentRequests: payload.filter(
        (value) => value.status === false && value.friend1.uid === userId,
      ),
    },
  };
};

const declineRequestStart = (state) => {
  return {
    ...state,
    declineLoading: true,
  };
};
const declineRequestSucess = (state) => {
  return {
    ...state,
    declineLoading: false,
  };
};

const fetchFriendsProfileUrl = (state, payload) => {
  return {
    ...state,
    friends: {
      ...state.friends,
      profileUrl: {...state.friends.profileUrl, ...payload},
    },
  };
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.SET_FRIENDS:
      return setFriendsList(state, payload);

    case actions.REQUEST_DECLINE_START:
      return declineRequestStart(state);

    case actions.REQUEST_DECLINE_SUCCESS:
      return declineRequestSucess(state);

    case actions.FETCH_PROFILE_URL:
      return fetchFriendsProfileUrl(state, payload);

    default:
      return state;
  }
};

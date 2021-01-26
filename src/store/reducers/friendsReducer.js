import * as actions from '../actions/actions.types';

import auth from '@react-native-firebase/auth';

const userId = auth().currentUser ? auth().currentUser.uid : '';

const initialState = {
  declineLoading: false,
  acceptLoading: false,
  requestLoading: false,
  loading: false,
  friends: {
    list: [],
    receivedRequests: [],
    sentRequests: [],
    profileUrl: {},
  },
};

const cleanUp = (state) => {
  return initialState;
};

const setFriendsList = (state, payload) => {
  return {
    ...state,
    friends: {
      ...state.friends,
      list: payload.filter((value) => value.status === true),
      receivedRequests: payload.filter(
        (value) => value.status === false && value.friend2.uid === userId,
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

const requestStart = (state) => {
  return {
    ...state,
    requestLoading: true,
  };
};
const requestSuccess = (state) => {
  return {
    ...state,
    requestLoading: false,
  };
};

const acceptStart = (state) => {
  return {
    ...state,
    acceptLoading: true,
  };
};

const acceptSuccess = (state) => {
  return {
    ...state,
    acceptLoading: false,
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

    case actions.REQUEST_ACCEPT_START:
      return acceptStart(state);

    case actions.REQUEST_ACCEPT_SUCCESS:
      return acceptSuccess(state);
    case actions.REQUEST_START:
      return requestStart(state);

    case actions.REQUEST_SUCESS:
      return requestSuccess(state);

    case actions.FETCH_PROFILE_URL:
      return fetchFriendsProfileUrl(state, payload);

    case actions.FRIENDS_CLEAN_UP:
      return cleanUp(state);

    default:
      return state;
  }
};

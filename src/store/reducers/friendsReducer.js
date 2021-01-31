import * as actions from '../actions/actions.types';

const initialState = {
  declineLoading: false,
  acceptLoading: false,
  requestLoading: false,
  loading: false,
  friendsList: [],
  chatList: [],
};

const cleanUp = (state) => {
  return {
    declineLoading: false,
    acceptLoading: false,
    requestLoading: false,
    loading: false,
    friendsList: [],
  };
};

const setFriendsStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const setFriendsList = (state, payload) => {
  return {
    ...state,
    loading: false,
    friendsList: payload,
  };
};

const setFriendsEnd = (state) => {
  return {
    ...state,
    loading: false,
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
  console.log('i am here');
  return state;
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
    case actions.SET_FRIENDS_START:
      return setFriendsStart(state);

    case actions.SET_FRIENDS:
      return setFriendsList(state, payload);

    case actions.SET_FRIENDS_START:
      return setFriendsEnd(state);

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

import * as actions from '../actions/actions.types';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const authStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const authSucess = (state) => {
  return {
    ...state,
    error: false,
  };
};

const authFail = (state, payload) => {
  return {
    ...state,
    error: payload,
  };
};

const authEnd = (state) => {
  return {
    ...state,
    loading: false,
  };
};

const setUser = (state, payload) => {
  return {
    ...state,
    user: payload,
  };
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.AUTH_START:
      return authStart(state);

    case actions.AUTH_SUCCESS:
      return authSucess(state);

    case actions.AUTH_FAIL:
      return authFail(state, payload);

    case actions.AUTH_END:
      return authEnd(state);

    case actions.SET_USER:
      return setUser(state, payload);
    default:
      return state;
  }
};

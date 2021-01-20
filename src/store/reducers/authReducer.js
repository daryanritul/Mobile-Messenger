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

const authSucess = (state, payload) => {
  return {
    ...state,
    error: false,
    user: payload,
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

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.AUTH_START:
      return authStart(state);

    case actions.AUTH_SUCCESS:
      return authSucess(state, payload);

    case actions.AUTH_FAIL:
      return authFail(state, payload);

    case actions.AUTH_END:
      return authEnd(state);

    default:
      return state;
  }
};

import * as actions from '../actions/actions.types';

const initialState = {
  user: null,
  error: null,
  loading: false,
  recoverPassword: {
    loading: false,
    error: null,
  },
  profileData: {
    data: null,
    error: null,
    loading: false,
  },
};

const cleanUp = (state) => {
  return {
    ...state,
    user: null,
    error: null,
    loading: false,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: null,
    },
  };
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

const recoveryStart = (state) => {
  return {
    ...state,
    recoverPassword: {...state.recoverPassword, loading: true},
  };
};

const recoverySuccess = (state) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: false,
    },
  };
};

const recoveryFail = (state, payload) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: payload,
    },
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

    case actions.CLEAN_UP:
      return cleanUp(state);

    case actions.RECOVERY_START:
      return recoveryStart(state);

    case actions.RECOVERY_SUCCESS:
      return recoverySuccess(state);

    case actions.RECOVERY_FAIL:
      return recoveryFail(state, payload);
    default:
      return state;
  }
};

import * as actions from './actions.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signUp = (data) => async (dispatch) => {
  const {email, password} = data;
  dispatch({
    type: actions.AUTH_START,
  });
  try {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({
          type: actions.AUTH_SUCCESS,
        });
      });
  } catch (error) {
    dispatch({
      type: actions.AUTH_FAIL,
      payload: error,
    });
  }
  dispatch({
    type: actions.AUTH_END,
  });
};

export const signIn = (data) => async (dispatch) => {
  const {email, password} = data;
  dispatch({
    type: actions.AUTH_START,
  });
  try {
    await auth().signInWithEmailAndPassword(email, password);
    dispatch({
      type: actions.AUTH_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actions.AUTH_FAIL,
      payload: error,
    });
  }
};

export const emailVarification = () => async (dispatch) => {
  try {
    const user = auth().currentUser;
    await user.sendEmailVerification();
  } catch (err) {
    console.log({err});
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

export const reloadUser = () => async (dispatch) => {
  const user = auth().currentUser;
  await user.reload().then((ok) => {
    if (user.emailVerified) {
      dispatch({
        type: actions.SET_USER,
        payload: user,
      });
    }
  });
};

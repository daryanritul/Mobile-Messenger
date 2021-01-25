import * as actions from './actions.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
      payload: error.message,
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
  } catch (error) {
    dispatch({
      type: actions.AUTH_FAIL,
      payload: error.message,
    });
  }
  dispatch({
    type: actions.AUTH_END,
  });
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

export const recoverPassword = (email) => async (dispatch) => {
  dispatch({type: actions.RECOVERY_START});
  try {
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({type: actions.RECOVERY_SUCCESS});
      });
  } catch (err) {
    dispatch({type: actions.RECOVERY_FAIL, payload: err.message});
  }
};

export const updateUserProfile = (data) => async (dispatch) => {
  const {
    name,
    userName,
    dateOfBirth,
    profileUrl,
    gender,
    bio,
    uid,
    upload,
  } = data;
  dispatch({type: actions.UPDATE_PROFILE_START});
  const imageUrl = upload ? await uploadImage(profileUrl, uid) : profileUrl;
  if (imageUrl) {
    console.log(imageUrl);
  } else {
    console.log('i Failed');
    return;
  }
  try {
    await firestore()
      .collection('users')
      .doc(uid)
      .set({
        name,
        userName,
        bio,
        dateOfBirth,
        gender,
        profileUrl: imageUrl,
        uid,
      })
      .then(() => console.log('UpdateSucess'));

    await firestore()
      .collection('userNames')
      .doc(uid)
      .set({
        uid,
        userName,
      })
      .then(() => console.log('UpdateSucess'));
  } catch (err) {
    dispatch({type: actions.UPDATE_PROFILE_FAIL, payload: err.message});
  }
  dispatch({type: actions.UPDATE_PROFILE_FAIL, payload: false});
};

export const uploadImage = async (url, uid) => {
  const storageRef = await storage().ref('users/profilePicture/' + uid);
  const task = await storageRef.putFile(url);

  try {
    await task;
    const newUrl = await storageRef.getDownloadURL();
    return newUrl;
  } catch (err) {
    console.log(err);
    return;
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

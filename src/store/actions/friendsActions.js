import * as actions from './actions.types';

import firestore from '@react-native-firebase/firestore';

import firebase from '@react-native-firebase/app';

import auth from '@react-native-firebase/auth';

const userId = auth().currentUser ? auth().currentUser.uid : '';

import storage from '@react-native-firebase/storage';

export const setFriends = (data) => async (dispatch) => {
  //  console.log({data});
  dispatch({
    type: actions.SET_FRIENDS,
    payload: data,
  });
};

const filterFriends = (data) => {
  return {};
};

export const declineRequest = (uid) => async (dispatch) => {
  await firestore()
    .collection('friends')
    .doc(uid)
    .delete()
    .then(() => console.log('its Done'));
};
export const acceptRequest = (uid) => async (dispatch) => {
  await firestore()
    .collection('friends')
    .doc(uid)
    .update({
      status: true,
    })
    .then(() => console.log('its Done'));
};

export const sendRequest = (data) => async (dispatch) => {
  const {user, friend} = data;

  const friendRef = await firestore().collection('friends').doc();
  await friendRef
    .set({
      uid: friendRef.id,
      friendId: [user.uid, friend.uid],
      friend1: user,
      friend2: friend,
      status: false,
    })
    .then(() => console.log('Operation Sucess'));
};

export const fetchProifleUrl = (data) => async (dispatch) => {
  data.map(async (value) => {
    const uid =
      value.friend1.uid === userId ? value.friend2.uid : value.friend1.uid;
    const storageRef = await storage().ref('users/profilePicture/' + uid);

    await storageRef.getDownloadURL().then((object) => {
      dispatch({
        type: actions.FETCH_PROFILE_URL,
        payload: {
          [uid]: object,
        },
      });
    });
  });
};

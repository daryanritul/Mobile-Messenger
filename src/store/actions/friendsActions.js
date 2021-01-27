import * as actions from './actions.types';

import firestore from '@react-native-firebase/firestore';

import firebase from '@react-native-firebase/app';

import auth from '@react-native-firebase/auth';

const userId = auth().currentUser ? auth().currentUser.uid : '';

import storage from '@react-native-firebase/storage';

export const setFriends = (data) => async (dispatch) => {
  dispatch({
    type: actions.SET_FRIENDS,
    payload: data,
  });
};

export const declineRequest = (uid) => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_DECLINE_START,
  });
  await firestore()
    .collection('friends')
    .doc(uid)
    .delete()
    .then(() =>
      dispatch({
        type: actions.REQUEST_DECLINE_SUCCESS,
      }),
    );
};
export const acceptRequest = (uid) => async (dispatch) => {
  dispatch({
    type: actions.REQUEST_ACCEPT_START,
  });
  await firestore()
    .collection('friends')
    .doc(uid)
    .update({
      ['friend1.status']: 'friends',
      ['friend2.status']: 'friends',
    })
    .then(() =>
      dispatch({
        type: actions.REQUEST_ACCEPT_START,
      }),
    );
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

export const fetchFriendsList = (uid) => async (dispatch) => {
  dispatch({
    type: actions.SET_FRIENDS_START,
  });
  await firestore()
    .collection('friends')
    .where('friendId', 'array-contains', uid)
    .onSnapshot(async (documentSnapshot) => {
      const friendList = [];
      await Promise.all(
        documentSnapshot.docs.map(async (friend) => {
          const uuid =
            friend._data.friend1.uid === uid
              ? friend._data.friend2.uid
              : friend._data.friend1.uid;
          const storageRef = await storage().ref(
            'users/profilePicture/' + uuid,
          );
          const url = await storageRef.getDownloadURL();
          friendList.push({
            list:
              friend._data.friend1.uid === uid
                ? friend._data.friend2
                : friend._data.friend1,
            uid: friend._data.uid,
            profileUrl: url,
          });
        }),
      );

      dispatch({
        type: actions.SET_FRIENDS,
        payload: friendList,
      });
    });
  dispatch({
    type: actions.SET_FRIENDS_END,
  });
};

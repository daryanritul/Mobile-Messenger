import * as actions from './actions.types';

import firestore from '@react-native-firebase/firestore';

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
        type: actions.REQUEST_ACCEPT_SUCCESS,
      }),
    );
};

export const sendRequest = (data) => async (dispatch) => {
  const {user, friend} = data;
  dispatch({
    type: actions.REQUEST_START,
  });
  const friendRef = await firestore().collection('friends').doc();
  await friendRef
    .set({
      uid: friendRef.id,
      friendId: [user.uid, friend.uid],
      friend1: user,
      friend2: friend,
      status: false,
    })
    .then(() =>
      dispatch({
        type: actions.REQUEST_SUCESS,
      }),
    );
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
          await storageRef
            .getDownloadURL()
            .then((url) => {
              friendList.push({
                list:
                  friend._data.friend1.uid === uid
                    ? friend._data.friend2
                    : friend._data.friend1,
                uid: friend._data.uid,
                profileUrl: url,
                status: friend._data.status,
              });
            })
            .catch((err) => {
              if (err.code === 'storage/object-not-found') {
                friendList.push({
                  list:
                    friend._data.friend1.uid === uid
                      ? friend._data.friend2
                      : friend._data.friend1,
                  uid: friend._data.uid,
                  profileUrl:
                    'https://firebasestorage.googleapis.com/v0/b/mobile-messenger-b9264.appspot.com/o/users%2FprofilePicture%2FmaleAvatar.jpg?alt=media&token=ded1a45d-392d-4bc1-ae68-6f4f49a0dde6',
                  status: friend._data.status,
                });
              }
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

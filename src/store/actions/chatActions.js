import * as actions from './actions.types';

import firestore from '@react-native-firebase/firestore';

export const fetchChats = (uid, action) => async (dispatch) => {
  if (!action) {
    await firestore()
      .collection('friends')
      .doc(uid)
      .update({
        ['status']: true,
      });
    console.log('i did this');
  }
  console.log(' i fetch chats');
  const subsciber = await firestore()
    .collection('friends')
    .doc(uid)
    .collection('messages')
    .orderBy('sentAt', 'desc')
    .onSnapshot(async (documentSnapshot) => {
      const chatList = [];
      await Promise.all(
        documentSnapshot.docs.map((value) => {
          chatList.push(value._data);
        }),
        dispatch({
          type: actions.SET_CHAT,
          payload: {
            chatId: uid,
            messages: chatList,
          },
        }),
      );
    });
  return () => subsciber();
};

export const markAsSeen = (uid, chatId) => async (dispatch) => {
  await firestore()
    .collection('friends')
    .doc(uid)
    .collection('messages')
    .doc(chatId)
    .update({
      seen: true,
    });
};

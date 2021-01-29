import {Button, List} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../Constants/Colors';

import firestore from '@react-native-firebase/firestore';
import {fetchMessages} from '../store/actions/friendsActions';
import {fetchChats} from '../store/actions/chatActions';

const ChatScreen = ({
  friendsList,
  navigation,
  route,
  user,
  fetchChats,
  chatList,
}) => {
  const {chatId} = route.params;
  //  console.log(JSON.stringify(chatList.chatList));

  const myChats = chatList.chatList.filter((chats) => chats.chatId === chatId);
  console.log(chatId);
  const friendData = friendsList.filter((friend) => friend.uid === chatId);
  console.log(friendData);
  console.log(myChats);
  const sendMessage = async () => {
    const refrence = await firestore()
      .collection('friends')
      .doc(chatId)
      .collection('messages')
      .doc();

    await refrence
      .set({
        sentAt: firestore.Timestamp.now(),
        sentBy: user.uid,
        text: 'hello World',
        uid: refrence.id,
      })
      .then(() => 'its gone');
  };

  return (
    <View
      style={{
        fle: 1,
        backgroundColor: Colors.charlie,
      }}>
      <Text>Chat SCreen</Text>
      <Button block onPress={() => sendMessage()}>
        <Text>send Hello</Text>
      </Button>
    </View>
  );
};

const mapStateToProps = (state) => ({
  friendsList: state.friends.friendsList,
  user: state.auth.profileData,
  chatList: state.chats,
});

const mapDispatchToProps = {
  fetchChats: (uid) => fetchChats(uid),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({});

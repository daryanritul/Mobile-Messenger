import React, {useState} from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';

import {Icon, Thumbnail, Fab} from 'native-base';

import {connect} from 'react-redux';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {fetchChats} from '../store/actions/chatActions';

const HomeScreen = ({navigation, myFriends, chatList, fetchChats, userId}) => {
  const userChatHandler = async (data) => {
    if (!chatList.filter((chats) => chats.chatId === data.uid).length)
      await fetchChats(data.uid, data.status);
    navigation.navigate('ChatScreen', {
      chatId: data.uid,
    });
  };

  const FriendsCard = ({itemData}) => {
    const friendChats = chatList.filter(
      (chats) => chats.chatId === itemData.uid,
    )[0];
    const unReadMsg = friendChats
      ? friendChats.messages.filter(
          (value) => value.seen === false && value.sentBy !== userId,
        ).length
      : 0;

    return (
      <TouchableHighlight
        onPress={() => userChatHandler(itemData)}
        style={{
          flexDirection: 'row',
          margin: 5,
          marginTop: 2.5,
          elevation: 2,
          backgroundColor: Colors.charlie,
          height: responsiveHeight(11.5),
        }}
        underlayColor="rgba(174, 214, 241,1)">
        <>
          <Thumbnail
            source={{
              uri: itemData.profileUrl,
            }}
            style={{
              width: '23%',
              height: '100%',
            }}
            large
            square
          />
          <View
            style={{
              width: unReadMsg > 0 ? '62%' : '77%',
              height: '100%',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                paddingHorizontal: 5,
                height: '100%',
                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(1.8),
                color: Colors.alpha,
              }}>
              {itemData.list.userName}
              {'\n'}
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Colors.charlieDark,
                }}>
                {'@username'}
              </Text>
            </Text>
          </View>
          {unReadMsg > 0 && (
            <View
              style={{
                width: '15%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(130, 224, 170,0.7)',
              }}>
              <Text
                style={{
                  color: '#196F3D',
                  paddingHorizontal: 5,
                  fontFamily: fonts.acuminB,
                  fontSize: responsiveFontSize(1.8),
                }}>
                {unReadMsg}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  textAlign: 'center',
                  fontFamily: fonts.acuminB,
                  color: '#196F3D',
                }}>
                {'New\nMessage'}
              </Text>
            </View>
          )}
        </>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.charlie,
      }}>
      {myFriends.map((friends) => (
        <FriendsCard itemData={friends} key={friends.uid} />
      ))}
    </View>
  );
};

const mapStateToProps = (state) => ({
  myFriends: state.friends.friendsList.filter(
    (friend) => friend.status === true,
  ),
  chatList: state.chats.chatList,
  userId: state.auth.user.uid,
});

const mapDispatchToProps = {
  fetchChats: (uid, action) => fetchChats(uid, action),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({});

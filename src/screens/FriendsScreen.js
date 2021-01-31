import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import {Icon, Thumbnail, Fab} from 'native-base';

import {acceptRequest, declineRequest} from '../store/actions/friendsActions';
import {connect} from 'react-redux';

import firestore from '@react-native-firebase/firestore';

import ProfileButton from '../Components/ProfileButton';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {fetchChats} from '../store/actions/chatActions';

const FriendsScreen = ({
  navigation,
  friendState,
  declineRequest,
  acceptRequest,
  fetchChats,
  chatList,
}) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [search, setSearch] = useState('');
  const friends = friendState.friendsList.filter(
    (value) => value.list.status === 'friends',
  );

  const receive = friendState.friendsList.filter(
    (value) => value.list.status === 'receive',
  );
  const sent = friendState.friendsList.filter(
    (value) => value.list.status === 'sent',
  );

  const fetchUserData = async (uuid) => {
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(uuid)
      .get()
      .then((dataSnapshot) => {
        navigation.navigate('ProfileScreen', {
          data: dataSnapshot._data,
        });
      });
    setLoading(false);
  };

  const userChatHandler = async (data) => {
    if (!chatList.filter((chats) => chats.chatId === data.uid).length)
      await fetchChats(data.uid, data.status);
    navigation.navigate('ChatScreen', {
      chatId: data.uid,
    });
  };

  const FriendsCard = ({friends, sent, receive, itemData}) => {
    return (
      <TouchableHighlight
        onPress={() => fetchUserData(itemData.list.uid)}
        style={{
          flexDirection: 'row',
          margin: 5,
          marginTop: 2.5,
          elevation: 2,
          backgroundColor: Colors.charlie,
          height: responsiveHeight(10),
        }}
        underlayColor="rgba(174, 214, 241,1)">
        <>
          <Thumbnail
            source={{
              uri: itemData.profileUrl,
            }}
            style={{
              width: '20%',
              height: '100%',
            }}
            large
            square
          />
          <View
            style={{
              width: friends ? '60%' : '40%',
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
          {sent && (
            <>
              <ProfileButton
                iconName={'account-clock'}
                iconType={'MaterialCommunityIcons'}
                label={'Pending'}
                onPressHandler={() => console.log('ok')}
                loading={false}
                green
                small
              />
              <ProfileButton
                iconName={'account-off'}
                iconType={'MaterialCommunityIcons'}
                label={'Unsent'}
                onPressHandler={() => declineRequest(itemData.uid)}
                loading={false}
                red
                small
              />
            </>
          )}
          {friends && (
            <>
              <ProfileButton
                iconName={'message'}
                iconType={'MaterialIcons'}
                label={'Message'}
                onPressHandler={() => userChatHandler(itemData)}
                loading={false}
                blue
                small
              />
            </>
          )}
          {receive && (
            <>
              <ProfileButton
                iconName={'checkmark-sharp'}
                iconType={'Ionicons'}
                label={'Accept'}
                onPressHandler={() => acceptRequest(itemData.uid)}
                loading={false}
                green
                small
              />
              <ProfileButton
                iconName={'close'}
                iconType={'Ionicons'}
                label={'Decline'}
                onPressHandler={() => declineRequest(itemData.uid)}
                loading={false}
                red
                small
              />
            </>
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
      <View
        style={{
          backgroundColor: Colors.charlie,
          alignItems: 'center',
          flexDirection: 'row',
          height: responsiveHeight(7),
          margin: 5,
          marginTop: 3,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 50,
            borderColor: Colors.bravoDark,
            alignItems: 'center',
            flexDirection: 'row',
            width: '80%',
            alignSelf: 'center',
            height: '70%',
          }}>
          <Icon
            name="search"
            style={{
              color: Colors.bravo,
              fontSize: responsiveFontSize(3),
              width: '15%',
              textAlign: 'center',
            }}
          />
          <TextInput
            placeholder="Search Friends"
            style={{
              width: '70%',
              height: '100%',
              padding: 0,
              fontSize: responsiveFontSize(1.8),
              fontFamily: fonts.acuminR,
            }}
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholderTextColor={Colors.charlieDark}
            onTouchStart={() => {
              if (mode) {
                setMode(false);
              }
            }}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <Icon
            name="close-circle"
            onPress={() => setSearch('')}
            style={{
              color: Colors.bravo,
              fontSize: responsiveFontSize(3),
              width: '15%',
              textAlign: 'center',
            }}
          />
        </View>
        <TouchableHighlight
          style={{
            width: '18%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          underlayColor="rgba(133, 193, 233,0.7)"
          onPress={() => setMode(!mode)}>
          <>
            {receive.length > 0 && !mode && (
              <Text
                style={{
                  fontSize: responsiveFontSize(1),
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'red',
                  height: 15,
                  width: 15,
                  textAlign: 'center',
                  color: Colors.charlie,
                  fontFamily: fonts.acuminB,
                  borderRadius: 50,
                  textAlignVertical: 'center',
                }}>
                {receive.length}
              </Text>
            )}
            <Icon
              name={!mode ? 'group' : 'arrow-back'}
              type="MaterialIcons"
              style={{
                color: Colors.bravo,
                fontSize: responsiveFontSize(3),
              }}
            />
            <Text
              style={[
                styles.listButton,
                {
                  color: Colors.bravo,
                  fontSize: responsiveFontSize(1.2),
                  textAlign: 'center',
                },
              ]}>
              {mode ? 'Go Back' : 'Friend\nRequests'}
            </Text>
          </>
        </TouchableHighlight>
      </View>
      <Text
        style={{
          color: Colors.alpha,
          fontFamily: fonts.acuminB,
          marginHorizontal: 5,
        }}>
        {mode
          ? `Friend Requests (${receive.length})`
          : ` My Friends (${friends.length})`}
      </Text>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.bravo} />
          <Text
            style={{
              padding: 10,
              fontFamily: fonts.acuminB,
              fontSize: responsiveFontSize(1.8),
              color: Colors.alpha,
            }}>
            Redirecting. . .
          </Text>
        </View>
      ) : (
        <ScrollView>
          {mode ? (
            <>
              {receive.length > 0 ? (
                receive.map((value) => (
                  <FriendsCard receive key={value.uid} itemData={value} />
                ))
              ) : (
                <Text
                  style={{
                    flex: 1,
                    height: responsiveHeight(10),
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: Colors.alpha,
                    fontFamily: fonts.acuminB,
                  }}>
                  You Have No Friend Requests
                </Text>
              )}
              {sent.length > 0 && (
                <>
                  <Text
                    style={{
                      color: Colors.alpha,
                      fontFamily: fonts.acuminB,
                      marginHorizontal: 10,
                    }}>
                    Your pending Sent Request ({sent.length})
                  </Text>
                  {sent.map((value) => (
                    <FriendsCard sent key={value.uid} itemData={value} />
                  ))}
                </>
              )}
            </>
          ) : (
            friends
              .filter((value) => value.list.userName.includes(search))
              .map((value) => (
                <FriendsCard friends key={value.uid} itemData={value} />
              ))
          )}
        </ScrollView>
      )}
      <Fab
        position="bottomRight"
        style={{
          backgroundColor: Colors.bravo,
        }}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Icon
          name={'account-plus'}
          type="MaterialCommunityIcons"
          style={{
            color: Colors.charlie,
            fontSize: responsiveFontSize(3.5),
          }}
        />
      </Fab>
    </View>
  );
};

const mapStateToProps = (state) => ({
  friendState: state.friends,
  chatList: state.chats.chatList,
});

const mapDispatchToProps = {
  declineRequest: (uid1, uid2) => declineRequest(uid1, uid2),
  acceptRequest: (uid1, uid2) => acceptRequest(uid1, uid2),
  fetchChats: (uid, action) => fetchChats(uid, action),
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);

const styles = StyleSheet.create({
  listButton: {
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(1.6),
  },
});

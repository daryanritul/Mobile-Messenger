import React, {useLayoutEffect} from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';

import {Icon} from 'native-base';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';

import {connect} from 'react-redux';

import {
  acceptRequest,
  declineRequest,
  sendRequest,
} from '../store/actions/friendsActions';
import {signOut} from '../store/actions/authActions';

import ProfileButton from '../Components/ProfileButton';
import {fetchChats} from '../store/actions/chatActions';

const ProfileScreen = ({
  signOut,
  navigation,
  route,
  profileData,
  acceptRequest,
  declineRequest,
  sendRequest,
  userId,
  friends,
  userEmail,
  fetchChats,
  chatList,
}) => {
  const {data} = route.params;

  const friend = friends.friendsList.filter(
    (value) => value.list.status === 'friends',
  );

  const dataState = data ? data : profileData;

  const checkList = friends.friendsList.filter(
    (value) => value.list.uid === data.uid,
  );

  const checkfriend = data
    ? data.uid === userId
      ? 'me'
      : checkList.length
      ? checkList[0].list.status
      : 'unknown'
    : 'me';

  const docId = checkList.length ? checkList[0].uid : '';

  useLayoutEffect(() => {
    if (data === false)
      navigation.setOptions({
        headerRight: () => (
          <TouchableHighlight
            onPress={() => navigation.navigate('UpdateProfileScreen')}
            underlayColor={'rgba(256,256,256,0.5)'}
            style={{
              marginHorizontal: 10,
              padding: 5,
              borderRadius: 60,
            }}>
            <Icon
              name="account-edit"
              type="MaterialCommunityIcons"
              style={{
                fontSize: responsiveFontSize(4),
                color: Colors.charlie,
              }}
            />
          </TouchableHighlight>
        ),
      });
  }, [navigation]);

  const userChatHandler = async (data) => {
    if (!chatList.filter((chats) => chats.chatId === data.uid).length)
      await fetchChats(data.uid, data.status);
    navigation.navigate('ChatScreen', {
      chatId: data.uid,
    });
  };

  const InfoBar = ({value, title}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.charlie,
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderColor: Colors.charlieDark,
        }}>
        <Text
          style={{
            color: Colors.alpha,
            fontFamily: fonts.acuminR,
            fontSize: responsiveFontSize(2.1),
            paddingVertical: 10,
          }}>
          {value}
        </Text>
        <Text
          style={{
            paddingBottom: 10,
            color: Colors.charlieDark,
            fontFamily: fonts.acuminB,
            fontSize: responsiveFontSize(1.8),
          }}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.charlie,
      }}>
      <ImageBackground
        source={{uri: dataState.profileUrl}}
        style={{
          width: responsiveWidth(100),
          height: responsiveHeight(60),
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 10,
              backgroundColor: Colors.charlie,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <Text
              style={{
                fontFamily: fonts.exot,
                fontSize: responsiveFontSize(3),
                color: Colors.alpha,
              }}>
              {dataState.name}
            </Text>
            <Text
              style={{
                fontFamily: fonts.acuminBI,
                fontSize: responsiveFontSize(1.8),
                color: Colors.charlieDark,
              }}>
              @{dataState.userName}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          marginHorizontal: 20,
        }}>
        <View style={styles.profileButtonBar}>
          {checkfriend === 'me' && (
            <>
              <ProfileButton
                iconName={'account-group'}
                iconType={'MaterialCommunityIcons'}
                label={` Friends (${friend.length})`}
                onPressHandler={() => console.log('hello')}
                green
              />
              <ProfileButton
                iconName={'message'}
                iconType={'MaterialIcons'}
                label={`Chats`}
                onPressHandler={() => console.log('')}
                blue
              />
            </>
          )}
          <>
            {checkfriend === 'friends' && (
              <>
                <ProfileButton
                  iconName={'message'}
                  iconType={'MaterialIcons'}
                  label={`Message`}
                  onPressHandler={() => userChatHandler(checkList[0])}
                  blue
                />
                <ProfileButton
                  iconName={'account-off'}
                  iconType={'MaterialCommunityIcons'}
                  label={'Unfriend'}
                  onPressHandler={() => declineRequest(docId)}
                  loading={friends.declineLoading}
                  red
                />
              </>
            )}
            {checkfriend === 'sent' && (
              <>
                <ProfileButton
                  iconName={'account-clock'}
                  iconType={'MaterialCommunityIcons'}
                  label={'Pending'}
                  onPressHandler={() => console.log('ok')}
                  loading={false}
                  green
                />
                <ProfileButton
                  iconName={'account-off'}
                  iconType={'MaterialCommunityIcons'}
                  label={'Unsent'}
                  onPressHandler={() => declineRequest(docId)}
                  loading={friends.declineLoading}
                  red
                />
              </>
            )}
            {checkfriend === 'receive' && (
              <>
                <ProfileButton
                  iconName={'checkmark-sharp'}
                  iconType={'Ionicons'}
                  label={'Accept'}
                  onPressHandler={() => acceptRequest(docId)}
                  loading={friends.acceptLoading}
                  green
                />
                <ProfileButton
                  iconName={'close'}
                  iconType={'Ionicons'}
                  label={'Decline'}
                  onPressHandler={() => declineRequest(docId)}
                  loading={friends.declineLoading}
                  red
                />
              </>
            )}
            {checkfriend === 'unknown' && (
              <ProfileButton
                iconName={'account-plus'}
                iconType={'MaterialCommunityIcons'}
                label={'Send Request'}
                onPressHandler={() =>
                  sendRequest({
                    user: {
                      uid: userId,
                      userName: profileData.userName,
                      status: 'receive',
                    },
                    friend: {
                      uid: dataState.uid,
                      userName: dataState.userName,
                      status: 'sent',
                    },
                  })
                }
                green
                loading={friends.requestLoading}
              />
            )}
          </>
        </View>
        <Text
          style={{
            fontFamily: fonts.exot,
            fontSize: responsiveFontSize(2.4),
            color: Colors.alpha,
            borderBottomWidth: 0.5,
            borderColor: Colors.charlieDark,
            paddingVertical: 10,
          }}>
          Profile{' '}
          <Text
            style={{
              fontFamily: fonts.exot,
              color: Colors.bravo,
              fontSize: responsiveFontSize(2.4),
            }}>
            Info . . .
          </Text>
        </Text>

        <InfoBar value={dataState.bio} title={'Bio'} />
        <InfoBar value={dataState.dateOfBirth} title={'Date Of Birth'} />
        <InfoBar value={dataState.gender} title={'Gender'} />
        {checkfriend === 'me' && (
          <InfoBar value={userEmail} title={'Registered Email'} />
        )}
        {data === false && (
          <TouchableOpacity
            style={{
              margin: 5,
              padding: 5,
              alignSelf: 'center',
            }}
            onPress={() => {
              Alert.alert(
                'Warning',
                'Are you sure want to Sign-Out',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'Sign-Out', onPress: () => signOut()},
                ],
                {cancelable: false},
              );
            }}>
            <Icon
              name="power-off"
              type="FontAwesome"
              style={{
                color: 'red',
                fontSize: responsiveFontSize(5),
                textAlign: 'center',
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: responsiveFontSize(1.3),
                fontFamily: fonts.acuminB,
                textAlign: 'center',
              }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  signOut: () => signOut(),
  sendRequest: (data) => sendRequest(data),
  declineRequest: (uid1, uid2) => declineRequest(uid1, uid2),
  acceptRequest: (uid1, uid2) => acceptRequest(uid1, uid2),
  fetchChats: (uid, action) => fetchChats(uid, action),
};

const mapStateToProps = (state) => ({
  profileData: state.auth.profileData,
  userId: state.auth.user.uid,
  userEmail: state.auth.user.email,
  friends: state.friends,
  chatList: state.chats.chatList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  profileButtonBar: {
    width: '100%',
    height: responsiveHeight(10),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 8,
    flexDirection: 'row',
  },
});

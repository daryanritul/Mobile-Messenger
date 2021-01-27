import React, {useEffect, useLayoutEffect, useState} from 'react';
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

import {connect} from 'react-redux';
import {signOut} from '../store/actions/authActions';

import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {
  acceptRequest,
  declineRequest,
  sendRequest,
} from '../store/actions/friendsActions';

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
}) => {
  const {data} = route.params;

  const friend = friends.filter((value) => value.list.status === 'friends');

  const dataState = data ? data : profileData;

  const checkList = friends.filter((value) => value.list.uid === data.uid);

  const checkfriend = data
    ? checkList.length
      ? checkList[0].list.status
      : 'unknown'
    : 'me';

  const docId = checkList.length ? checkList[0].uid : '';

  console.log(checkfriend, docId);

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

  const InfoBar = ({value, title}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.charlie,
          padding: 5,
          margin: 5,
          borderBottomWidth: 0.5,
          borderColor: Colors.charlieDark,
        }}>
        <Text
          style={{
            padding: 10,
            color: Colors.alpha,
            fontFamily: fonts.acuminI,
            fontSize: responsiveFontSize(2),
          }}>
          {' '}
          {value}
        </Text>
        <Text
          style={{
            padding: 10,
            paddingTop: 0,
            color: Colors.charlieDark,
            fontFamily: fonts.acuminBI,
            fontSize: responsiveFontSize(2),
          }}>
          @{title}
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
          width: '100%',
          height: responsiveHeight(10),
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginVertical: 8,
          flexDirection: 'row',
        }}>
        {!data ? (
          <>
            <TouchableHighlight
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: 'rgba(130, 224, 170,0.3)',
              }}
              underlayColor="rgba(130, 224, 170,0.6)"
              onPress={() => console.log('ok')}>
              <>
                <Icon
                  name="groups"
                  type="MaterialIcons"
                  style={{
                    color: '#196F3D',
                    fontSize: responsiveFontSize(3.8),
                  }}
                />
                <Text
                  style={[
                    styles.listButton,
                    {
                      color: '#196F3D',
                    },
                  ]}>
                  Friends ({friend.length})
                </Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: 'rgba(133, 193, 233,0.4)',
              }}
              underlayColor="rgba(133, 193, 233,0.7)"
              onPress={() => navigation.navigate('ChatScreen')}>
              <>
                <Icon
                  name="message"
                  type="MaterialIcons"
                  style={{
                    color: Colors.bravo,
                    fontSize: responsiveFontSize(3.5),
                  }}
                />
                <Text
                  style={[
                    styles.listButton,
                    {
                      color: Colors.bravo,
                    },
                  ]}>
                  Chats
                </Text>
              </>
            </TouchableHighlight>
          </>
        ) : (
          <>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                height: '100%',
              }}>
              {checkfriend === 'friends' && (
                <>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(133, 193, 233,0.4)',
                    }}
                    underlayColor="rgba(133, 193, 233,0.7)"
                    onPress={() => navigation.navigate('ChatScreen')}>
                    <>
                      <Icon
                        name="message"
                        type="MaterialIcons"
                        style={{
                          color: Colors.bravo,
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: Colors.bravo,
                          },
                        ]}>
                        Message
                      </Text>
                    </>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(236, 112, 99,0.3)',
                    }}
                    underlayColor="rgba(236, 112, 99,0.6)"
                    onPress={() => declineRequest(docId)}>
                    <>
                      <Icon
                        name="account-off"
                        type="MaterialCommunityIcons"
                        style={{
                          color: '#E21717',
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: '#E21717',
                          },
                        ]}>
                        Unfriend
                      </Text>
                    </>
                  </TouchableHighlight>
                </>
              )}
              {checkfriend === 'sent' && (
                <>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(130, 224, 170,0.3)',
                    }}
                    underlayColor="rgba(130, 224, 170,0.6)"
                    onPress={() => console.log('ok')}>
                    <>
                      <Icon
                        name="account-clock"
                        type="MaterialCommunityIcons"
                        style={{
                          color: '#196F3D',
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: '#196F3D',
                          },
                        ]}>
                        Pending
                      </Text>
                    </>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(236, 112, 99,0.3)',
                    }}
                    underlayColor="rgba(236, 112, 99,0.6)"
                    onPress={() => declineRequest(docId)}>
                    <>
                      <Icon
                        name="account-off"
                        type="MaterialCommunityIcons"
                        style={{
                          color: '#E21717',
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: '#E21717',
                          },
                        ]}>
                        Unsent
                      </Text>
                    </>
                  </TouchableHighlight>
                </>
              )}
              {checkfriend === 'receive' && (
                <>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(130, 224, 170,0.3)',
                    }}
                    underlayColor="rgba(130, 224, 170,0.6)"
                    onPress={() => acceptRequest(docId)}>
                    <>
                      <Icon
                        name="checkmark-sharp"
                        style={{
                          color: '#196F3D',
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: '#196F3D',
                          },
                        ]}>
                        Accept
                      </Text>
                    </>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(236, 112, 99,0.3)',
                    }}
                    underlayColor="rgba(236, 112, 99,0.6)"
                    onPress={() => declineRequest(docId)}>
                    <>
                      <Icon
                        name="close"
                        style={{
                          color: '#E21717',
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: '#E21717',
                          },
                        ]}>
                        Decline
                      </Text>
                    </>
                  </TouchableHighlight>
                </>
              )}
              {checkfriend === 'unknown' && (
                <>
                  <TouchableHighlight
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      backgroundColor: 'rgba(130, 224, 170,0.3)',
                    }}
                    underlayColor="rgba(130, 224, 170,0.6)"
                    onPress={() =>
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
                    }>
                    <>
                      <Icon
                        name="account-plus"
                        type="MaterialCommunityIcons"
                        style={{
                          color: '#196F3D',
                          fontSize: responsiveFontSize(3.5),
                        }}
                      />
                      <Text
                        style={[
                          styles.listButton,
                          {
                            color: '#196F3D',
                          },
                        ]}>
                        Send Request
                      </Text>
                    </>
                  </TouchableHighlight>
                </>
              )}
            </View>
          </>
        )}
      </View>
      <Text
        style={{
          marginHorizontal: 10,
          padding: 10,
          fontFamily: fonts.exot,
          fontSize: responsiveFontSize(2.4),
          color: Colors.alpha,
        }}>
        Profile{' '}
        <Text
          style={{
            marginHorizontal: 20,
            fontFamily: fonts.exot,
            color: Colors.bravo,
            fontSize: responsiveFontSize(2.4),
          }}>
          Info
        </Text>
      </Text>
      <InfoBar value={dataState.bio} title={'Bio'} />
      <InfoBar value={dataState.dateOfBirth} title={'Date Of Birth'} />
      <InfoBar value={dataState.gender} title={'Gender'} />

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
    </ScrollView>
  );
};

const mapDispatchToProps = {
  signOut: () => signOut(),
  sendRequest: (data) => sendRequest(data),
  declineRequest: (uid1, uid2) => declineRequest(uid1, uid2),
  acceptRequest: (uid1, uid2) => acceptRequest(uid1, uid2),
};

const mapStateToProps = (state) => ({
  profileData: state.auth.profileData,
  userId: state.auth.user.uid,
  friends: state.friends.friendsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({});

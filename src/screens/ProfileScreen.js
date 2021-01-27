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

import {connect} from 'react-redux';
import {signOut} from '../store/actions/authActions';

import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {sendRequest} from '../store/actions/friendsActions';

const ProfileScreen = ({
  signOut,
  navigation,
  route,
  profileData,
  sendRequest,
  userId,
}) => {
  const {data} = route.params;
  console.log(userId);
  const dataState = data ? data : profileData;
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
            backgroundColor: 'rgba(0,0,0,0.3)',
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
          flexDirection: 'row',
        }}>
        {!data ? (
          <>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="group"
                type="MaterialIcons"
                style={{
                  color: Colors.alpha,
                  fontSize: responsiveFontSize(4),
                }}
              />
              <Text
                style={{
                  color: Colors.alpha,
                  fontSize: responsiveFontSize(1.3),
                  fontFamily: fonts.acuminB,
                }}>
                Friends
              </Text>
              <Text
                style={{
                  color: Colors.alpha,
                  fontSize: responsiveFontSize(1.3),
                  fontFamily: fonts.acuminB,
                }}>
                20
              </Text>
            </View>
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="groups"
                type="MaterialIcons"
                style={{
                  color: Colors.alpha,
                  fontSize: responsiveFontSize(4),
                }}
              />
              <Text
                style={{
                  color: Colors.alpha,
                  fontSize: responsiveFontSize(1.3),
                  fontFamily: fonts.acuminB,
                }}>
                Groups
              </Text>
              <Text
                style={{
                  color: Colors.alpha,
                  fontSize: responsiveFontSize(1.3),
                  fontFamily: fonts.acuminB,
                }}>
                20
              </Text>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
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
                <Icon
                  name="account-plus"
                  type="MaterialCommunityIcons"
                  style={{
                    color: Colors.alpha,
                    fontSize: responsiveFontSize(4),
                  }}
                />
                <Text
                  style={{
                    color: Colors.alpha,
                    fontSize: responsiveFontSize(1.3),
                    fontFamily: fonts.acuminB,
                  }}>
                  Send Friend
                </Text>
                <Text
                  style={{
                    color: Colors.alpha,
                    fontSize: responsiveFontSize(1.3),
                    fontFamily: fonts.acuminB,
                  }}>
                  Request
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <Text
        style={{
          marginHorizontal: 10,
          padding: 5,
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
};

const mapStateToProps = (state) => ({
  profileData: state.auth.profileData,
  userId: state.auth.user.uid,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({});

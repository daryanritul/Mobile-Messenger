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

const ProfileScreen = ({signOut, navigation, route, profileData}) => {
  // const {uid} = route.params;
  // console.log(uid);

  useLayoutEffect(() => {
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
        source={{uri: profileData.profileUrl}}
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
              {profileData.name}
            </Text>
            <Text
              style={{
                fontFamily: fonts.acuminBI,
                fontSize: responsiveFontSize(1.8),
                color: Colors.charlieDark,
              }}>
              @{profileData.userName}
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
      <InfoBar value={profileData.bio} title={'Bio'} />
      <InfoBar value={profileData.dateOfBirth} title={'Date Of Birth'} />
      <InfoBar value={profileData.gender} title={'Gender'} />

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
    </ScrollView>
  );
};

const mapDispatchToProps = {
  signOut: () => signOut(),
};

const mapStateToProps = (state) => ({
  profileData: state.auth.profileData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({});

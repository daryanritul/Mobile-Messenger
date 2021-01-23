import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Icon, Thumbnail} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';
import ErrorMsg from '../Components/ErrorMsg';

const UpdateProfileScreen = () => {
  const [gender, setGender] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableHighlight
          onPress={() => console.log('exiting')}
          underlayColor={'rgba(0,0,0,0.2)'}
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="close-sharp" style={styles.headerIcon} />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>UPDATE PROFILE</Text>
        <TouchableHighlight
          onPress={() => console.log('exiting')}
          underlayColor={'rgba(0,0,0,0.2)'}
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="checkmark-sharp" style={styles.headerIcon} />
        </TouchableHighlight>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.avatarBox}>
            <Thumbnail
              source={
                gender
                  ? require('../Assets/Images/maleAvatar.jpg')
                  : require('../Assets/Images/femaleAvatar.jpg')
              }
              large
            />
          </View>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <AppInput
              icon="camera-plus"
              iconType="MaterialCommunityIcons"
              value={'Add Profile Picture'}
              editable={false}
              inputView={styles.inputView}
              valid={false}
            />
          </TouchableOpacity>
          <ErrorMsg />

          <AppInput
            icon="email"
            iconType="MaterialCommunityIcons"
            value={'ritul.daryan.205@gmail.com'}
            editable={false}
            inputView={styles.inputView}
            valid={true}
          />
          <ErrorMsg />

          <AppInput
            icon="account"
            iconType="MaterialCommunityIcons"
            placeholder="Display Name"
            inputView={styles.inputView}
          />
          <ErrorMsg />

          <AppInput
            icon="account-settings"
            iconType="MaterialCommunityIcons"
            placeholder="@username"
            inputView={styles.inputView}
          />
          <ErrorMsg />

          <AppInput
            icon="account-details"
            iconType="MaterialCommunityIcons"
            placeholder="Bio"
            multiline={true}
            inputView={styles.inputView}
          />
          <ErrorMsg />

          <AppInput
            icon="calendar-range"
            iconType="MaterialCommunityIcons"
            placeholder="Date of Birth (DD/MM/YYYY)"
            inputView={styles.inputView}
          />

          <ErrorMsg />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(90),
              alignSelf: 'center',
            }}>
            <Pressable
              style={{
                width: '49%',
              }}
              onPress={() => setGender(true)}>
              <AppInput
                icon="human-male"
                iconType="MaterialCommunityIcons"
                value={'MALE'}
                editable={false}
                inputView={{
                  width: '100%',
                }}
                style={{
                  width: '50%',
                  textAlign: 'center',
                }}
                iconStyle={{
                  width: '25%',
                }}
                inputBox={{
                  borderColor: gender === true ? 'green' : Colors.charlieDark,
                }}
                valid={gender === true ? true : false}
              />
            </Pressable>
            <Pressable
              style={{
                width: '49%',
              }}
              onPress={() => setGender(false)}>
              <AppInput
                icon="human-female"
                iconType="MaterialCommunityIcons"
                value={'FEMALE'}
                editable={false}
                inputView={{
                  width: '100%',
                }}
                style={{
                  width: '50%',
                  textAlign: 'center',
                }}
                iconStyle={{
                  width: '25%',
                }}
                inputBox={{
                  borderColor: gender == false ? 'green' : Colors.charlieDark,
                }}
                valid={gender === false ? true : false}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charlie,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.bravo,
    alignItems: 'center',
    height: responsiveHeight(8),
  },
  headerIcon: {
    color: Colors.charlie,
    fontSize: responsiveFontSize(4),
  },
  headerTitle: {
    width: '70%',
    height: '100%',
    fontFamily: fonts.exot,
    color: Colors.charlie,
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  avatarBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: responsiveWidth(90),
    height: responsiveHeight(15),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.charlieDark,
  },
  avatar: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.charlieDark,
    textAlign: 'center',
    padding: 5,
  },
  inputView: {
    width: responsiveWidth(90),
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Button, Icon} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          backgroundColor: Colors.charlie,
        }}>
        <View
          style={{
            flex: 1,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.bravo,
            borderBottomLeftRadius: responsiveHeight(50),
            borderBottomRightRadius: responsiveHeight(50),
          }}>
          <Icon
            name="cellphone-message"
            type="MaterialCommunityIcons"
            style={{
              fontSize: responsiveFontSize(5),
            }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(5),
              fontFamily: fonts.exotB,
              color: Colors.alpha,
            }}>
            Mobile
          </Text>
          <Text
            style={{
              fontSize: responsiveFontSize(5),
              fontFamily: fonts.exotB,
              color: Colors.charlie,
            }}>
            Messenger
          </Text>
          <Text
            style={{
              padding: 10,
              fontFamily: fonts.exotB,
              fontSize: responsiveFontSize(1.8),
            }}>
            CHAT / FIND FRIENDS / CONNECT
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          backgroundColor: Colors.charlie,
        }}>
        <Text
          style={{
            color: Colors.alphaDark,
            fontFamily: fonts.acuminB,
            paddingRight: 0,
            textAlign: 'center',
            fontSize: responsiveFontSize(1.7),
          }}>
          Already have an account? Sign in
        </Text>
        <Button
          full
          style={styles.btn}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.btnText}>SIGN IN</Text>
        </Button>

        <Button
          full
          style={styles.btn}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.btnText}>SIGN UP</Text>
        </Button>
        <Text
          style={{
            color: Colors.alphaDark,
            fontFamily: fonts.acuminB,
            paddingRight: 0,
            textAlign: 'center',
            fontSize: responsiveFontSize(1.7),
          }}>
          Don't have an account? Sign Up
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.charlie,
    backgroundColor: Colors.bravo,
  },

  btn: {
    width: responsiveWidth(75),
    backgroundColor: Colors.bravo,
    alignSelf: 'center',
    borderRadius: 4,
    marginVertical: 5,
  },
  btnText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
  },
});

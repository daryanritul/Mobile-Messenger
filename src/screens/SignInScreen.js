import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Button, Form, Icon, Input, Item} from 'native-base';
import {fonts} from '../Constants/Fonts';

const SignInScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          name="chatbox-ellipses-sharp"
          style={{
            color: Colors.alpha,

            fontSize: responsiveFontSize(8),
          }}
        />
        <Text
          style={{
            fontSize: responsiveFontSize(3.5),
            alignSelf: 'center',
            fontFamily: fonts.exotB,
            color: Colors.alpha,
          }}>
          MOBILE{' '}
          <Text
            style={{
              color: Colors.bravo,
            }}>
            MESSENGER
          </Text>
        </Text>
      </View>

      <View
        style={{
          flex: 3,
        }}>
        <View
          style={{
            padding: 5,
            alignItems: 'center',
          }}>
          <Text style={styles.authTitle}>LOGIN INTO YOUR ACCOUNT</Text>
          <Text style={styles.authText}>
            Fill in your details to login into your account
          </Text>
        </View>

        <View style={styles.inputBox}>
          <Icon name="mail" style={styles.inputIcon} />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            placeholderTextColor={Colors.alpha}
          />
        </View>
        <View style={styles.inputBox}>
          <Icon name="key" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor={Colors.alpha}
            secureTextEntry={true}
          />
        </View>

        <Button full style={styles.btn}>
          <Text style={styles.btnText}>Log in</Text>
        </Button>
        <TouchableOpacity
          style={{
            padding: 10,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: Colors.alphaDark,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(1.6),
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(80),
            alignSelf: 'center',
          }}>
          <View style={styles.divider}></View>
          <Text
            style={{
              color: Colors.alphaDark,
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.1),
            }}>
            OR
          </Text>
          <View style={styles.divider}></View>
        </View>
        <Button
          full
          style={styles.btn}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.btnText}>Create Account</Text>
        </Button>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.charlie,
  },

  lowerContainer: {
    flex: 1,
    backgroundColor: Colors.three,
  },
  logoText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: Colors.one,
  },
  btn: {
    width: responsiveWidth(80),
    backgroundColor: Colors.bravo,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 5,
    borderRadius: 8,
  },
  btnText: {
    color: Colors.charlie,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.1),
  },
  input: {
    backgroundColor: Colors.charlieDark,
    color: Colors.alphaLow,
    width: '85%',
    fontFamily: fonts.acuminR,
    borderRadius: 8,
    fontSize: responsiveFontSize(1.6),
    alignSelf: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    width: responsiveWidth(80),
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 8,
    backgroundColor: Colors.charlieDark,
    marginVertical: 5,
  },
  inputIcon: {
    width: '15%',
    backgroundColor: Colors.alpha,

    color: Colors.charlieDark,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(3),
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  authTitle: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.alpha,
    fontFamily: fonts.openSansB,
    fontFamily: fonts.acuminB,
  },
  authText: {
    color: Colors.alphaDark,
    fontSize: responsiveFontSize(1.6),
    fontFamily: fonts.acuminR,
  },
  divider: {
    borderBottomWidth: 1,
    flex: 1,
    margin: 5,
    borderColor: Colors.alphaDark,
    alignSelf: 'center',
  },
});

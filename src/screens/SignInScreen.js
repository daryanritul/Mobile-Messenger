import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Button, Form, Icon, Input, Item} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';
import ErrorMsg from '../Components/ErrorMsg';

import {emailValidator} from '../Constants/Validator';
import {signIn} from '../store/actions';
import {connect} from 'react-redux';

const SignInScreen = ({navigation, signIn, isLoading, error}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const validEmail = emailValidator(email);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: responsiveWidth(85),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            padding: 5,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(3.7),
              fontFamily: fonts.exotB,
              color: Colors.alpha,
            }}>
            Welcome!{' '}
            <Text
              style={{
                color: Colors.bravo,
              }}>
              Back
            </Text>
          </Text>
        </View>
        <AppInput
          icon="mail"
          placeholder="Email"
          value={email}
          editable={!isLoading}
          onChangeText={(text) => setEmail(text)}
          valid={!validEmail}
        />
        <ErrorMsg errorMsg={validEmail} />

        <AppInput
          icon="key"
          placeholder="Password"
          value={password}
          editable={!isLoading}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          valid={!validEmail && password}
        />
        <ErrorMsg errorMsg="" />
        <Button
          full
          style={[
            styles.btn,
            {
              backgroundColor:
                validEmail || !password ? Colors.bravoDark : Colors.bravo,
            },
          ]}
          disabled={validEmail || !password ? true : false}
          onPress={() => signIn({email, password})}>
          {isLoading ? (
            <Text style={styles.btnText}>Signing In . . .</Text>
          ) : (
            <Text style={styles.btnText}>SIGN IN</Text>
          )}
        </Button>
        <ErrorMsg errorMsg={error ? error : ' '} />

        <View
          style={{
            alignItems: 'center',
            margin: 15,
          }}>
          <Text
            style={{
              color: Colors.alpha,
              fontFamily: fonts.acuminBI,
              fontSize: responsiveFontSize(1.5),
            }}>
            Forgot your login password?
          </Text>
          <Pressable onPress={() => navigation.navigate('RecoverPassword')}>
            <Text
              style={{
                color: Colors.alphaDark,
                fontFamily: fonts.acuminI,
                fontSize: responsiveFontSize(1.5),
                textDecorationLine: 'underline',
                padding: 5,
              }}>
              Recover your password.
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.alphaDark,
            fontFamily: fonts.acuminB,
            padding: 20,
            paddingRight: 0,
            textAlign: 'center',
            fontSize: responsiveFontSize(1.7),
          }}>
          Don't have an account?
        </Text>
        <Text
          style={{
            fontFamily: fonts.acuminB,
            padding: 10,
            paddingLeft: 0,
            textAlign: 'center',
            fontSize: responsiveFontSize(1.7),
            textDecorationLine: 'underline',
            color: Colors.bravo,
          }}
          onPress={() => navigation.replace('SignUpScreen')}>
          {' '}
          Sign up
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  signIn: (data) => signIn(data),
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.charlie,
  },

  btn: {
    width: '95%',
    backgroundColor: Colors.bravo,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 4,
    elevation: 0,
  },
  btnText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
  },
});

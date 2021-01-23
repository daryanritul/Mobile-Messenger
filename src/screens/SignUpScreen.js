import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Button} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';
import ErrorMsg from '../Components/ErrorMsg';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from '../Constants/Validator';

import {signUp} from '../store/actions';
import {connect} from 'react-redux';

const SignUpScreen = ({navigation, signUp, isLoading, error}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const validEmail = emailValidator(email);
  const validPass = passwordValidator(password);
  const confrmPass = confirmPasswordValidator(password, confirmPassword);

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
            Welcome
            <Text
              style={{
                color: Colors.bravo,
              }}>
              !
            </Text>
          </Text>
        </View>

        <AppInput
          icon="mail"
          placeholder="Email"
          value={email}
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
          valid={!validPass}
        />
        <ErrorMsg errorMsg={validPass} />

        <AppInput
          icon="key"
          placeholder="Confirm Password"
          value={confirmPassword}
          editable={!isLoading}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          valid={!confrmPass}
        />
        <ErrorMsg errorMsg={confrmPass} />

        <Button
          full
          style={[
            styles.btn,
            {
              backgroundColor:
                validEmail || validPass || confrmPass
                  ? Colors.bravoDark
                  : Colors.bravo,
            },
          ]}
          disabled={validEmail || validPass || confrmPass ? true : false}
          onPress={() =>
            signUp({
              email: email,
              password: password,
            })
          }>
          {isLoading ? (
            <Text style={styles.btnText}>Signing Up . . .</Text>
          ) : (
            <Text style={styles.btnText}>SIGN UP</Text>
          )}
        </Button>
        <ErrorMsg errorMsg={error ? error : ''} />
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
          Already have an account?
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
          onPress={() => navigation.replace('SignInScreen')}>
          {' '}
          Sign In
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  signUp: (data) => signUp(data),
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.charlie,
  },

  btn: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    elevation: 0,
    borderRadius: 4,
  },
  btnText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
  },
});

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

import {Button, Form, Icon, Input, Item} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';
import ErrorMsg from '../Components/ErrorMsg';
import {recoverPassword} from '../store/actions/authActions';
import {connect} from 'react-redux';
import {emailValidator} from '../Constants/Validator';

const RecoverPassword = ({navigation, recoverPassword, recoverState}) => {
  const [email, setEmail] = useState();

  const validEmail = emailValidator(email);

  console.log(recoverState);

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
              fontSize: responsiveFontSize(2.7),
              fontFamily: fonts.acuminB,
              color: Colors.alpha,
            }}>
            Recover Password!
          </Text>
        </View>
        <AppInput
          icon="mail"
          placeholder="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          valid={!validEmail}
        />
        <ErrorMsg errorMsg={validEmail} />

        <Button
          full
          style={styles.btn}
          disabled={validEmail ? true : false}
          onPress={() => recoverPassword(email)}>
          {recoverState.loading ? (
            <ActivityIndicator size="small" color={Colors.charlie} />
          ) : (
            <Text style={styles.btnText}>Send Recovery Email</Text>
          )}
        </Button>
        <ErrorMsg errorMsg={recoverState.error ? recoverState.error : ' '} />
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
  recoverPassword: (email) => recoverPassword(email),
};

const mapStateToProps = (state) => ({
  recoverState: state.auth.recoverPassword,
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);

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
    margin: 5,
    elevation: 0,
    borderRadius: 4,
  },
  btnText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
  },
});

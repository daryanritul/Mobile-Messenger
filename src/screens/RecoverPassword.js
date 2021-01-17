import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
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
import AppInput from '../Components/AppInput';

const RecoverPassword = ({navigation}) => {
  const [email, setEmail] = useState({
    msg: 'Feild required',
    value: '',
  });
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
          placeholder="Email"
          value={email.value}
          onChangeText={(text) => setEmail({...email, value: text})}
          errorMsg={email.msg}
        />

        <Button full style={styles.btn} onPress={() => console.log('SIGN IN')}>
          <Text style={styles.btnText}>Send Recovery Email</Text>
        </Button>
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

export default RecoverPassword;

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
  },
  btnText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
  },
});

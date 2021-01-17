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

const AppInput = ({icon, iconTtype, errorMsg, length, ...otherProps}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBox}>
        <Icon name={icon} style={styles.inputIcon} type={iconTtype} />
        <TextInput
          style={styles.input}
          {...otherProps}
          placeholderTextColor={Colors.charlieDark}
        />
        {!errorMsg ? (
          <Icon
            name="checkmark-circle"
            style={[styles.inputIcon, {color: 'green'}]}
          />
        ) : (
          <Icon
            name="alert-circle"
            style={[styles.inputIcon, {color: 'red'}]}
          />
        )}
      </View>
      {errorMsg ? (
        <Text style={styles.inputError}>{errorMsg}</Text>
      ) : (
        <Text style={styles.inputError}></Text>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  input: {
    color: Colors.alphaLow,
    width: '70%',
    fontFamily: fonts.engrav,
    fontSize: responsiveFontSize(1.7),
    alignSelf: 'center',
  },
  inputContainer: {
    width: responsiveWidth(80),
    alignSelf: 'center',
    marginVertical: 5,
  },
  inputError: {
    fontSize: responsiveFontSize(1.2),
    textAlign: 'right',
    color: 'red',
    marginHorizontal: 5,
    fontFamily: fonts.acuminI,
  },
  inputBox: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.charlieDark,
  },
  inputIcon: {
    width: '15%',

    color: Colors.charlieDark,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(3),
  },
});

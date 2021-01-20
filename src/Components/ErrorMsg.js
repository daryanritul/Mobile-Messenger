import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

import {fonts} from '../Constants/Fonts';

const ErrorMsg = ({errorMsg}) => {
  return errorMsg ? (
    <Text style={styles.inputError}>{errorMsg}</Text>
  ) : (
    <Text style={styles.inputError}></Text>
  );
};

export default ErrorMsg;

const styles = StyleSheet.create({
  inputError: {
    fontSize: responsiveFontSize(1.35),
    color: 'red',
    textAlign: 'center',
    fontFamily: fonts.acuminI,
  },
});

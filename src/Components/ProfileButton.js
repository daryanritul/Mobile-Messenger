import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import {Icon} from 'native-base';

import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';

const ProfileButton = ({
  iconName,
  iconType,
  label,
  blue,
  green,
  red,
  loading = false,
  small,
  onPressHandler,
}) => {
  return (
    <TouchableHighlight
      style={{
        width: small ? '20%' : '40%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: small ? 0 : 5,
        backgroundColor:
          (green && 'rgba(130, 224, 170,0.4)') ||
          (blue && 'rgba(133, 193, 233,0.4)') ||
          (red && 'rgba(236, 112, 99,0.4)'),
      }}
      disabled={loading}
      underlayColor={
        (green && 'rgba(130, 224, 170,0.7)') ||
        (blue && 'rgba(133, 193, 233,0.7)') ||
        (red && 'rgba(236, 112, 99,0.7)')
      }
      onPress={onPressHandler}>
      {!loading ? (
        <>
          <Icon
            name={iconName}
            type={iconType}
            style={{
              color:
                (green && '#196F3D') ||
                (blue && Colors.bravo) ||
                (red && '#E21717'),
              fontSize: responsiveFontSize(3.8),
            }}
          />
          <Text
            style={[
              styles.listButton,
              {
                color:
                  (green && '#196F3D') ||
                  (blue && Colors.bravo) ||
                  (red && '#E21717'),
                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(1.7),
              },
            ]}>
            {label}
          </Text>
        </>
      ) : (
        <ActivityIndicator
          color={
            (green && '#196F3D') || (blue && Colors.bravo) || (red && '#E21717')
          }
          size={small ? 'small' : 'large'}
        />
      )}
    </TouchableHighlight>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({});

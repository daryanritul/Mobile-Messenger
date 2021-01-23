import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {Colors} from '../Constants/Colors';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.charlie,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          color={Colors.bravo}
          size="large"
          style={styles.loading}
        />
        <ActivityIndicator
          color={Colors.alpha}
          size="small"
          style={styles.loading}
        />
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            position: 'relative',
            marginTop: 100,
          }}>
          Loading...
        </Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
  },
});

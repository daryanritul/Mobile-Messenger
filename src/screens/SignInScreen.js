import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const SignInScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Sign In Screen</Text>
      <Button
        title="Sign up"
        onPress={() => navigation.replace('SignUpScreen')}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

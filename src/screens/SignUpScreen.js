import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text> Welcome to Sign Up Screen</Text>
      <Button
        title="Sign In"
        onPress={() => navigation.replace('SignInScreen')}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

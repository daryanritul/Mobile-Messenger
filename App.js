import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import AppNavigator from './src/Navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

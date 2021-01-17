import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import AppNavigator from './src/Navigation/AppNavigator';
import {Colors} from './src/Constants/Colors';

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
      {/* <AppNavigator /> */}
      <StatusBar backgroundColor={Colors.bravo} barStyle="dark-content" />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

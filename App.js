import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import EmailVarificationScreen from './src/screens/EmailVarificationScreen';
import AppNavigator from './src/Navigation/AppNavigator';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import {Colors} from './src/Constants/Colors';

import {connect, useDispatch} from 'react-redux';
import {
  AUTH_SUCCESS,
  CLEAN_UP,
  SET_USER,
} from './src/store/actions/actions.types';

import auth from '@react-native-firebase/auth';

const App = ({authState}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    } else {
      dispatch({
        type: CLEAN_UP,
      });
    }
  };
  console.log(authState);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {authState.user && !authState.user.emailVerified ? (
        <EmailVarificationScreen />
      ) : authState.user && authState.user.emailVerified ? (
        authState.profileData.data ? (
          <AppNavigator />
        ) : (
          <UpdateProfileScreen />
        )
      ) : (
        <AuthNavigator />
      )}
      <StatusBar backgroundColor={Colors.bravo} barStyle="dark-content" />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

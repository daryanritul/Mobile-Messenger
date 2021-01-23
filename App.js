import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import EmailVarificationScreen from './src/screens/EmailVarificationScreen';
import AppNavigator from './src/Navigation/AppNavigator';
import UpdateProfileScreen from './src/screens/UpdateProfileScreen';
import {Colors} from './src/Constants/Colors';

import {connect, useDispatch} from 'react-redux';
import {
  CLEAN_UP,
  SET_USER,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from './src/store/actions/actions.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loading from './src/Components/Loading';

const App = ({authState}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async (user) => {
    if (user) {
      dispatch({
        type: UPDATE_PROFILE_START,
      });
      dispatch({
        type: SET_USER,
        payload: user,
      });

      await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: documentSnapshot._data,
          });
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
      {authState.updateProfile.loading ||
      authState.loading ||
      authState.recoverPassword.loading ? (
        <Loading />
      ) : authState.user && !authState.user.emailVerified ? (
        <EmailVarificationScreen />
      ) : authState.user && authState.user.emailVerified ? (
        authState.profileData ? (
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

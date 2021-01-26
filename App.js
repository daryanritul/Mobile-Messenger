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
  SET_FRIENDS,
  SET_USER,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from './src/store/actions/actions.types';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loading from './src/Components/Loading';
import {fetchProifleUrl} from './src/store/actions/friendsActions';

const App = ({authState, fetchProifleUrl}) => {
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
        .onSnapshot((documentSnapshot) => {
          dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: documentSnapshot._data,
          });
        });
      await firestore()
        .collection('friends')
        .where('friendId', 'array-contains', user.uid)
        .onSnapshot(async (documentSnapshot) => {
          const friendList = [];
          documentSnapshot.docs.forEach((friend) =>
            friendList.push(friend._data),
          );

          await fetchProifleUrl(friendList);
          dispatch({
            type: SET_FRIENDS,
            payload: friendList,
          });
        });
    } else {
      dispatch({
        type: CLEAN_UP,
      });
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (authState.Loading || authState.recoverPassword.loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authState.user && !authState.user.emailVerified ? (
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

const mapDispatchToProps = {
  fetchProifleUrl: (data) => fetchProifleUrl(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

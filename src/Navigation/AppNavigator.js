import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FriendsScreen from '../screens/FriendsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import {Pressable, Text} from 'react-native';
import {Icon, Thumbnail} from 'native-base';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import {Colors} from '../Constants/Colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fonts} from '../Constants/Fonts';
import {connect} from 'react-redux';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const AppTabs = () => {
  return (
    <TopTabs.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        style: {
          //  height: 0,
          backgroundColor: Colors.bravo,
          elevation: 0,
        },
        // showLabel: false,
        // showIcon: false,
        labelStyle: {
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.6),
          color: Colors.charlie,
        },
        indicatorStyle: {
          backgroundColor: Colors.charlie,
        },
      }}>
      <TopTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'chats',
        }}
      />
      <TopTabs.Screen
        name="FriendsScreen"
        component={FriendsScreen}
        options={{
          title: 'Friends',
        }}
      />
    </TopTabs.Navigator>
  );
};

const AppNavigator = ({profileUrl}) => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          elevation: 0,
          backgroundColor: Colors.bravo,
        },
        headerTitleStyle: {
          color: Colors.charlie,
          fontFamily: fonts.acuminB,
          fontSize: responsiveFontSize(2.6),
        },
        headerTintColor: Colors.charlie,
      })}>
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={({route, navigation}) => ({
          title: 'Mobile Messenger',

          headerRight: ({}) => (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.charlie,
                borderRadius: 50,
                margin: 10,
                padding: 2,
              }}
              onPress={() =>
                navigation.navigate('ProfileScreen', {
                  data: false,
                })
              }>
              <Thumbnail
                source={{
                  uri: profileUrl,
                }}
                small
                style={{}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTransparent: true,
          headerTitle: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => ({
  profileUrl: state.auth.profileData.profileUrl,
});

export default connect(mapStateToProps, null)(AppNavigator);

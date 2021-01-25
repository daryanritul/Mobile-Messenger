import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import {Pressable, Text} from 'react-native';
import {Icon} from 'native-base';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import {Colors} from '../Constants/Colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fonts} from '../Constants/Fonts';

const Stack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const AppTabs = () => {
  return (
    <TopTabs.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        style: {
          //   height: 0,
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
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: 'Contacts',
        }}
      />
    </TopTabs.Navigator>
  );
};

const AppNavigator = () => {
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

          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
              <Icon
                name="account-box"
                type="MaterialIcons"
                style={{
                  paddingHorizontal: 10,
                }}
              />
            </Pressable>
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
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
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

export default AppNavigator;

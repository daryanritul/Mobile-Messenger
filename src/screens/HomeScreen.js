import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Chats"
        onPress={() => navigation.navigate('ChatScreen')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

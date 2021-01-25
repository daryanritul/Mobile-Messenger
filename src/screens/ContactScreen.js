import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const ContactScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Contact Screen</Text>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('SearchScreen')}
      />
      <Text>Contacts Profiles</Text>
      <Button
        title="View Profile"
        onPress={() => navigation.navigate('ProfileScreen', {data: false})}
      />
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});

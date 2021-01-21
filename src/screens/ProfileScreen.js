import {Button} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../store/actions/authActions';

const ProfileScreen = ({signOut}) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button danger block onPress={() => signOut()}>
        <Text>SIGN OUT</Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = {
  signOut: () => signOut(),
};

export default connect(null, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({});

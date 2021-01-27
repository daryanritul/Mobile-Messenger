import {Icon, Thumbnail} from 'native-base';
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {connect} from 'react-redux';
import {
  acceptRequest,
  declineRequest,
  fetchFriendsList,
  fetchProifleUrl,
  sendRequest,
} from '../store/actions/friendsActions';

import firestore from '@react-native-firebase/firestore';

const ContactScreen = ({
  navigation,
  friendState,
  declineRequest,
  acceptRequest,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (uuid) => {
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(uuid)
      .get()
      .then((dataSnapshot) => {
        navigation.navigate('ProfileScreen', {
          data: dataSnapshot._data,
        });
      });
    setLoading(false);
  };

  const RequestListCard = ({data}) => {
    const dataState = data.list;
    const filteredByKey = 'ss';
    return (
      <TouchableHighlight
        underlayColor="rgba(214, 234, 248,1)"
        onPress={() => {
          fetchUserData(data.list.uid);
        }}
        style={{
          flexDirection: 'row',
          margin: 10,
          marginTop: 3,
          elevation: 2,
          backgroundColor: Colors.charlie,
          height: responsiveHeight(10),
        }}>
        <>
          <Thumbnail
            source={{
              uri: data.profileUrl,
            }}
            style={{
              width: '20%',
              height: '100%',
            }}
            large
            square
          />
          <View
            style={{
              width: '40%',
              height: '100%',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                paddingHorizontal: 5,
                height: '100%',
                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(1.8),
                color: Colors.alpha,
              }}>
              {dataState.userName}
              {'\n'}
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Colors.charlieDark,
                }}>
                {'@username'}
              </Text>
            </Text>
          </View>

          <TouchableHighlight
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(130, 224, 170,0.3)',
            }}
            underlayColor="rgba(130, 224, 170,0.6)"
            onPress={() => acceptRequest(data.uid)}>
            <>
              <Icon
                name="checkmark-sharp"
                style={{
                  color: '#196F3D',
                  fontSize: responsiveFontSize(3.5),
                }}
              />
              <Text
                style={[
                  styles.listButton,
                  {
                    color: '#196F3D',
                  },
                ]}>
                Accept
              </Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(236, 112, 99,0.3)',
            }}
            underlayColor="rgba(236, 112, 99,0.6)"
            onPress={() => declineRequest(data.uid)}>
            <>
              <Icon
                name="close"
                style={{
                  color: '#E21717',
                  fontSize: responsiveFontSize(3.5),
                }}
              />
              <Text
                style={[
                  styles.listButton,
                  {
                    color: '#E21717',
                  },
                ]}>
                Decline
              </Text>
            </>
          </TouchableHighlight>
        </>
      </TouchableHighlight>
    );
  };
  const SendListCard = ({data}) => {
    const dataState = data.list;

    return (
      <TouchableHighlight
        underlayColor="rgba(214, 234, 248,1)"
        onPress={() => {
          fetchUserData(data.list.uid);
        }}
        style={{
          flexDirection: 'row',
          margin: 10,
          marginTop: 3,
          elevation: 2,
          backgroundColor: Colors.charlie,
          height: responsiveHeight(10),
        }}>
        <>
          <Thumbnail
            source={{
              uri: data.profileUrl,
            }}
            style={{
              width: '20%',
              height: '100%',
            }}
            large
            square
          />
          <View
            style={{
              width: '40%',
              height: '100%',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                paddingHorizontal: 5,
                height: '100%',
                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(1.8),
                color: Colors.alpha,
              }}>
              {dataState.userName}
              {'\n'}
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Colors.charlieDark,
                }}>
                {'@username'}
              </Text>
            </Text>
          </View>

          <TouchableHighlight
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(130, 224, 170,0.3)',
            }}
            underlayColor="rgba(130, 224, 170,0.6)"
            onPress={() => console.log('ok')}>
            <>
              <Icon
                name="account-clock"
                type="MaterialCommunityIcons"
                style={{
                  color: '#196F3D',
                  fontSize: responsiveFontSize(3.5),
                }}
              />
              <Text
                style={[
                  styles.listButton,
                  {
                    color: '#196F3D',
                  },
                ]}>
                Pending
              </Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(236, 112, 99,0.3)',
            }}
            underlayColor="rgba(236, 112, 99,0.6)"
            onPress={() => declineRequest(data.uid)}>
            <>
              <Icon
                name="close"
                style={{
                  color: '#E21717',
                  fontSize: responsiveFontSize(3.5),
                }}
              />
              <Text
                style={[
                  styles.listButton,
                  {
                    color: '#E21717',
                  },
                ]}>
                Unsent
              </Text>
            </>
          </TouchableHighlight>
        </>
      </TouchableHighlight>
    );
  };

  const FriendListCard = ({data}) => {
    const dataState = data.list;

    return (
      <TouchableHighlight
        underlayColor="rgba(214, 234, 248,1)"
        onPress={() => {
          fetchUserData(data.list.uid);
        }}
        style={{
          flexDirection: 'row',
          margin: 10,
          marginTop: 3,
          elevation: 2,
          backgroundColor: Colors.charlie,
          height: responsiveHeight(10),
        }}>
        <>
          <Thumbnail
            source={{
              uri: data.profileUrl,
            }}
            style={{
              width: '20%',
              height: '100%',
            }}
            large
            square
          />
          <View
            style={{
              width: '60%',
              height: '100%',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                paddingHorizontal: 5,
                height: '100%',
                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(1.8),
                color: Colors.alpha,
              }}>
              {dataState.userName}
              {'\n'}
              <Text
                style={{
                  fontSize: responsiveFontSize(1.5),
                  color: Colors.charlieDark,
                }}>
                {'@username'}
              </Text>
            </Text>
          </View>

          <TouchableHighlight
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'rgba(133, 193, 233,0.4)',
            }}
            underlayColor="rgba(133, 193, 233,0.7)"
            onPress={() => navigation.navigate('ChatScreen')}>
            <>
              <Icon
                name="message"
                type="MaterialIcons"
                style={{
                  color: Colors.bravo,
                  fontSize: responsiveFontSize(3.5),
                }}
              />
              <Text
                style={[
                  styles.listButton,
                  {
                    color: Colors.bravo,
                  },
                ]}>
                Message
              </Text>
            </>
          </TouchableHighlight>
        </>
      </TouchableHighlight>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text>Requests Pending</Text>

      <FlatList
        data={friendState.filter((value) => value.list.status === 'sent')}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => <SendListCard data={item} />}
      />
      <Text>Requests Received</Text>

      <FlatList
        data={friendState.filter((value) => value.list.status === 'receive')}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => <RequestListCard data={item} />}
      />

      <Text>My Friends</Text>

      <FlatList
        data={friendState.filter((value) => value.list.status === 'friends')}
        keyExtractor={(item) => item.uid}
        renderItem={({item}) => <FriendListCard data={item} />}
      />
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.bravo} />
          <Text
            style={{
              padding: 10,
              fontFamily: fonts.acuminB,
              fontSize: responsiveFontSize(1.8),
              color: Colors.alpha,
            }}>
            Redirecting. . .
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  friendState: state.friends.friendsList,
});

const mapDispatchToProps = {
  declineRequest: (uid1, uid2) => declineRequest(uid1, uid2),
  acceptRequest: (uid1, uid2) => acceptRequest(uid1, uid2),
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);

const styles = StyleSheet.create({
  listButton: {
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(1.6),
  },
});

import {Badge, Icon, Thumbnail, Fab, Button} from 'native-base';
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
import {TextInput} from 'react-native-gesture-handler';

const FriendsScreen = ({
  navigation,
  friendState,
  declineRequest,
  acceptRequest,
}) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [search, setSearch] = useState('');
  const friends = friendState.filter(
    (value) => value.list.status === 'friends',
  );

  const receive = friendState.filter(
    (value) => value.list.status === 'receive',
  );
  const sent = friendState.filter((value) => value.list.status === 'sent');

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
        backgroundColor: Colors.charlie,
      }}>
      <View
        style={{
          backgroundColor: Colors.charlie,
          alignItems: 'center',
          flexDirection: 'row',
          height: responsiveHeight(7),
          margin: 10,
          marginTop: 3,
          //  width: '100%',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 50,
            borderColor: Colors.bravoDark,
            alignItems: 'center',
            flexDirection: 'row',
            width: '75%',
            marginLeft: 5,
            height: '85%',
          }}>
          <Icon
            name="search"
            style={{
              color: Colors.bravo,
              fontSize: responsiveFontSize(3),
              width: '15%',
              textAlign: 'center',
            }}
          />
          <TextInput
            placeholder="Search Friends"
            style={{
              width: '70%',
            }}
            value={search}
            onChangeText={(text) => setSearch(text)}
            editable={!mode}
          />
          <Icon
            name="close-circle"
            style={{
              color: Colors.bravo,
              fontSize: responsiveFontSize(3),
              width: '15%',
              textAlign: 'center',
            }}
          />
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
          onPress={() => setMode(!mode)}>
          <>
            {receive.length > 0 && !mode && (
              <Text
                style={{
                  fontSize: responsiveFontSize(1),
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: 'red',
                  height: 15,
                  width: 15,
                  textAlign: 'center',
                  color: Colors.charlie,
                  fontFamily: fonts.acuminB,
                  borderRadius: 50,
                  textAlignVertical: 'center',
                }}>
                {receive.length}
              </Text>
            )}
            <Icon
              name={!mode ? 'account-plus' : 'step-backward-2'}
              type="MaterialCommunityIcons"
              style={{
                color: Colors.bravo,
                fontSize: responsiveFontSize(3.2),
              }}
            />
            <Text
              style={[
                styles.listButton,
                {
                  color: Colors.bravo,
                  fontSize: responsiveFontSize(1.3),
                },
              ]}>
              {mode ? 'Go Back' : 'Requests'}
            </Text>
          </>
        </TouchableHighlight>
      </View>
      <Text
        style={{
          color: Colors.alpha,
          fontFamily: fonts.acuminB,
          marginHorizontal: 10,
        }}>
        {mode
          ? `Friend Requests (${receive.length})`
          : ` My Friends (${friends.length})`}
      </Text>
      {loading ? (
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
      ) : (
        <View>
          {mode &&
            (receive.length ? (
              <FlatList
                data={receive}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => <RequestListCard data={item} />}
              />
            ) : (
              <View
                style={{
                  margin: 10,
                  height: responsiveHeight(9),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    padding: 10,
                    fontFamily: fonts.acuminB,
                    fontSize: responsiveFontSize(1.8),
                    color: Colors.alpha,
                  }}>
                  You Have No Friends Requests!
                </Text>
              </View>
            ))}
          {mode && sent.length > 0 && (
            <>
              <Text
                style={{
                  color: Colors.alpha,
                  fontFamily: fonts.acuminB,
                  marginHorizontal: 10,
                }}>
                {`Your Pending Sent Requests (${receive.length})`}
              </Text>
              <FlatList
                data={sent}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => <SendListCard data={item} />}
              />
            </>
          )}

          {!mode && (
            <FlatList
              data={friends}
              keyExtractor={(item) => item.uid}
              renderItem={({item}) => <FriendListCard data={item} />}
            />
          )}
        </View>
      )}
      <Fab
        position="bottomRight"
        style={{
          backgroundColor: Colors.bravo,
        }}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Icon name="search" />
      </Fab>
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);

const styles = StyleSheet.create({
  listButton: {
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(1.6),
  },
});

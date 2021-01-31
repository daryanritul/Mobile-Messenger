import {Button, Icon, Thumbnail} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';

import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';
import {
  addSearchHistory,
  clearSearchHistory,
  removeSearchHistory,
} from '../store/actions/authActions';
import {connect} from 'react-redux';

const SearchScreen = ({
  navigation,
  addSearchHistory,
  clearSearchHistory,
  removeSearchHistory,
  searchHistory,
}) => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState();
  const [searchStatus, setSearchStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    if (searchHistory.length > 0) {
      const status = searchHistory.filter((value) => value.userName === search);
      if (status.length) {
        removeSearchHistory(status[0].uid);
        setResult({
          uid: status[0].uid,
          userName: status[0].userName,
          profileUrl: status[0].profileUrl,
        });
        return;
      }
    }
    setSearchStatus(true);
    await firestore()
      .collection('userNames')
      .where('userName', '==', search)
      .get()
      .then(async (dataSnapshot) => {
        if (dataSnapshot._docs[0]) {
          const storageRef = await storage().ref(
            'users/profilePicture/' + dataSnapshot._docs[0]._data.uid,
          );
          await storageRef
            .getDownloadURL()
            .then((url) => {
              setResult({
                uid: dataSnapshot._docs[0]._data.uid,
                userName: dataSnapshot._docs[0]._data.userName,
                profileUrl: url,
              });
            })
            .catch((err) => {
              if (err.code === 'storage/object-not-found') {
                setResult({
                  uid: dataSnapshot._docs[0]._data.uid,
                  userName: dataSnapshot._docs[0]._data.userName,
                  profileUrl:
                    'https://firebasestorage.googleapis.com/v0/b/mobile-messenger-b9264.appspot.com/o/users%2FprofilePicture%2FmaleAvatar.jpg?alt=media&token=ded1a45d-392d-4bc1-ae68-6f4f49a0dde6',
                });
              }
            });
        } else {
          setResult(false);
          console.log('notFound');
        }
      });
    setSearchStatus(false);
  };

  const fetchUserData = async (uuid) => {
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(uuid)
      .get()
      .then((dataSnapshot) => {
        addSearchHistory(dataSnapshot._data);
        navigation.navigate('ProfileScreen', {
          data: dataSnapshot._data,
        });
      });
    setLoading(false);
    setResult(null);
  };

  const SearchUserCard = ({data, fetch}) => {
    return (
      <TouchableHighlight
        underlayColor={Colors.bravoDark}
        onPress={() => {
          if (!fetch) {
            navigation.navigate('ProfileScreen', {
              data: data,
            });
          } else {
            fetchUserData(data.uid);
          }
        }}
        style={{
          flexDirection: 'row',

          margin: 10,
          marginTop: 3,
          elevation: 8,
          backgroundColor: Colors.charlie,
        }}>
        <>
          <Thumbnail
            source={{
              uri: data.profileUrl,
            }}
            style={{}}
            large
            square
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                paddingHorizontal: 15,
                padding: 5,

                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(2),
                color: Colors.alpha,
              }}>
              {data.userName}
            </Text>
            <Text
              style={{
                textAlignVertical: 'center',
                paddingHorizontal: 15,
                fontFamily: fonts.acuminB,
                fontSize: responsiveFontSize(1.8),
                color: Colors.charlieDark,
              }}>
              @UserName
            </Text>
          </View>
          {!fetch ? (
            <Icon
              name="close"
              onPress={() => removeSearchHistory(data.uid)}
              style={{
                color: Colors.bravo,
                textAlignVertical: 'center',
                padding: 5,
                fontSize: responsiveFontSize(3),
              }}
            />
          ) : (
            <Icon
              name="chevron-forward"
              style={{
                color: Colors.bravo,
                textAlignVertical: 'center',
                padding: 5,
                fontSize: responsiveFontSize(4.5),
              }}
            />
          )}
        </>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View
          style={{
            height: '100%',
            width: '12%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            underlayColor={'rgba(256,256,256,0.5)'}
            disabled={loading}
            style={{
              borderRadius: 60,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="arrow-back"
              style={{
                color: Colors.charlie,
              }}
            />
          </TouchableHighlight>
        </View>
        <View
          style={{
            width: '76%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <View
            style={{
              width: '98%',
              height: '65%',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: Colors.bravoDark,
            }}>
            <Pressable
              onPress={() => console.log('hello')}
              style={{
                borderRadius: 60,
                width: '15%',

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="search"
                style={{
                  color: Colors.charlie,
                  fontSize: responsiveFontSize(3),
                }}
              />
            </Pressable>
            <TextInput
              placeholder={'Search with username'}
              placeholderTextColor={Colors.charlieDark}
              value={search}
              onChangeText={(text) => setSearch(text)}
              editable={!searchStatus || !loading}
              style={{
                width: '70%',
                color: Colors.charlie,
                fontFamily: fonts.acuminR,
                fontSize: responsiveFontSize(1.9),
              }}
            />
            <Pressable
              onPress={() => setSearch('')}
              style={{
                borderRadius: 60,
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="close-circle"
                style={{
                  color: Colors.charlie,
                  fontSize: responsiveFontSize(3),
                }}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            height: '100%',
            width: '12%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!searchStatus ? (
            <TouchableHighlight
              onPress={() => {
                if (search) {
                  fetchUsers();
                }
              }}
              underlayColor={'rgba(256,256,256,0.5)'}
              disabled={loading}
              style={{
                borderRadius: 60,
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="checkmark-sharp"
                style={{
                  color: Colors.charlie,
                }}
              />
            </TouchableHighlight>
          ) : (
            <ActivityIndicator size="small" color={Colors.charlie} />
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
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
        {!loading && (
          <>
            {result && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    fontFamily: fonts.acuminB,
                    fontSize: responsiveFontSize(1.5),
                    color: Colors.bravoDark,
                  }}>
                  Search Result
                </Text>
                <Text
                  onPress={() => setResult()}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    fontFamily: fonts.acuminB,
                    fontSize: responsiveFontSize(1.5),
                    color: Colors.bravoDark,
                  }}>
                  Clear All
                </Text>
              </View>
            )}
            {result && <SearchUserCard data={result} fetch={true} />}
            {result === false && (
              <View
                style={{
                  height: responsiveHeight(18),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.alpha,
                    fontSize: responsiveFontSize(1.8),
                    fontFamily: fonts.acuminB,
                  }}>
                  No User Found with this user
                </Text>
                <Text
                  style={{
                    color: Colors.alpha,
                    fontSize: responsiveFontSize(1.5),
                    fontFamily: fonts.acuminB,
                  }}>
                  Check User name and try again
                </Text>
              </View>
            )}
            {searchHistory.length > 0 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      fontFamily: fonts.acuminB,
                      fontSize: responsiveFontSize(1.6),
                      color: Colors.bravoDark,
                    }}>
                    Recently Visited
                  </Text>
                  <Text
                    onPress={() => clearSearchHistory()}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      fontFamily: fonts.acuminB,
                      fontSize: responsiveFontSize(1.6),
                      color: Colors.bravoDark,
                    }}>
                    Clear All
                  </Text>
                </View>
                {searchHistory.map((value) => (
                  <SearchUserCard data={value} key={value.uid} fetch={false} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  addSearchHistory: (data) => addSearchHistory(data),
  clearSearchHistory: () => clearSearchHistory(),

  removeSearchHistory: (id) => removeSearchHistory(id),
};

const mapStateToProps = (state) => ({
  searchHistory: state.auth.searchHistory,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charlie,
  },
  headerBar: {
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.bravo,
    alignItems: 'center',
    height: responsiveHeight(9),
    flexDirection: 'row',
  },
});

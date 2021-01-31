import {Button, Icon, Item, List, Thumbnail} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../Constants/Colors';

import firestore from '@react-native-firebase/firestore';
import {fetchChats, markAsSeen} from '../store/actions/chatActions';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {fonts} from '../Constants/Fonts';
import {FlatList, TextInput} from 'react-native-gesture-handler';

const ChatScreen = ({
  friendsList,
  navigation,
  route,
  user,
  markAsSeen,
  chatList,
}) => {
  const {chatId} = route.params;

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const myChats = chatList.chatList.filter((chats) => chats.chatId === chatId);

  const friendData = friendsList.filter((friend) => friend.uid === chatId)[0];
  const sendMessage = async (text) => {
    const refrence = await firestore()
      .collection('friends')
      .doc(chatId)
      .collection('messages')
      .doc();

    await refrence
      .set({
        sentAt: firestore.Timestamp.now(),
        sentBy: user.uid,
        text: text,
        uid: refrence.id,
        seen: false,
      })
      .then(() => setText(''));
  };

  const fetchUserData = async () => {
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(friendData.list.uid)
      .get()
      .then((dataSnapshot) => {
        navigation.navigate('ProfileScreen', {
          data: dataSnapshot._data,
        });
      });
    setLoading(false);
  };

  const renderChats = ({item}) => {
    const position = item.sentBy === user.uid ? false : true;

    if (!item.seen && position) {
      markAsSeen(myChats[0].chatId, item.uid);
    }

    return (
      <View
        style={{
          flexDirection: 'column',
          alignSelf: position ? 'flex-start' : 'flex-end',
        }}>
        <View
          style={{
            marginRight: position ? 2 : 8,
            marginLeft: position ? 8 : 2,
            marginVertical: 2,
            borderRadius: 10,
            borderTopLeftRadius: position ? 0 : 10,
            borderBottomRightRadius: position ? 10 : 0,
            backgroundColor: !position ? '#D0D3D4' : Colors.alpha,
            width: 'auto',
            maxWidth: '75%',
            elevation: 2,
          }}>
          <Text
            onPress={() => console.log(item.sentAt)}
            style={{
              padding: 10,
              paddingBottom: position ? 10 : 0,
              color: !position ? Colors.alpha : Colors.charlie,
              fontFamily: fonts.openSansR,
              fontSize: responsiveFontSize(1.8),
            }}>
            {item.text}
          </Text>
          {!position && (
            <Icon
              name="ellipse-sharp"
              style={{
                textAlign: 'right',
                fontSize: responsiveFontSize(1.4),
                color: item.seen ? Colors.bravo : Colors.charlie,
              }}
            />
          )}
        </View>
        <Text
          style={{
            textAlign: position ? 'right' : 'left',
            color: Colors.charlieDark,
            fontSize: responsiveFontSize(1.3),
            fontFamily: fonts.acuminR,
          }}>
          {item.sentAt.toDate().getHours() > 12
            ? item.sentAt.toDate().getHours() - 12
            : item.sentAt.toDate().getHours()}
          :{item.sentAt.toDate().getMinutes()}{' '}
          {item.sentAt.toDate().getHours() > 12 ? 'pm' : 'am'}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#D6EAF8',
      }}>
      <View //headerBar Start
        style={{
          height: responsiveHeight(9),
          width: '100%',
          backgroundColor: Colors.bravo,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            underlayColor={'rgba(256,256,256,0.5)'}
            // disabled={loading}
            style={styles.headerBtn}>
            <Icon name="arrow-back" style={styles.headBtnIcon} />
          </TouchableHighlight>
        </View>
        <Thumbnail
          source={{
            uri: friendData.profileUrl,
          }}
          large
          circular
          style={{
            width: '14.5%',
            height: '85%',
          }}
        />
        <TouchableOpacity
          style={{
            width: '55%',
            height: '100%',
            justifyContent: 'center',
          }}
          onPress={() => fetchUserData()}
          disabled={loading}>
          <Text
            style={{
              fontSize: responsiveFontSize(2.8),
              fontFamily: fonts.acuminB,
              color: Colors.charlie,
              textAlignVertical: 'center',
              paddingLeft: 15,
            }}>
            @{friendData.list.userName}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            onPress={() => console.log('sd')}
            underlayColor={'rgba(256,256,256,0.5)'}
            style={styles.headerBtn}>
            <Icon
              name="trash-can"
              type="MaterialCommunityIcons"
              style={styles.headBtnIcon}
            />
          </TouchableHighlight>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: Colors.charlie,
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
          <FlatList
            data={myChats[0] ? myChats[0].messages : []}
            inverted={-1}
            keyExtractor={(item) => item.uid}
            renderItem={renderChats}
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: Colors.alpha,
          alignItems: 'center',
          flexDirection: 'row',
          height: responsiveHeight(8),
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '85%',
            alignSelf: 'center',
            height: '100%',
          }}>
          <Icon
            name="camera"
            type="Ionicons"
            onPress={() => console.log()}
            style={{
              color: Colors.bravo,
              color: Colors.charlie,
              fontSize: responsiveFontSize(3.8),
              width: '15%',
              textAlign: 'center',
              textAlignVertical: 'center',
              height: '100%',
            }}
          />

          <TextInput
            placeholder="Type a message"
            style={{
              width: '70%',
              height: '100%',
              fontSize: responsiveFontSize(1.8),
              fontFamily: fonts.acuminR,
              color: Colors.charlie,
              backgroundColor: 'rgba(255,255,255  ,0.08)',
            }}
            placeholderTextColor={Colors.charlieDark}
            multiline
            scrollEnabled={true}
            numberOfLines={2}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Icon
            name="image"
            style={{
              color: Colors.bravo,
              color: Colors.charlie,
              fontSize: responsiveFontSize(3.8),
              width: '15%',
              textAlign: 'center',
              textAlignVertical: 'center',
              height: '100%',
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: '15%',
            justifyContent: 'center',
            height: '100%',
          }}
          onPress={() => {
            if (text) {
              sendMessage(text);
              setText('');
            }
          }}>
          <>
            <Icon
              name="send"
              style={{
                color: Colors.charlie,
                fontSize: responsiveFontSize(3),
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            />
          </>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  friendsList: state.friends.friendsList,
  user: state.auth.profileData,
  chatList: state.chats,
});

const mapDispatchToProps = {
  markAsSeen: (uid, chatId) => markAsSeen(uid, chatId),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

const styles = StyleSheet.create({
  headerBtn: {
    borderRadius: 60,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headBtnIcon: {
    color: Colors.charlie,
    fontSize: responsiveFontSize(4),
  },
});

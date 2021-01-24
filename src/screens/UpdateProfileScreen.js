import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Icon, Thumbnail} from 'native-base';
import {fonts} from '../Constants/Fonts';
import AppInput from '../Components/AppInput';
import ErrorMsg from '../Components/ErrorMsg';
import {
  dateValidator,
  displayNameValidator,
  userNameValidator,
} from '../Constants/Validator';
import {updateUserProfile} from '../store/actions/authActions';
import {connect} from 'react-redux';

import ImagePicker from 'react-native-image-crop-picker';
import {set} from 'react-native-reanimated';
import Loading from '../Components/Loading';

const UpdateProfileScreen = ({
  updateUserProfile,
  userEmail,
  uid,
  navigation,
  profileData,
  isLoading,
}) => {
  const [displayName, setDisplayName] = useState(
    profileData ? profileData.name : '',
  );
  const [userName, setUserName] = useState(
    profileData ? profileData.userName : '',
  );
  const [bio, setBio] = useState(profileData ? profileData.bio : '');
  const [dateOfBirth, setDateOfBirth] = useState(
    profileData ? profileData.dateOfBirth : '',
  );
  const [gender, setGender] = useState(
    profileData ? (profileData.gender === 'Male' ? true : false) : null,
  );
  const [profilePicture, setProfilePicture] = useState(
    profileData ? profileData.profileUrl : null,
  );
  const [photoPicker, setPhotoPicker] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);

  const disName = displayNameValidator(displayName);
  const uName = userNameValidator(userName);
  const dob = dateValidator(dateOfBirth);
  const femaleAvatar =
    'https://firebasestorage.googleapis.com/v0/b/mobile-messenger-b9264.appspot.com/o/users%2FprofilePicture%2FfemaleAvatar.jpg?alt=media&token=180de6c7-3dbc-4a67-a647-698cbfe12cda';
  const maleAvatar =
    'https://firebasestorage.googleapis.com/v0/b/mobile-messenger-b9264.appspot.com/o/users%2FprofilePicture%2FmaleAvatar.jpg?alt=media&token=ded1a45d-392d-4bc1-ae68-6f4f49a0dde6';

  const validForm = disName
    ? false
    : true && uName
    ? false
    : true && dob
    ? false
    : true && (gender === true || gender === false)
    ? true
    : false && bio
    ? true
    : false;

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 720,
      height: 720,
      cropping: true,
    }).then((image) => {
      setProfilePicture(image.path);
    });
    setUploadStatus(true);
    setPhotoPicker(false);
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 720,
      height: 720,
      cropping: true,
    }).then((image) => {
      setProfilePicture(image.path);
    });
    setUploadStatus(true);

    setPhotoPicker(false);
  };
  console.log(uploadStatus, profilePicture);
  const updateProfleHandler = async () => {
    await updateUserProfile({
      name: displayName,
      userName,
      profileUrl: profilePicture
        ? profilePicture
        : gender
        ? maleAvatar
        : femaleAvatar,
      bio,
      dateOfBirth,
      gender: gender ? 'Male' : 'Female',
      uid,
      upload: uploadStatus,
    });
    if (profileData) navigation.goBack();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableHighlight
          onPress={() => navigation.goBack()}
          underlayColor={'rgba(0,0,0,0.2)'}
          disabled={profileData ? false : true}
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="close" style={styles.headerIcon} />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>UPDATE PROFILE</Text>
        <TouchableHighlight
          onPress={() => updateProfleHandler()}
          underlayColor={'rgba(0,0,0,0.2)'}
          disabled={!validForm}
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={validForm ? 'checkmark' : 'alert'}
            style={styles.headerIcon}
          />
        </TouchableHighlight>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.avatarBox}>
            {photoPicker && (
              <TouchableOpacity
                onPress={() => takePhotoFromCamera()}
                style={styles.optionBox}>
                <Icon
                  name="camera-plus"
                  type="MaterialCommunityIcons"
                  style={{
                    fontSize: responsiveFontSize(6),
                    color: Colors.alpha,
                  }}
                />
                <Text style={styles.optionText}>Open Camera</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setProfilePicture(null);
                setPhotoPicker(false);
              }}
              style={styles.optionBox}
              disabled={!photoPicker}>
              <Thumbnail
                source={
                  profilePicture && !photoPicker
                    ? {uri: profilePicture}
                    : gender
                    ? {uri: maleAvatar}
                    : {uri: femaleAvatar}
                }
                large
              />
              {photoPicker && (
                <Text style={styles.optionText}>Use Default</Text>
              )}
            </TouchableOpacity>
            {photoPicker && (
              <TouchableOpacity
                onPress={() => choosePhotoFromLibrary()}
                style={styles.optionBox}>
                <Icon
                  name="image-plus"
                  type="MaterialCommunityIcons"
                  style={{
                    fontSize: responsiveFontSize(6),
                    color: Colors.alpha,
                  }}
                />
                <Text style={styles.optionText}>Open Library</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => setPhotoPicker(!photoPicker)}>
            <AppInput
              icon="camera-plus"
              iconType="MaterialCommunityIcons"
              value={photoPicker ? 'Save' : 'Add Profile Image'}
              editable={false}
              inputView={styles.inputView}
              valid={profilePicture}
            />
          </TouchableOpacity>
          <ErrorMsg />

          <AppInput
            icon="email"
            iconType="MaterialCommunityIcons"
            value={userEmail}
            editable={false}
            inputView={styles.inputView}
            valid={true}
          />
          <ErrorMsg />

          <AppInput
            icon="account"
            iconType="MaterialCommunityIcons"
            placeholder="Display Name"
            inputView={styles.inputView}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
            valid={!disName}
          />
          <ErrorMsg errorMsg={disName} />

          <AppInput
            icon="account-settings"
            iconType="MaterialCommunityIcons"
            placeholder="@username"
            inputView={styles.inputView}
            editable={!profileData}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            valid={!uName}
          />
          <ErrorMsg errorMsg={uName} />

          <AppInput
            icon="account-details"
            iconType="MaterialCommunityIcons"
            placeholder="Bio"
            multiline={true}
            inputView={styles.inputView}
            value={bio}
            onChangeText={(text) => setBio(text)}
            valid={bio}
          />
          <ErrorMsg />

          <AppInput
            icon="calendar-range"
            iconType="MaterialCommunityIcons"
            placeholder="Date of Birth (DD/MM/YYYY)"
            inputView={styles.inputView}
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
            valid={!dob}
          />

          <ErrorMsg errorMsg={dob} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(90),
              alignSelf: 'center',
            }}>
            <Pressable
              style={{
                width: '49%',
              }}
              onPress={() => setGender(true)}>
              <AppInput
                icon="human-male"
                iconType="MaterialCommunityIcons"
                value={'MALE'}
                editable={false}
                inputView={{
                  width: '100%',
                }}
                style={{
                  width: '40%',
                  textAlign: 'center',
                }}
                iconStyle={{
                  width: '30%',
                }}
                inputBox={{
                  borderColor: gender === true ? 'green' : Colors.charlieDark,
                }}
                valid={gender === true ? true : false}
              />
            </Pressable>
            <Pressable
              style={{
                width: '49%',
              }}
              onPress={() => setGender(false)}>
              <AppInput
                icon="human-female"
                iconType="MaterialCommunityIcons"
                value={'FEMALE'}
                editable={false}
                inputView={{
                  width: '100%',
                }}
                style={{
                  width: '40%',
                  textAlign: 'center',
                }}
                iconStyle={{
                  width: '30%',
                }}
                inputBox={{
                  borderColor: gender == false ? 'green' : Colors.charlieDark,
                }}
                valid={gender === false ? true : false}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  updateUserProfile: (data) => updateUserProfile(data),
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.user.email,
  uid: state.auth.user.uid,
  profileData: state.auth.profileData,
  isLoading: state.auth.updateProfile.loading,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charlie,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.bravo,
    alignItems: 'center',
    height: responsiveHeight(8),
  },
  headerIcon: {
    color: Colors.charlie,
    fontSize: responsiveFontSize(3.3),
  },
  headerTitle: {
    width: '70%',
    height: '100%',
    fontFamily: fonts.exot,
    color: Colors.charlie,
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  avatarBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: responsiveWidth(90),
    height: responsiveHeight(18),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.charlieDark,
  },
  avatar: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.charlieDark,
    textAlign: 'center',
    padding: 5,
  },
  inputView: {
    width: responsiveWidth(90),
  },
  optionText: {
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(1.5),
    padding: 5,
  },
  optionBox: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
  },
});

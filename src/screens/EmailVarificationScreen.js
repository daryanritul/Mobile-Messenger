import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../Constants/Colors';

import {Button, Spinner} from 'native-base';
import {fonts} from '../Constants/Fonts';
import {emailVarification, reloadUser} from '../store/actions/authActions';
import {connect} from 'react-redux';

const EmailVarificationScreen = ({
  emailVarification,
  reloadUser,
  emailState,
}) => {
  const [resend, setResend] = useState(true);

  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft || !resend) {
      setResend(false);
      setTimeLeft(60);
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      reloadUser();
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, resend]);

  useEffect(() => {
    if (resend) {
      emailVarification();
    }
  }, [resend]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            padding: 5,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(3.7),
              fontFamily: fonts.exotB,
              color: Colors.alpha,
            }}>
            Varify{' '}
            <Text
              style={{
                color: Colors.bravo,
              }}>
              Yorself!
            </Text>
          </Text>
        </View>
        <View style={styles.boxContent}>
          <Text style={styles.headText}>
            A varification link has been sent to your email account
          </Text>
          {/* <Icon name="checkmark-circle" style={styles.icon} /> */}
          <Spinner color={Colors.charlie} />
          <Text
            style={{
              color: Colors.alphaDark,
              textAlign: 'center',
              fontFamily: fonts.acuminBI,
              fontSize: responsiveFontSize(1.6),
              textDecorationLine: 'underline',
              padding: 5,
            }}>
            Awating varification ...
          </Text>
          <Text style={styles.bodyText}>
            Please click on the link that has just been sent to your email
            account to varify your email and continue the regestration process.
          </Text>
        </View>

        <Button
          full
          style={styles.btn}
          disabled={resend}
          onPress={() => setResend(true)}>
          <Text style={styles.btnText}>
            {resend ? `Resend link in ${timeLeft} Seconds` : 'RESEND'}
          </Text>
        </Button>
        <Text
          style={{
            color: Colors.alphaDark,
            textAlign: 'center',
            fontFamily: fonts.acuminI,
            fontSize: responsiveFontSize(1.5),
            textDecorationLine: 'underline',
            padding: 5,
          }}>
          Didn't recive varification email, Resend.
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  emailVarification: () => emailVarification(),
  reloadUser: () => reloadUser(),
};

const mapStateToProps = (state) => ({
  emailState: state.auth.verifyEmail,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailVarificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charlie,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flex: 1,
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  boxContent: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.bravo,
    borderRadius: 4,
  },
  headText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
    textAlign: 'center',
  },
  icon: {
    color: Colors.charlie,
    fontSize: responsiveFontSize(5),
    textAlign: 'center',
    padding: 10,
  },
  bodyText: {
    color: Colors.charlie,
    fontFamily: fonts.acumin,
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
  },
  btn: {
    width: responsiveWidth(90),
    backgroundColor: Colors.bravo,
    alignSelf: 'center',
    margin: 5,
    marginBottom: 0,
    elevation: 0,
    borderRadius: 4,
  },
  btnText: {
    color: Colors.charlie,
    fontFamily: fonts.acuminB,
    fontSize: responsiveFontSize(2.1),
  },
});

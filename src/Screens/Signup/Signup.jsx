import { Alert, Image, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/signupStyles'
import ButtonComp from '../../components/ButtonComp'
import ImagePath from '../../constants/imagePath'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

export default function Signup({ navigation }) {

  // Social Signin method
  GoogleSignin.configure({
    webClientId: '491960882280-9ke6ee763c08chu79g6khqdg5s35injo.apps.googleusercontent.com',
  });

  const handleGoogleSignIn = async () => {
    try {
      await onGoogleButtonPress();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await onFacebookButtonPress();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult = await GoogleSignin.signIn();
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      idToken = signInResult.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }
    const googleCredential = GoogleAuthProvider.credential(idToken);
    return signInWithCredential(getAuth(), googleCredential);
  }

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

    return signInWithCredential(getAuth(), facebookCredential);
  }

  const handleSignup = () => {
    navigation.navigate("SignupDefault");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainContainer1}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Signup to ShopZen</Text>
          <View style={styles.actionBtns}>
            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.socialBtn}>
              <Image
                style={styles.socialIcon}
                resizeMode='contain'
                source={ImagePath.googleIcon}
              />
              <Text style={styles.secondaryTxt}>Login With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFacebookSignIn} style={styles.socialBtn}>
              <Image
                style={styles.socialIcon}
                resizeMode='contain'
                source={ImagePath.facebookIcon}
              />
              <Text style={styles.secondaryTxt}>Login With Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatorLine}>
            <View style={styles.breakLine} />
            <Text style={styles.breakLineText}>Or</Text>
            <View style={styles.breakLine} />
          </View>
          <ButtonComp onPress={handleSignup} btnTitle={"Signup With Email"} />
        </View>
        <View style={styles.navLink}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.navLinkText}>Alreay Have an account? </Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")} style={styles.textWithUnderline}>
              <Text style={styles.sublinkText}>Login</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
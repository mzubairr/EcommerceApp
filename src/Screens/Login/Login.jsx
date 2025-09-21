import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/loginStyles'
import ButtonComp from '../../components/ButtonComp'
import ImagePath from '../../constants/imagePath'
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export default function Login({ navigation }) {

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

  const handleLogin = () => navigation.navigate("LoginDefault");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer1}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Login to ShopZen</Text>
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
          <ButtonComp onPress={handleLogin} btnTitle={"Login With Email"} />
        </View>
        <View style={styles.navLink}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.navLinkText}>Don't Have any account yet? </Text>
            <Pressable onPress={() => navigation.navigate("Signup")} style={styles.textWithUnderline}>
              <Text style={styles.sublinkText}>Signup</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
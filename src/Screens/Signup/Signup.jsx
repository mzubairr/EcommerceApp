import { Image, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/signupStyles'
import ButtonComp from '../../Components/ButtonComp'
import ImagePath from '../../Constants/imagePath'

export default function Signup({ navigation }) {

  const handleLogin = () => {
    navigation.navigate("LoginDefault");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainContainer1}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Signup to ShopZen</Text>
          <View style={styles.actionBtns}>
            <TouchableOpacity style={styles.socialBtn}>
              <Image
                style={styles.socialIcon}
                resizeMode='contain'
                source={ImagePath.googleIcon}
              />
              <Text style={styles.secondaryTxt}>Login With Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Image
                style={styles.socialIcon}
                resizeMode='contain'
                source={ImagePath.appleIcon}
              />
              <Text style={styles.secondaryTxt}>Login With Apple</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separatorLine}>
            <View style={styles.breakLine} />
            <Text style={styles.breakLineText}>Or</Text>
            <View style={styles.breakLine} />
          </View>
          <ButtonComp onPress={handleLogin} btnTitle={"Signup With Email"} />
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
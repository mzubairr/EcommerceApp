import { Image, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/loginStyles'
import ButtonComp from '../../Components/ButtonComp'
import ImagePath from '../../Constants/imagePath'

export default function Login({ navigation }) {

  const handleLogin = () => {
    navigation.navigate("LoginDefault");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainContainer1}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Login to ShopZen</Text>
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
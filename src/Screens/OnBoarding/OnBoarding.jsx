import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'

export default function OnBoarding({ navigation }) {

  // const onboaringState = async () => {
  //   try {
  //     await AsyncStorage.setItem('hasOnboarded', "true");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleGetStarted = () => {
    onboaringState()
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/Images/onboarding-img.jpg")}
          resizeMode='cover'
          style={styles.shoppingImg}
        />
      </View>
      <View style={styles.containerContent}>
        <View style={styles.subContainer}>
          <Text style={styles.heading}>Welcome to ShopZen</Text>
          <Text style={styles.secondaryTxt}>Your one-stop destination for hassle-free online shopping</Text>
        </View>
        <TouchableOpacity onPress={handleGetStarted} style={styles.startBtn}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
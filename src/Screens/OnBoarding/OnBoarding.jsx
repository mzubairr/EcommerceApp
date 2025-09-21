import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import imagePath from '../../constants/imagePath';

export default function OnBoarding({ onComplete }) {

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('hasOnboarded', "true");
      onComplete();

    } catch (e) {
      console.log("Error", e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imagePath.OnboardingImg}
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
import { Pressable, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/otpCodeStyles'
import ButtonComp from '../../components/ButtonComp'
import { OtpInput } from "react-native-otp-entry";
import Colors from '../../constants/colors'
import { moderateScale } from 'react-native-size-matters'

export default function OtpCode({ route }) {

  const { userName } = route.params;
  const [countDown, setCountDown] = useState(60)
  const [otpCount, setOtpCount] = useState('')

  const handleLogin = () => {

  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1
      })
    }, 1000);

    return () => setCountDown(timer);

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Enter 4 Digit Code</Text>
        <Text style={styles.subText}>Enter 4 digit code that your receive on your email ({userName}).</Text>
        <View style={styles.actionBtns}>
          <OtpInput
            numberOfDigits={4}
            type='numeric'
            theme={{
              filledPinCodeContainerStyle: {
                borderColor: Colors.activeBorder,
              },
              pinCodeContainerStyle: {
                borderColor: Colors.inActiveBorder,
                borderRadius: 10,
                width: moderateScale(48),
                height: moderateScale(48),
              },
            }}
            focusColor={Colors.activeBorder}
            onTextChange={setOtpCount}
          />
        </View>
        <View style={styles.resendCode}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.resendCodeText}>Email not received? </Text>
            <Pressable disabled={countDown > 0 ? true : false} style={styles.textWithUnderline}>
              <Text style={styles.sublinkText}>Resend Code</Text>
            </Pressable>
          </View>
        </View>
        <ButtonComp disabled={otpCount.length !== 4} countDown={countDown} onPress={handleLogin} btnTitle={"Continue"} />
      </View>
    </SafeAreaView>
  )
}
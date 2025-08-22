import { Pressable, StatusBar, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/otpCodeStyles'
import ButtonComp from '../../Components/ButtonComp'
import CustomModal from '../../Components/CustomModal'
import ImagePath from '../../Constants/imagePath'
import { OtpInput } from "react-native-otp-entry";
import Colors from '../../Constants/colors'
import { moderateScale } from 'react-native-size-matters'

export default function OtpCode() {

  const [showModal, setShowModal] = useState(false)

  const handleLogin = () => {
    setShowModal(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Enter 4 Digit Code</Text>
        <Text style={styles.subText}>Enter 4 digit code that your receive on your email (pixelshipon@gmail.com).</Text>
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
            onTextChange={(text) => console.log(text)}
          />
        </View>
        <View style={styles.resendCode}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.resendCodeText}>Email not received? </Text>
            <Pressable style={styles.textWithUnderline}>
              <Text style={styles.sublinkText}>Resend Code</Text>
            </Pressable>
          </View>
        </View>
        <ButtonComp onPress={handleLogin} btnTitle={"Continue"} />
        <CustomModal modalText="Login Successful!" btnTitle={"Done"} image={ImagePath.checkMarkIcon} showModal={showModal} setShowModal={setShowModal} />
      </View>
    </SafeAreaView>
  )
}
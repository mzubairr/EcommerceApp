import { StatusBar, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/loginDefaultStyles'
import ButtonComp from '../../Components/ButtonComp'
import InputLabel from '../../Components/InputLabel'
import CustomModal from '../../Components/CustomModal'
import ImagePath from '../../Constants/imagePath'
import KeyboardAvoidingWrapper from '../../Components/KeyboardAvoidingWrapper'

export default function LoginDefault() {

  const [showModal, setShowModal] = useState(false)

  const handleLogin = () => {
    setShowModal(true);
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Login With Email</Text>
          <View style={styles.actionBtns}>
            <InputLabel label={"Email"} placeholder={"Enter your email"} />
            <InputLabel label={"Password"} placeholder={"Enter your password"} firstIcon={"eye-off"} secondIcon={"eye"} />
          </View>
          <Text style={styles.forgotPass}>Forgot Password</Text>
          <ButtonComp onPress={handleLogin} btnTitle={"Login"} />
          <CustomModal modalText="Login Successful!" btnTitle={"Done"} image={ImagePath.checkMarkIcon} showModal={showModal} setShowModal={setShowModal} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  )
}
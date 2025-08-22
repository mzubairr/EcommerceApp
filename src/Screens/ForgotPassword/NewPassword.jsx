import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/NewPasswordStyles'
import ButtonComp from '../../components/ButtonComp'
import InputLabel from '../../components/InputLabel'
import CustomModal from '../../components/CustomModal'
import ImagePath from '../../constants/imagePath'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper'

export default function NewPassword() {

  const [showModal, setShowModal] = useState(false)

  const handleLogin = () => {
    setShowModal(true);
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Create New Passwod</Text>
          <View style={styles.actionBtns}>
            <InputLabel label={"New Password"} placeholder={"Enter your new password"} firstIcon={"eye-off"} secondIcon={"eye"} />
            <InputLabel label={"Confirm Password"} placeholder={"Enter your confirm password"} firstIcon={"eye-off"} secondIcon={"eye"} />
            <InputLabel label={"Confirm Password"} placeholder={"Enter your confirm password"} firstIcon={"eye-off"} secondIcon={"eye"} />
            <InputLabel label={"Confirm Password"} placeholder={"Enter your confirm password"} firstIcon={"eye-off"} secondIcon={"eye"} />
            <InputLabel label={"Confirm Password"} placeholder={"Enter your confirm password"} firstIcon={"eye-off"} secondIcon={"eye"} />
            <InputLabel label={"Confirm Password"} placeholder={"Enter your confirm password"} firstIcon={"eye-off"} secondIcon={"eye"} />
          </View>
          <ButtonComp onPress={handleLogin} btnTitle={"Update Passwrod"} />
          <CustomModal
            modalText="Password updated Successfully!"
            btnTitle={"Continue to Login"}
            image={ImagePath.checkMarkIcon}
            showModal={showModal} setShowModal={setShowModal}
            onPress={() => setShowModal(false)} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  )
}
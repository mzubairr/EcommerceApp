import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/signupDefaultStyles'
import ButtonComp from '../../Components/ButtonComp'
import InputLabel from '../../Components/InputLabel'
import CustomModal from '../../Components/CustomModal'
import ImagePath from '../../Constants/imagePath'
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../Constants/colors'
import KeyboardAvoidingWrapper from '../../Components/KeyboardAvoidingWrapper'

export default function SignupDefault() {

  const [showModal, setShowModal] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const handleLogin = () => {
    setShowModal(true);
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Signup With Email</Text>
          <View style={styles.actionBtns}>
            <InputLabel label={"Email"} placeholder={"Enter your email"} />
            <InputLabel label={"Password"} placeholder={"Enter your password"} firstIcon={"eye-off"} secondIcon={"eye"} />
            <InputLabel label={"Confirm Password"} placeholder={"Enter your confirm password"} firstIcon={"eye-off"} secondIcon={"eye"} />
          </View>
          <View style={styles.agreement}>
            <CheckBox
              style={{ transform: [{ scale: 1.1 }] }}
              tintColors={{ true: Colors.btnBg }}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.navLinkText}>Agree with </Text>
              <Pressable style={styles.textWithUnderline}>
                <Text style={styles.sublinkText}>Terms & Condition</Text>
              </Pressable>
            </View>
          </View>
          <ButtonComp onPress={handleLogin} btnTitle={"Signup"} />
          <CustomModal modalText="Signup Successful!" btnTitle={"Done"} image={ImagePath.checkMarkIcon} showModal={showModal} setShowModal={setShowModal} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  )
}
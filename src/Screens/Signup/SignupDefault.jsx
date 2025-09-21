import { Keyboard, Pressable, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/signupDefaultStyles'
import ButtonComp from '../../components/ButtonComp'
import CustomModal from '../../components/CustomModal'
import ImagePath from '../../constants/imagePath'
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../constants/colors'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper'
import { signupSchema } from '../../formik/authSchema'
import FormikField from '../../components/FormikField'
import { Formik } from 'formik'
import { registerUser } from '../../Services/Firebase/auth'

export default function SignupDefault({ navigation }) {

  const [showModal, setShowModal] = useState(false)
  const [firebaseError, setFirebaseError] = useState('');
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSignup = async (values) => {
    Keyboard.dismiss()
    setFirebaseError(''); // Clear previous errors

    const result = await registerUser(values.email, values.password, setFirebaseError);
    console.log(result);

    if (result) {
      setShowModal(true);
    }

    setTimeout(() => {
      setShowModal(false)
    }, 3000);
  };

  const emailField = {
    label: "Email",
    name: "email",
    placeholder: "Enter your email",
    onSubmitEditing: () => passwordRef.current?.focus(),
    submitBehavior: 'submit'
  }

  const passwordField = {
    label: "Password",
    name: "password",
    placeholder: "Enter your password",
    passwordIcon: true,
    inpuRef: passwordRef,
    onSubmitEditing: () => confirmPasswordRef.current?.focus(),
    submitBehavior: 'submit'
  };

  const confirmPasswordField = {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Enter your confirm password",
    passwordIcon: true,
    inpuRef: confirmPasswordRef,
    submitBehavior: 'blurAndSubmit',
    onSubmitEditing: () => Keyboard.dismiss(),
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Signup With Email</Text>
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '', agreement: false }}
            onSubmit={(values) => handleSignup(values)}
            validationSchema={signupSchema}
          >
            {({ handleSubmit, setFieldValue, submitCount, values, errors }) => {
              return (
                <View>
                  <View style={styles.actionBtns}>
                    <FormikField {...emailField} />
                    <FormikField {...passwordField} />
                    <FormikField {...confirmPasswordField} />
                  </View>
                  <View>
                    <View style={styles.agreement}>
                      <CheckBox
                        style={{ transform: [{ scale: 1.1 }] }}
                        tintColors={{ true: Colors.btnBg }}
                        value={values.agreement}
                        onValueChange={(val) => setFieldValue('agreement', val)}
                      />
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.navLinkText}>Agree with </Text>
                        <Pressable style={styles.textWithUnderline}>
                          <Text style={styles.sublinkText}>Terms & Condition</Text>
                        </Pressable>
                      </View>
                    </View>
                    <View style={styles.error}>
                      {(submitCount > 0) && errors.agreement && (
                        <Text style={{ color: Colors.error }}>{errors.agreement}</Text>
                      )}
                      {(firebaseError !== "") && (
                        <Text style={{ color: Colors.error }}>{firebaseError}</Text>
                      )}
                    </View>
                  </View>
                  <ButtonComp onPress={handleSubmit} btnTitle={"Signup"} />
                </View>
              )
            }}
          </Formik>
          <CustomModal
            showModal={showModal}
            modalText="Signup Successful!"
            btnTitle={"Done"}
            image={ImagePath.checkMarkIcon}
            isButtonVisible={false} />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  )
}
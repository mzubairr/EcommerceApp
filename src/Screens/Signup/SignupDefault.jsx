import { Keyboard, Pressable, StatusBar, Text, View } from 'react-native'
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

    if (result.user) {
      setShowModal(true);
    }
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
    firstIcon: "eye-off",
    secondIcon: "eye",
    inpuRef: passwordRef,
    onSubmitEditing: () => confirmPasswordRef.current?.focus(),
    submitBehavior: 'submit'
  };

  const confirmPasswordField = {
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Enter your confirm password",
    firstIcon: "eye-off",
    secondIcon: "eye",
    inpuRef: confirmPasswordRef,
    submitBehavior: 'blurAndSubmit'
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} />
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
            modalText="Signup Successful!"
            btnTitle={"Done"}
            image={ImagePath.checkMarkIcon}
            onPress={() => navigation.navigate("Home")}
            showModal={showModal}
            setShowModal={setShowModal} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper >
  )
}
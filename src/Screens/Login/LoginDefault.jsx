import { Keyboard, Pressable, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/loginDefaultStyles'
import ButtonComp from '../../components/ButtonComp'
import CustomModal from '../../components/CustomModal'
import ImagePath from '../../constants/imagePath'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper'
import { Formik } from 'formik'
import FormikField from '../../components/FormikField'
import { loginUser } from '../../Services/Firebase/auth'
import { signinSchema } from '../../formik/authSchema'
import Colors from '../../constants/colors'

export default function LoginDefault({ navigation }) {

  const [showModal, setShowModal] = useState(false)
  const [firebaseError, setFirebaseError] = useState('');
  const passwordRef = useRef();

  const handleLogin = async (values) => {
    setFirebaseError(''); // Clear previous errors
    Keyboard.dismiss()
    const result = await loginUser(values.email, values.password, setFirebaseError);

    if (!result) return;

    const { user } = result;

    if (user) {
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);   // modal auto close
      }, 3000);
    }
  }

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
    submitBehavior: 'blurAndSubmit',
    onSubmitEditing: () => Keyboard.dismiss(),
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingWrapper style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Login With Email</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => handleLogin(values)}
            validationSchema={signinSchema}>
            {({ handleSubmit, errors }) => {
              return (
                <View>
                  <View style={styles.actionBtns}>
                    <FormikField {...emailField} />
                    <FormikField {...passwordField} />
                  </View>
                  <View style={styles.error}>
                    {(firebaseError && !errors.email && !errors.password) && (
                      <Text style={{ color: Colors.error }}>{firebaseError}</Text>
                    )}
                  </View>
                  <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.forgotPass}>Forgot Password</Text>
                  </Pressable>
                  <ButtonComp onPress={handleSubmit} btnTitle={"Login"} />
                </View>
              )
            }}
          </Formik>
          <CustomModal
            modalText="Login Successful!"
            image={ImagePath.checkMarkIcon}
            showModal={showModal}
            isButtonVisible={false} />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  )
}
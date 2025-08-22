import { Keyboard, StatusBar, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Styles/forgotPasswordStyles'
import ButtonComp from '../../components/ButtonComp'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper'
import { Formik } from 'formik'
import { forgotPasswordSchema } from '../../formik/authSchema'
import FormikField from '../../components/FormikField'
import { resetPasswrod } from '../../Services/Firebase/auth'
import Colors from '../../constants/colors'

export default function ForgotPassword({ navigation }) {

    const [firebaseError, setFirebaseError] = useState('');

    const handleReset = async (values) => {
        Keyboard.dismiss()
        setFirebaseError('');
        const resetEmail = await resetPasswrod(values.email, setFirebaseError);
        if (resetEmail) {
            navigation.navigate("OtpCode", { userName: values.email });
        }
    }

    const emailField = {
        label: "Email",
        name: "email",
        placeholder: "Enter your email",
        submitBehavior: 'blurAndSubmit'
    }

    return (
        <KeyboardAvoidingWrapper style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"dark-content"} />
                <View style={styles.mainContainer}>
                    <Text style={styles.heading}>Forgot Password</Text>
                    <Text style={styles.subText}>Enter your email id for the verification process, we will send 4 digit to your email</Text>
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={forgotPasswordSchema}
                        onSubmit={(values) => handleReset(values)}
                    >
                        {({ handleSubmit }) => (
                            <View style={{ flex: 1 }}>
                                <View style={styles.actionBtns}>
                                    <FormikField {...emailField} />
                                </View>
                                <View style={styles.error}>
                                    {(firebaseError !== "") && (
                                        <Text style={{ color: Colors.error }}>{firebaseError}</Text>
                                    )}
                                </View>
                                <ButtonComp onPress={handleSubmit} btnTitle={"Send Code"} />
                            </View>
                        )}
                    </Formik>
                </View>
            </SafeAreaView >
        </KeyboardAvoidingWrapper >
    )
}
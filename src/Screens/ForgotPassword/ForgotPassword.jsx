import { Alert, Keyboard, Text, View } from 'react-native'
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
            // navigation.navigate("OtpCode", { userName: values.email });
            Alert.alert(
                "Email Sent ✓",
                "Password reset instructions have been sent to your email. Please check both your inbox and spam folder.",
                [{
                    text: "OK",
                    onPress: () => navigation.navigate("Login")
                }]
            );
        }
    }

    const emailField = {
        label: "Email",
        name: "email",
        placeholder: "Enter your email",
        submitBehavior: 'blurAndSubmit'
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingWrapper style={{ flex: 1 }}>
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
            </KeyboardAvoidingWrapper>
        </SafeAreaView>
    )
}
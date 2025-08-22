import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    LoginDefault,
    Login,
    SignupDefault,
    Signup,
    ForgotPassword,
    NewPassword,
    OtpCode
} from '../Screens'

export default function AuthStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginDefault" component={LoginDefault} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="SignupDefault" component={SignupDefault} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="OtpCode" component={OtpCode} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
        </Stack.Navigator>)
}
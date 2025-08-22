import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from '../Screens';

const Stack = createNativeStackNavigator();

export default function OnBoardingStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Onboarding"} component={Onboarding} />
        </Stack.Navigator>

    )
}
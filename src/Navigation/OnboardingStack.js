import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from '../Screens';

const Stack = createNativeStackNavigator();

export default function OnBoardingStack({ setHasOnboarded }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding">
                {props => <Onboarding {...props} onComplete={() => setHasOnboarded(true)} />}
            </Stack.Screen>
        </Stack.Navigator>

    )
}
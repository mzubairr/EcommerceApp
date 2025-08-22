import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"TabRoutes"} component={TabRoutes} />
        </Stack.Navigator>

    )
}
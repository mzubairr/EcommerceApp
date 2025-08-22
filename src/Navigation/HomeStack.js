import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import { BrowseProduct, Category, ProductDetails } from '../Screens';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"TabRoutes"} component={BottomTab} />
            <Stack.Screen name={"Category"} component={Category} />
            <Stack.Screen name={"BrowseProduct"} component={BrowseProduct} />
            <Stack.Screen name={"ProductDetails"} component={ProductDetails} />
        </Stack.Navigator>

    )
}
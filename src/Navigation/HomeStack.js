import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import { BrowseProduct, Category, Checkout, ProductDetails, ProductOrder, YourProfile } from '../Screens';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"TabRoutes"} component={BottomTab} />
            <Stack.Screen name={"Category"} component={Category} />
            <Stack.Screen name={"BrowseProduct"} component={BrowseProduct} />
            <Stack.Screen name={"ProductDetails"} component={ProductDetails} />
            <Stack.Screen name={"Checkout"} component={Checkout} />
            <Stack.Screen name={"ProductOrder"} component={ProductOrder} />
            <Stack.Screen name={"YourProfile"} component={YourProfile} />
        </Stack.Navigator>

    )
}
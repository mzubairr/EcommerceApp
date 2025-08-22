import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    Home,
    SavedItems,
    Cart,
    Profile
} from '../Screens'
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import Feather from '@react-native-vector-icons/feather';
import Colors from '../constants/colors';

export default function BottomTab() {

    const BottomTab = createBottomTabNavigator();

    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: moderateVerticalScale(70),
            },
            tabBarActiveTintColor: Colors.btnBg,
            tabBarLabelStyle: {
                fontFamily: "Satoshi-Medium",
                fontSize: scale(12),
            },
        }}>
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} /> }}
                name="Home" component={Home}>
            </BottomTab.Screen>
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <Feather name="heart" size={size} color={color} /> }}
                name="Saved" component={SavedItems} />
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <Feather name="shopping-cart" size={size} color={color} /> }}
                name="Cart" component={Cart} />
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} /> }}
                name="Profile" component={Profile} />
        </BottomTab.Navigator>
    )
}
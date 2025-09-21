import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    Home,
    SavedItems,
    Cart,
    Profile
} from '../Screens'
import { scale } from 'react-native-size-matters';
import Colors from '../constants/colors';
import { Heart, House, ShoppingCart, UserRound } from 'lucide-react-native';

export default function BottomTab() {

    const BottomTab = createBottomTabNavigator();

    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.btnBg,
            tabBarLabelStyle: {
                fontFamily: "Satoshi-Medium",
                fontSize: scale(12),
            },
        }}>
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <House size={size} color={color} /> }}
                name="Home" component={Home}>
            </BottomTab.Screen>
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <Heart size={size} color={color} /> }}
                name="Saved" component={SavedItems} />
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <ShoppingCart size={size} color={color} /> }}
                name="Cart" component={Cart} />
            <BottomTab.Screen
                options={{ tabBarIcon: ({ size, color }) => <UserRound size={size} color={color} /> }}
                name="Profile" component={Profile} />
        </BottomTab.Navigator>
    )
}
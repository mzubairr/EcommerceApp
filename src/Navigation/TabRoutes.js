import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    Home,
    Favorite,
    Cart,
    Profile
} from '../Screens'

export default function AuthStack() {

    const BottomTab = createBottomTabNavigator();

    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: true,
            tabBarStyle: {
                height: 100
            }
        }}>
            <BottomTab.Screen name="Home" component={Home} />
            <BottomTab.Screen name="Favorite" component={Favorite} />
            <BottomTab.Screen name="Cart" component={Cart} />
            <BottomTab.Screen name="Profile" component={Profile} />
        </BottomTab.Navigator>
    )
}
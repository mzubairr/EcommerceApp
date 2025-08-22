import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnBoardingStack from './OnboardingStack';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = () => {
    const [hasOnboarded, setHasOnboarded] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Handle onboarding and user
    useEffect(() => {

        const subscriber = onAuthStateChanged(getAuth(), (user) => {
            setUser(user);
        });

        const checkOnboarding = async () => {
            try {
                const value = await AsyncStorage.getItem('hasOnboarded');
                setHasOnboarded(value === "true");
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        checkOnboarding();

        return subscriber;

    }, []);

    if (loading || hasOnboarded === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.bg} />
            </View>
        );
    }

    let ScreenToRender;

    if (!hasOnboarded) {
        ScreenToRender = <OnBoardingStack setHasOnboarded={setHasOnboarded} />;
    } else if (!user) {
        ScreenToRender = <AuthStack />;
    } else {
        ScreenToRender = <HomeStack user={user} />;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {ScreenToRender}
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Routes;
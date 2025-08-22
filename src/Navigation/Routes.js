import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnBoardingStack from './OnboardingStack';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = () => {

    // const [hasOnboarded, sethasOnboarded] = useState(false);
    // console.log(hasOnboarded);
    
    // useEffect(() => {
    //     const onboaringState = async () => {
    //         try {
    //             const isOnboarded = await AsyncStorage.getItem('hasOnboarded');
    //             sethasOnboarded(isOnboarded);

    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     onboaringState();
    // }, [])

    // if (hasOnboarded) {
    //     // firebase user exist
    //     // if (firebasUser) {
    //     //     // home
    //     // } else {
    //     //     // login
    //     // }
    // } else {
    //     <OnBoardingStack />
    // }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {true ? <AuthStack /> : <HomeStack />}
                {/* <OnBoardingStack /> */}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Routes
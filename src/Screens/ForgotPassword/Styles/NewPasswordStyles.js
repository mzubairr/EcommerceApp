import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../../../constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    mainContainer: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(24),
    },
    heading: {
        fontSize: scale(25),
        fontFamily: "Satoshi-Bold"
    },
    actionBtns: {
        gap: moderateScale(16),
        marginVertical: moderateVerticalScale(48),
    },
})

export default styles
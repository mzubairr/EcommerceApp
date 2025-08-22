import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../../../Constants/colors';
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
    subText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Light",
        marginTop: moderateVerticalScale(8)
    },
    actionBtns: {
        gap: moderateScale(16),
        marginTop: moderateVerticalScale(48),
        marginBottom: moderateVerticalScale(48),
    },
    secondaryTxt: {
        fontSize: scale(16),
    },
})

export default styles
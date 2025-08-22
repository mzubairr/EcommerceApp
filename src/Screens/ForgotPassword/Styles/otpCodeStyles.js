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
    subText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Light",
        marginTop: moderateVerticalScale(8)
    },
    actionBtns: {
        gap: moderateScale(16),
        marginVertical: moderateVerticalScale(48),
    },
    secondaryTxt: {
        fontSize: scale(16),
    },
    forgotPass: {
        marginTop: moderateVerticalScale(8),
        marginBottom: moderateVerticalScale(60),
        fontSize: scale(16),
        textAlign: "right"
    },
    resendCode: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: moderateVerticalScale(48),
    },
    resendCodeText: {
        fontSize: scale(16),
    },
    textWithUnderline: {
        borderBottomWidth: 1.5,
    },
    sublinkText: {
        fontSize: scale(14),
        fontWeight: "bold"
    }
})

export default styles
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
    actionBtns: {
        gap: moderateScale(16),
        marginTop: moderateVerticalScale(48),
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
    agreement: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: moderateVerticalScale(16),
        marginBottom: moderateVerticalScale(48),
        gap: moderateScale(8)
    },
    navLinkText: {
        fontSize: scale(16),
        color: Colors.txtLightGray
    },
    textWithUnderline: {
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.btnBg,
    },
    sublinkText: {
        fontSize: scale(14),
        color: Colors.btnBg,
        fontWeight: "500"
    }
})

export default styles
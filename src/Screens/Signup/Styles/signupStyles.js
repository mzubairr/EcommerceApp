import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../../../constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    mainContainer1: {
        flex: 1,
    },

    mainContainer: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(24),
        flex: 1
    },
    navLink: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: moderateScale(20),
        paddingBottom: moderateVerticalScale(64),
    },
    navLinkText: {
        fontSize: scale(16),
    },
    heading: {
        fontSize: scale(32),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
    },
    actionBtns: {
        gap: moderateScale(16),
        marginVertical: moderateVerticalScale(48),
    },
    socialBtn: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(14),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: moderateScale(10)
    },
    socialIcon: {
        height: moderateScale(22),
        width: moderateScale(22)
    },
    secondaryTxt: {
        fontSize: scale(14),
        color: Colors.txtPrimary,
    },
    separatorLine: {
        marginBottom: moderateVerticalScale(48),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: moderateScale(5),
        overflow: "hidden"
    },
    breakLine: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.border,
    },
    breakLineText: {
        color: Colors.txtPrimary,
        fontSize: scale(14)
    },
    textWithUnderline: {
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.btnBg,
    },
    sublinkText: {
        fontSize: scale(14),
        color: Colors.btnBg,
        fontWeight: "bold"
    }
})

export default styles
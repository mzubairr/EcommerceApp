import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import Colors from "../../constants/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: moderateScale(20),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: moderateVerticalScale(16),
        justifyContent: 'flex-start',
    },
    headerTitle: {
        fontSize: scale(24),
        fontFamily: "Satoshi-Bold",
        color: Colors.text,
        textTransform: "capitalize",
        textAlign: 'center',
        flex: 1
    },
    profileContainer: {
        marginVertical: moderateVerticalScale(48),
        gap: moderateVerticalScale(24),
    },
    profileSection: {
    },
    profileSectionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
    },
    sectionTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary,
    },
    separatorTop: {
        height: moderateVerticalScale(6),
        width: moderateScale(64),
        backgroundColor: Colors.lightGray,
        marginVertical: moderateVerticalScale(24),
        borderRadius: moderateScale(4),
        marginHorizontal: "auto"
    },
    separator: {
        height: moderateVerticalScale(1.5),
        backgroundColor: Colors.lightGray,
        marginTop: moderateVerticalScale(16),
    },
    profileBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(12),
    },
    logoutText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.error,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: Colors.bg,
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        paddingBottom: moderateVerticalScale(27),
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: scale(18),
        fontFamily: "Satoshi-Bold",
        color: Colors.text,
        marginBottom: moderateVerticalScale(8),
    },
    modalMessage: {
        textAlign: 'center',
        fontSize: scale(18),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtSecondary,
        marginBottom: moderateVerticalScale(16),
    },
    modalButtons: {
        marginTop: moderateVerticalScale(48),
        flexDirection: 'row',
        justifyContent: 'center',
        gap: moderateScale(20),
    },
})

export default styles
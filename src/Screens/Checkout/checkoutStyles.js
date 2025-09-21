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
    arrowIcon: {
        width: moderateScale(24),
        height: moderateScale(24)
    },
    headerTitle: {
        fontSize: scale(24),
        fontFamily: "Satoshi-Bold",
        color: Colors.text,
        textTransform: "capitalize",
        textAlign: 'center',
        flex: 1
    },
    separator: {
        height: 1.5,
        backgroundColor: Colors.lightGray,
        marginVertical: moderateVerticalScale(16),
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
    },
    addressTitle: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary,
    },
    addressDetails: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: moderateScale(8),
        marginTop: moderateVerticalScale(16),
    },
    addressLabel: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
    },
    addressText: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
    },
    paymentContainer: {
        gap: moderateScale(16),
        marginBottom: moderateVerticalScale(24),
    },
    paymentTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
    },
    paymentDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    paymentOption: {
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateScale(8),
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    paymentLabel: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Bold",
    },
    paymentMethod: {
        gap: moderateScale(16),
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: moderateScale(7),
        paddingVertical: moderateVerticalScale(14),
        paddingHorizontal: moderateScale(20),
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    cardImage: {
        width: moderateScale(41),
        height: moderateScale(14),
    },
    cardNumber: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
    },
    orderTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
    },

    footerContainer: {
        marginTop: moderateVerticalScale(16),
        marginBottom: moderateVerticalScale(44),
        gap: moderateScale(12)
    },
    footerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: scale(16),
        color: Colors.txtSecondary,
        fontFamily: "Satoshi-Regular",
    },
    priceText: {
        fontSize: scale(16),
        color: Colors.txtPrimary,
        fontFamily: "Satoshi-Medium",
    },
})

export default styles
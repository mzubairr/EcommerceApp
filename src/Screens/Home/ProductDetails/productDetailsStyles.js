import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import Colors from "../../../constants/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.bg,
        paddingBottom: moderateVerticalScale(26),
    },
    headerContainer: {
        paddingHorizontal: moderateScale(20),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(16),
        justifyContent: 'flex-start',
    },
    arrowIcon: {
        width: moderateScale(24),
        height: moderateScale(24)
    },
    categoryTitle: {
        fontSize: scale(24),
        fontFamily: "Satoshi-Bold",
        color: Colors.text,
        textTransform: "capitalize",
        textAlign: 'center',
        flex: 1
    },
    productImage: {
        position: "relative",
        backgroundColor: Colors.skyBlue,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateScale(16),
    },
    singleProductImg: {
        height: moderateScale(242),
        width: "100%",
    },
    favoriteIcon: {
        borderRadius: moderateScale(6),
        backgroundColor: Colors.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: moderateScale(6),
        position: "absolute",
        top: moderateVerticalScale(12),
        right: moderateScale(32)
    },
    productContentSec: {
        paddingHorizontal: moderateScale(20),
    },
    productImagesContainer: {
        gap: moderateScale(16)
    },
    productImages: {
        height: moderateScale(48),
        width: moderateScale(48),
        borderWidth: moderateScale(2),
        borderColor: Colors.inActiveBorder,
        borderRadius: moderateScale(8),
    },
    productContent: {
        gap: moderateScale(16),
        paddingTop: moderateVerticalScale(24),
    },
    productPriceReview: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    productTitle: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary
    },
    productSubTitle: {
        fontSize: scale(20),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary
    },
    review: {
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(8)
    },
    reviewIcon: {
        height: moderateScale(24),
        width: moderateScale(24),
    },
    reviewTxt: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtSecondary,
    },
    reviewTxtMin: {
        fontSize: scale(12),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtSecondary,
    },
    productDetailTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary
    },
    productDetails: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtSecondary
    },
    readMoreText: {
        color: Colors.btnBg,
        fontFamily: "Satoshi-Medium",
    },
    separator: {
        height: 1,
        backgroundColor: Colors.lightGray,
    },
    ratingTitle: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(8),
    },
    ratingText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary
    },
    ratingsubText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtSecondary
    },
    reviewContainer: {
        gap: moderateScale(16),
        marginBottom: moderateVerticalScale(24)
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(14)
    },
    reviewerFirstName: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary
    },
    reviewComment: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary
    },
    reviewerName: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary
    },
    modalContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: moderateScale(20),
    },
    modalContent: {
        width: "100%",
        backgroundColor: Colors.blackGray,
        borderRadius: moderateScale(8),
        padding: moderateScale(20),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkmarkIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    cancelCircle: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    modalTitle: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
        marginBottom: moderateScale(12),
    },
    modalTitle: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Medium",
        color: Colors.bg,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bg
    }
})

export default styles
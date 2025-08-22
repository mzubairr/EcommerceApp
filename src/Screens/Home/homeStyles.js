import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import Colors from "../../constants/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(16),
        backgroundColor: Colors.bg
    },
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    locationHeading: {
        color: Colors.txtSecondary
    },
    locationText: {
        fontSize: scale(14),
        color: Colors.txtPrimary,
        fontFamily: "Satoshi-Medium",
    },
    bellIcon: {
        height: moderateScale(24),
        width: moderateScale(24),
    },
    searchBarContainer: {
        paddingVertical: moderateVerticalScale(12),
        paddingHorizontal: moderateScale(16),
        marginVertical: moderateVerticalScale(16),
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(16),
        borderRadius: moderateScale(8),
        backgroundColor: Colors.bg,
        elevation: 3,
    },
    searchBar: {
        flex: 1,
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.placeholder
    },
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    categoryHeading: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Black",
        color: Colors.txtPrimary
    },
    viewText: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.smallTxt
    },
    categoryList: {
        gap: moderateScale(16),
        paddingTop: moderateVerticalScale(16),
        paddingBottom: moderateVerticalScale(24)
    },
    categoryItem: {
        gap: moderateScale(4),
        alignItems: "center"
    },
    categoryImgContainer: {
        backgroundColor: Colors.skyBlue,
        padding: moderateScale(12),
        borderRadius: moderateScale(10)
    },
    categoryImage: {
        height: moderateScale(24),
        width: moderateScale(24)
    },
    categoryText: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.smallTxt
    },
    columnSeparate: {
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: moderateVerticalScale(24)
    },
    hotDeal: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold"
    },
    dealItem: {
        minHeight: moderateScale(294),
        flex: 1,
        borderRadius: moderateScale(10),
        backgroundColor: Colors.bg,
        elevation: 1.5,
    },
    productImage: {
        position: "relative"
    },
    hotDealImg: {
        height: moderateScale(160),
        width: "100%",
        borderRadius: moderateScale(10),
    },
    favoriteIcon: {
        borderRadius: moderateScale(6),
        backgroundColor: Colors.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: moderateScale(6),
        position: "absolute",
        top: 8,
        right: 8
    },
    hotDealContent: {
        gap: moderateScale(8),
        paddingLeft: moderateScale(8),
        paddingTop: moderateVerticalScale(16),
        paddingBottom: moderateVerticalScale(12)
    },
    hotDealTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary
    },
    hotDealSubTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary
    },
    hotDealminiTitle: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtSecondary,
        textDecorationLine: "line-through"
    },
    review: {
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(8)
    },
    reviewIcon: {
        height: moderateScale(21),
        width: moderateScale(21),
    },
    reviewTxt: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
    },
    hotDealSec: {
        marginBottom: moderateVerticalScale(16)
    }
})

export default styles
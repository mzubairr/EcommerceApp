import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import Colors from "../../../constants/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: moderateScale(20),
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateVerticalScale(16),
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
    categoryItemCount: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
        textAlign: 'center',
        marginBottom: moderateVerticalScale(48),
    },
    columnSeparate: {
        justifyContent: 'space-between',
        gap: moderateScale(16),
        marginBottom: moderateVerticalScale(24)
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bg
    }
})

export default styles
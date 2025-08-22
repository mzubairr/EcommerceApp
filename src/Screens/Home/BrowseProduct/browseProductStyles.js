import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import Colors from "../../../constants/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(16),
        backgroundColor: Colors.bg
    },
    backButton: {
        paddingHorizontal: moderateScale(10),
    },
    bellIcon: {
        height: moderateScale(24),
        width: moderateScale(24),
    },
    arrowIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    searchBarContainer: {
        paddingVertical: moderateVerticalScale(6),
        paddingHorizontal: moderateScale(16),
        marginTop: moderateVerticalScale(16),
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(16),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        backgroundColor: Colors.bg,
        elevation: 3,
    },
    searchBar: {
        flex: 1,
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.placeholder
    },
    placeholder: {
        color: Colors.placeholder,
    },
    popularSearchesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: moderateVerticalScale(24),
    },
    popularSearchesHeading: {
        fontSize: scale(18),
        fontFamily: "Satoshi-Black",
        color: Colors.txtPrimary
    },
    clearAllText: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Medium",
        color: Colors.smallTxt
    },
    popularSearch: {
        gap: moderateScale(16),
    },
    queries: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    queryText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtPrimary,
    },
    cancelIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchImg: {
        width: moderateScale(286),
        height: moderateScale(258),
    },
    noResultsText: {
        fontSize: scale(24),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
        marginTop: moderateVerticalScale(64),
        textTransform: "capitalize",
        textAlign: "center"
    }
})

export default styles
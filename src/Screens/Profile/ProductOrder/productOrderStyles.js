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
        paddingTop: moderateScale(16),
        paddingBottom: moderateScale(24),
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
    tabBarStyle: {
        backgroundColor: Colors.skyBlue,
        borderRadius: moderateScale(15),
    },
    tabLabelContainer: {
        paddingVertical: moderateVerticalScale(3),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(7),
        fontFamily: "Satoshi-Medium",
    },
    tabLabelText: {
        fontSize: scale(13),
        textTransform: "capitalize",
        fontFamily: "Satoshi-Bold",
    },
    orderListContainer: {
        flex: 1,
        backgroundColor: Colors.bg
    },
    columnSeparate: {
        justifyContent: 'space-between',
        gap: moderateScale(24),
        marginBottom: moderateVerticalScale(24),
        paddingVertical: moderateScale(24)
    },
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(16)
    },
    emptyCartTitle: {
        fontSize: scale(20),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary,
        textAlign: 'center',
    },
    emptyCartDesc: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
        textAlign: 'center',
        width: '70%'
    },
    emptyText: {
        flex: 1,
        marginTop: moderateVerticalScale(50),
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
        textAlign: 'center',
    }
})

export default styles
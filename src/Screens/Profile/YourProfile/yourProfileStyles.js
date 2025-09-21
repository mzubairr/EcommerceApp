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
        color: Colors.txtPrimary,
        textTransform: "capitalize",
        textAlign: 'center',
        flex: 1
    },
    inputContainer: {
        gap: moderateVerticalScale(16),
        marginBottom: moderateVerticalScale(48)
    },
    TextInput: {
        gap: moderateVerticalScale(4),
    },
    label: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
    },
    inputField: {
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(15),
    },
    inputTxt: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary,
    },
    dropdown: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingVertical: moderateScale(15),
        borderColor: Colors.border,
        paddingHorizontal: moderateScale(20),
    },
    dropdownText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary,
    },
    optionsContainer: {
        marginTop: moderateVerticalScale(8),
    },
    option: {
        borderRadius: moderateScale(8),
        paddingVertical: moderateScale(15),
        borderWidth: 1,
        borderColor: Colors.border,
    },
    optionText: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
        paddingHorizontal: moderateScale(20),
    }
})

export default styles
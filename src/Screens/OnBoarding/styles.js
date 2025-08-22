import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
        justifyContent: "center",
    },
    imageContainer: {
        flex: 0.6,
        alignItems: "center",
        justifyContent: "center",
    },
    shoppingImg: {
        height: moderateScale(360),
        width: moderateScale(360)
    },
    containerContent: {
        flex: 0.3,
        paddingHorizontal: moderateScale(20),
        gap: moderateScale(55),
    },
    subContainer: {
        gap: moderateScale(8)
    },
    heading: {
        fontSize: scale(33),
        textAlign: "center",
        color: Colors.txtPrimary,
    },
    secondaryTxt: {
        fontSize: scale(14),
        color: Colors.txtSecondary,
        textAlign: "center",
    },
    startBtn: {
        backgroundColor: Colors.btnBg,
        paddingVertical: moderateVerticalScale(14),
        alignItems: "center",
        borderRadius: moderateScale(10)
    },
    btnText: {
        color: Colors.btnText,
        fontSize: scale(15)
    }
})

export default styles
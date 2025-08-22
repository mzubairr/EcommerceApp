import { Text, TouchableOpacity } from 'react-native'
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../constants/colors';
import { StyleSheet } from 'react-native';

export default function ButtonComp({ btnTitle, disabled, countDown, style = {}, ...props }) {
    return (
        <TouchableOpacity
            {...props}
            style={[
                styles.startBtn,
                { ...style },
                { backgroundColor: disabled ? Colors.disbaledBtn : Colors.btnBg }
            ]}>
            <Text style={styles.btnText}>{btnTitle} {countDown > 0 && countDown}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    startBtn: {
        paddingVertical: moderateVerticalScale(14),
        alignItems: "center",
        borderRadius: moderateScale(10)
    },
    btnText: {
        color: Colors.btnText,
        fontSize: scale(15),
        fontFamily: "Satoshi-Bold",
    }
})
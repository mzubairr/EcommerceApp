import { Text, TouchableOpacity } from 'react-native'
import { scale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Colors from '../Constants/colors';
import { StyleSheet } from 'react-native';

export default function ButtonComp({ onPress, btnTitle, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.startBtn, style]}>
            <Text style={styles.btnText}>{btnTitle}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
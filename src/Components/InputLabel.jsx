import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../Constants/colors'
import Feather from "@react-native-vector-icons/feather";

export default function InputLabel({ label, placeholder, firstIcon, secondIcon }) {

    const [secureTextEntry, setsecureTextEntry] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)

    return (
        <View>
            <Text style={styles.inplabel}>{label}</Text>
            <View style={styles.inputFieldContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.txtSecondary}
                    secureTextEntry={secureTextEntry}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={setInputFocus}
                />
                {
                    inputFocus && firstIcon && secondIcon && (
                        <View style={styles.iconContainer}>
                            {<Feather onPress={() => setsecureTextEntry(!secureTextEntry)} name={secureTextEntry ? firstIcon : secondIcon} size={22} color={"#000000"} />}
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inplabel: {
        fontSize: scale(16),
        fontFamily: 'Satoshi-Medium',
        marginBottom: moderateVerticalScale(4)
    },
    inputFieldContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: Colors.border,
        height: moderateScale(50),
        borderRadius: moderateScale(10),
    },
    inputField: {
        fontSize: scale(16),
        color: Colors.txtLightGray,
        paddingHorizontal: moderateScale(16),
        flex: 1
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
})
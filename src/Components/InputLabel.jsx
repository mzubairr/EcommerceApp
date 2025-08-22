import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../constants/colors'
import Feather from "@react-native-vector-icons/feather";

export default function InputLabel({ label, firstIcon, secondIcon, inpuRef, meta, ...props }) {

    const [secureTextEntry, setsecureTextEntry] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)

    const inputProps = {
        ...props,
        ref: inpuRef,
        placeholderTextColor: Colors.palceholder,
        secureTextEntry,
        onChangeText: (text) => {
            setInputFocus(text.length > 0);
            props.onChangeText?.(text);
        },
        autoCorrect: false,
        autoCapitalize: 'none',
    };

    const getBorderColor = () => {
        if (meta.touched && meta.error) return { borderColor: Colors.error };
        if (meta.touched && !meta.error) return { borderColor: Colors.success };
        return { borderColor: Colors.border };
    };


    return (
        <View>
            <Text style={styles.inplabel}>{label}</Text>
            <View style={[styles.inputFieldContainer, getBorderColor()]}>
                <TextInput
                    {...inputProps}
                    style={styles.inputField} />
                {
                    inputFocus && firstIcon && secondIcon && (
                        <View style={styles.iconContainer}>
                            {<Feather
                                onPress={() => setsecureTextEntry(!secureTextEntry)}
                                name={secureTextEntry ? firstIcon : secondIcon}
                                size={22} color={"#000000"} />}
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
        color: Colors.txtPrimary,
        marginBottom: moderateVerticalScale(4)
    },
    inputFieldContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        height: moderateScale(50),
        borderRadius: moderateScale(10),
    },
    inputField: {
        fontSize: scale(16),
        color: Colors.txtPrimary,
        paddingHorizontal: moderateScale(16),
        flex: 1
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
})
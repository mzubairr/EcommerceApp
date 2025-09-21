import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../constants/colors'
import { Eye, EyeOff } from 'lucide-react-native';

export default function InputLabel({ label, passwordIcon, inpuRef, meta, ...props }) {

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
                    onSubmitEditing={props.onSubmitEditing}
                    {...inputProps}
                    style={styles.inputField} />
                {
                    inputFocus && passwordIcon && (
                        <View style={styles.iconContainer}>
                            {secureTextEntry ? (
                                <EyeOff
                                    onPress={() => setsecureTextEntry(!secureTextEntry)}
                                    size={moderateScale(22)} color={"#000000"} />
                            ) : (
                                <Eye
                                    onPress={() => setsecureTextEntry(!secureTextEntry)}
                                    size={moderateScale(22)} color={"#000000"} />
                            )}
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
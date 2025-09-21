import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../constants/colors'
import { Minus, Plus } from 'lucide-react-native'

export default function ProductCart({ item, quantity, addQty, lessQty, cart }) {
    return (
        <Pressable style={styles.cartContainer}>
            <Image
                style={styles.cartImg}
                source={{ uri: item?.thumbnail }}
                resizeMode='contain'
            />
            <View style={styles.cartContent}>
                <View style={styles.cartTextContainer}>
                    <Text numberOfLines={2} style={styles.cartTitle}>{item?.title.slice(0, 20)}</Text>
                    <Text numberOfLines={2} style={styles.cartSubTitle}>Size: XL</Text>
                    <Text numberOfLines={2} style={styles.cartMiniTitle}>${item?.price.toFixed(2)}</Text>
                </View>
                {cart && <View style={styles.productIncDec}>
                    <TouchableOpacity style={styles.decButton} onPress={() => lessQty()}>
                        <Minus size={moderateScale(22)} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.countTxt}>{quantity}</Text>
                    <TouchableOpacity style={styles.incButton} onPress={() => addQty()} >
                        <Plus size={moderateScale(22)} color="#fff" />
                    </TouchableOpacity>
                </View>}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        paddingBottom: moderateVerticalScale(16),
        backgroundColor: Colors.bg,
    },
    cartImg: {
        height: moderateScale(80),
        width: moderateScale(80),
        borderRadius: moderateScale(10),
    },
    cartContent: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
    },
    cartTextContainer: {
        gap: moderateScale(4),
        flex: 1,
    },
    cartTitle: {
        fontSize: scale(16),
        fontFamily: 'Satoshi-Medium',
        color: Colors.txtPrimary,
    },
    cartSubTitle: {
        fontSize: scale(16),
        fontFamily: 'Satoshi-Regular',
        color: Colors.txtSecondary,
    },
    cartMiniTitle: {
        fontSize: scale(16),
        fontFamily: 'Satoshi-Bold',
        color: Colors.txtPrimary,
    },
    productIncDec: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: moderateScale(12),
    },
    decButton: {
        backgroundColor: Colors.lightGray,
        paddingVertical: moderateVerticalScale(11),
        paddingHorizontal: moderateScale(6),
        borderRadius: moderateScale(4),
        width: moderateScale(22),
        height: moderateScale(22),
        alignItems: "center",
        justifyContent: "center",
    },
    incButton: {
        backgroundColor: Colors.btnBg,
        padding: moderateScale(6),
        borderRadius: moderateScale(4),
        width: moderateScale(22),
        height: moderateScale(22),
        alignItems: "center",
        justifyContent: "center",
    },
    countTxt: {
        fontSize: scale(16),
        fontFamily: 'Satoshi-Bold',
        color: Colors.txtPrimary,
        alignSelf: "center",
    }
})
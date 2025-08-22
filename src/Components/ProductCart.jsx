import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../constants/colors'
import imagePath from '../constants/imagePath'

export default function ProductCart({ item, onPress }) {
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
                <View style={styles.productIncDec}>
                    <TouchableOpacity style={styles.decButton} onPress={onPress} >
                        <Image
                            style={styles.decImg}
                            source={imagePath.minusIcon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Text style={styles.countTxt}>1</Text>
                    <TouchableOpacity style={styles.incButton} onPress={onPress} >
                        <Image
                            style={styles.incImg}
                            source={imagePath.minusIcon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(16),
    },
    cartImg: {
        backgroundColor: "red",
        height: moderateScale(80),
        width: moderateScale(80),
        borderRadius: moderateScale(10),
    },
    cartContent: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: "purple",
        flex: 1,
    },
    cartTextContainer: {
        backgroundColor: "salmon",
        gap: moderateScale(4),
        minWidth: "40%",
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
        backgroundColor: "green",
        minWidth: "60%",
    },
    decButton: {
        backgroundColor: Colors.border,
        padding: moderateScale(8),
        borderRadius: moderateScale(4),
        width: moderateScale(22),
        height: moderateScale(22),
    },
    incButton: {
        backgroundColor: Colors.btnBg,
        padding: moderateScale(8),
        borderRadius: moderateScale(4),
        width: moderateScale(22),
        height: moderateScale(22),
    },
    minusIcon: {
        width: moderateScale(11),
    },
    plusIcon: {
        width: moderateScale(11),
        height: moderateScale(11),
    },
    countTxt: {
        fontSize: scale(16),
        fontFamily: 'Satoshi-Bold',
        color: Colors.txtPrimary,
        alignSelf: "center",
    }
})
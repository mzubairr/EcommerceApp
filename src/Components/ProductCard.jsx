import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import Colors from '../constants/colors'
import imagePath from '../constants/imagePath'
import { Heart } from 'lucide-react-native'

export default function ProductCard({ item, onPress, handleFavorite, favoriteIds }) {
    return (
        <Pressable onPress={onPress} style={styles.dealItem}>
            <View style={styles.productImage}>
                <Image
                    style={styles.hotDealImg}
                    source={{ uri: item?.thumbnail }}
                    resizeMode='contain'
                />
                <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
                    <Heart
                        size={moderateScale(24)}
                        fill={favoriteIds.includes(item.id) ? Colors.error : "#fff"}
                        color={favoriteIds.includes(item.id) ? Colors.error : "#000"}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.hotDealContent}>
                <Text numberOfLines={2} style={styles.hotDealTitle}>{item?.title}</Text>
                <Text style={styles.hotDealSubTitle}>${item?.price}{" "}
                    <Text style={styles.hotDealminiTitle}>{((item?.price * 100) / (100 - item?.discountPercentage)).toFixed(2)}</Text>
                </Text>
                <View style={styles.review}>
                    <Image
                        style={styles.reviewIcon}
                        resizeMode='contain'
                        source={imagePath.star}
                    />
                    <Text style={styles.reviewTxt}>{item?.rating}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    dealItem: {
        minHeight: moderateScale(294),
        flex: 1,
        borderRadius: moderateScale(10),
        backgroundColor: Colors.bg,
        elevation: 2,
    },
    productImage: {
        position: "relative"
    },
    hotDealImg: {
        height: moderateScale(160),
        width: "100%",
        borderRadius: moderateScale(10),
    },
    favoriteIcon: {
        borderRadius: moderateScale(6),
        backgroundColor: Colors.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: moderateScale(6),
        position: "absolute",
        top: moderateVerticalScale(8),
        right: moderateScale(8)
    },
    hotDealContent: {
        gap: moderateScale(8),
        paddingLeft: moderateScale(8),
        paddingTop: moderateVerticalScale(16),
        paddingBottom: moderateVerticalScale(12)
    },
    hotDealTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtPrimary
    },
    hotDealSubTitle: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Bold",
        color: Colors.txtPrimary
    },
    hotDealminiTitle: {
        fontSize: scale(14),
        fontFamily: "Satoshi-Regular",
        color: Colors.txtSecondary,
        textDecorationLine: "line-through"
    },
    review: {
        flexDirection: "row",
        alignItems: "center",
        gap: moderateScale(8)
    },
    reviewIcon: {
        height: moderateScale(21),
        width: moderateScale(21),
    },
    reviewTxt: {
        fontSize: scale(16),
        fontFamily: "Satoshi-Medium",
        color: Colors.txtSecondary,
    },
})
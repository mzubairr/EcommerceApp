import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './productDetailsStyles'
import imagePath from '../../../constants/imagePath'
import ButtonComp from '../../../components/ButtonComp'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { addCart, addFavorite, listenToFavorites, removeFavorite } from '../../../Services/Firebase/db'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { ChevronDown, ChevronLeft, ChevronUp, Heart, Star, X } from 'lucide-react-native'
import Colors from '../../../constants/colors'

export default function ProductDetails({ route, navigation }) {

    const { ProductId } = route.params;
    const [singleProduct, setSingleProduct] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [textShown, setTextShown] = useState(false); // Read More / Less toggle
    const [lengthMore, setLengthMore] = useState(false); // Is description > 3 lines?
    const [desc, setDesc] = useState('');
    const [trimmedText, setTrimmedText] = useState('');
    const [toggleRating, setToggleRating] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleFavorite = (productId) => {
        const isFav = favoriteIds.includes(productId);

        if (isFav) {
            // Remove
            removeFavorite(productId);
        } else {
            addFavorite(productId);
        }
        return;
    };

    useEffect(() => {
        if (!ProductId) return;
        const getSingleProduct = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${ProductId}`);
                setSingleProduct(response.data);
                console.log(response.data);
                setProductImage(response?.data?.thumbnail);
                setDesc(response?.data?.description || '');
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getSingleProduct();

        const unsubscribe = listenToFavorites(setFavoriteIds);

        return () => unsubscribe();
    }, []);

    const onTextLayout = e => {
        const { lines } = e.nativeEvent;
        if (lines.length >= 3 && !lengthMore) {
            setLengthMore(true);
            // first 3 lines combine
            const threeLineText = lines.slice(0, 3).map(l => l.text).join('');
            setTrimmedText(threeLineText);
        }
    };

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    const addtoCart = (productId) => {
        const result = addCart(productId);
        if (result) {
            console.log("done cart", isModal);
            setIsModal(true);
            openPopup();
        }
    };


    const { height } = Dimensions.get("window");
    const translateY = useSharedValue(height);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const openPopup = () => {
        translateY.value = withTiming(0, { duration: 300 });
    };

    const closePopup = () => {
        translateY.value = withTiming(height, { duration: 300 });
    };

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.btnBg} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={moderateScale(24)} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.categoryTitle}>Product Details</Text>
                </View>
                <View style={styles.productImage}>
                    <Image
                        style={styles.singleProductImg}
                        source={{ uri: productImage }}
                        resizeMode='contain'
                    />
                    <TouchableOpacity onPress={() => { toggleFavorite(ProductId) }} style={styles.favoriteIcon}>
                        <Heart
                            size={moderateScale(24)}
                            fill={favoriteIds.includes(ProductId) ? Colors.error : "#fff"}
                            color={favoriteIds.includes(ProductId) ? Colors.error : "#000"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.productContentSec}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productImagesContainer} >
                        {singleProduct?.images?.map((item, i) => (
                            <Pressable key={i} onPress={() => { setProductImage(singleProduct?.images[i]) }}>
                                <Image
                                    style={styles.productImages}
                                    source={{ uri: item }}
                                    resizeMode='contain'
                                />
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View style={styles.productContent}>
                        <Text numberOfLines={2} style={styles.productTitle}>{singleProduct?.title}</Text>
                        <View style={styles.productPriceReview}>
                            <Text style={styles.productSubTitle}>${singleProduct?.price}</Text>
                            <View style={styles.review}>
                                <Image
                                    style={styles.reviewIcon}
                                    resizeMode='contain'
                                    source={imagePath.star}
                                />
                                <Text style={styles.reviewTxt}>{singleProduct?.rating}
                                    <Text style={styles.reviewTxtMin}> ({singleProduct?.reviews?.length} Reviews)</Text>
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.productDetailTitle}>Product Details</Text>
                        <Text style={styles.productDetails} onTextLayout={onTextLayout}>
                            {textShown ? desc + ' ' : lengthMore ? trimmedText + '... ' : desc + ' '}
                            {lengthMore && (
                                <Text
                                    style={styles.readMoreText}
                                    onPress={() => setTextShown(!textShown)}>
                                    {textShown ? 'Read Less' : 'Read More'}
                                </Text>
                            )}
                        </Text>
                        <View style={styles.separator} />
                        <Pressable
                            onPress={() => setToggleRating(!toggleRating)}
                            style={styles.ratingTitle}>
                            <Text style={styles.productDetailTitle}>Rating & Reviews</Text>
                            <TouchableOpacity onPress={() => setToggleRating(!toggleRating)}>
                                {toggleRating ? <ChevronUp /> : <ChevronDown />}
                            </TouchableOpacity>
                        </Pressable>
                        <View style={styles.separator} />

                        {toggleRating && singleProduct?.reviews.length > 0 && (
                            <>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.productDetailTitle}>4.8/5</Text>
                                    <View style={styles.ratingDetails}>
                                        <Text style={styles.ratingText}>Overall Rating</Text>
                                        <Text style={styles.ratingsubText}>105 Ratings</Text>
                                    </View>
                                </View>
                                <View style={styles.separator} />
                                {singleProduct?.reviews?.map((review, i) => (
                                    <View
                                        key={i}
                                        style={
                                            [styles.reviewContainer,
                                            i === 0 && { marginTop: moderateVerticalScale(24) },
                                            ]}>
                                        <View style={styles.reviewHeader}>
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                index < (review?.rating)
                                                    ? <Star key={index} size={24} color={"#F6BC2F"} fill={"#F6BC2F"} />
                                                    : <Star key={index} size={24} color={"#E0E0E5"} fill={"#E0E0E5"} />
                                            ))}
                                            <Text style={styles.reviewerFirstName}>{review?.reviewerName?.split(" ")[0]}</Text>
                                        </View>
                                        <Text style={styles.reviewComment}>{review?.comment}</Text>
                                        <Text style={styles.reviewerName}>{review?.reviewerName}, {formatDate(review?.date)}</Text>
                                    </View>
                                ))}
                            </>
                        )}
                        <ButtonComp onPress={
                            () => { addtoCart(ProductId) }
                        } btnTitle="Add to Cart" />
                    </View>
                    {isModal && (
                        <Animated.View style={[styles.modalContainer, animatedStyle]}>
                            <View style={styles.modalContent}>
                                <Image style={styles.checkmarkIcon} source={imagePath.checkmarkCircle} />
                                <Text style={styles.modalTitle}>Item Added to Saved</Text>
                                <TouchableOpacity onPress={() => { setIsModal(false); closePopup() }}>
                                    <X size={moderateScale(24)} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}
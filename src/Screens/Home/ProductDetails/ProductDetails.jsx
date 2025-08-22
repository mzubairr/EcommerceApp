import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './productDetailsStyles'
import imagePath from '../../../constants/imagePath'
import ButtonComp from '../../../components/ButtonComp'
import { FlatList } from 'react-native-gesture-handler'
import { moderateVerticalScale } from 'react-native-size-matters'
import { addCart, addFavorite, listenToFavorites, removeFavorite } from '../../../Services/Firebase/db'

export default function ProductDetails({ route, navigation }) {

    const { ProductId } = route.params;
    const [singleProduct, setSingleProduct] = useState(null);
    const [productImage, setProductImage] = useState(null);
    const [textShown, setTextShown] = useState(false); // Read More / Less toggle
    const [lengthMore, setLengthMore] = useState(false); // Is description > 3 lines?
    const [desc, setDesc] = useState('');
    const [trimmedText, setTrimmedText] = useState('');
    // const [selectedColor, setSelectedColor] = useState('Black');
    const [toggleRating, setToggleRating] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);

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
            const response = await axios.get(`https://dummyjson.com/products/${ProductId}`);
            setSingleProduct(response.data);
            console.log(response.data);
            setProductImage(response?.data?.thumbnail);
            setDesc(response?.data?.description || '');
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

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.arrowIcon}
                            source={imagePath.arrowLeft}
                        />
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
                        <Image
                            source={favoriteIds.includes(ProductId) ? imagePath.savedIcon : imagePath.heart}
                            resizeMode='contain'
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
                        {/* <Text style={styles.productDetailTitle}>Select Color: {selectedColor}</Text>
                    <View>
                        <View style={styles.colorOptionsContainer} />
                    </View> */}
                        <Pressable
                            onPress={() => setToggleRating(!toggleRating)}
                            style={styles.ratingTitle}>
                            <Text style={styles.productDetailTitle}>Rating & Reviews</Text>
                            <TouchableOpacity onPress={() => setToggleRating(!toggleRating)}>
                                <Image
                                    style={[styles.arrowIcon, toggleRating && { transform: [{ rotate: '180deg' }] }]}
                                    source={imagePath.arrowDown}
                                />
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
                                                <Image
                                                    key={index}
                                                    style={styles.reviewIcon}
                                                    resizeMode='contain'
                                                    source={
                                                        index < (review?.rating)
                                                            ? imagePath.reviewStar   // filled star
                                                            : imagePath.emptyStar    // empty star
                                                    }
                                                />
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
                            () => { addCart(ProductId) }
                        } btnTitle="Add to Cart" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}
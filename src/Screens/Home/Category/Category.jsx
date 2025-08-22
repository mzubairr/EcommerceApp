import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './categoryStyles'
import imagePath from '../../../constants/imagePath'
import ProductCard from '../../../components/ProductCard'
import firestore from '@react-native-firebase/firestore';
import { addFavorite, listenToFavorites, removeFavorite } from '../../../Services/Firebase/db'

export default function Category({ route, navigation }) {

    const [queryProduct, setQueryProduct] = useState([])
    const { category, results } = route.params;
    const [favoriteIds, setFavoriteIds] = useState([]);

    const toggleFavorite = async (productId) => {
        const isFav = favoriteIds.includes(productId);

        if (isFav) {
            // Remove
            removeFavorite(productId);
        } else {
            // Add
            addFavorite(productId);
        }
    };

    useEffect(() => {
        if (!category) return
        const getSingleProduct = async () => {
            const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
            setQueryProduct(response.data.products);
        }
        getSingleProduct();

        const unsubscribe = listenToFavorites(setFavoriteIds)

        return () => unsubscribe();
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.arrowIcon}
                        source={imagePath.arrowLeft}
                    />
                </TouchableOpacity>
                <Text style={styles.categoryTitle}>{category}</Text>
            </View>
            <Text style={styles.categoryItemCount}>{queryProduct.length > 0 ? queryProduct.length : results?.length} items</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnSeparate}
                numColumns={2}
                data={queryProduct.length > 0 ? queryProduct : results}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        onPress={() => navigation.navigate("ProductDetails", { ProductId: item.id })}
                        item={item}
                        favoriteIds={favoriteIds}
                        handleFavorite={() => toggleFavorite(item.id)} />
                )}
            />
        </SafeAreaView>
    )
}
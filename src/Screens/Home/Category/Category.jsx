import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './categoryStyles'
import ProductCard from '../../../components/ProductCard'
import { addFavorite, listenToFavorites, removeFavorite } from '../../../Services/Firebase/db'
import { ChevronLeft } from 'lucide-react-native'
import { moderateScale } from 'react-native-size-matters'
import Colors from '../../../constants/colors'

export default function Category({ route, navigation }) {

    const [queryProduct, setQueryProduct] = useState([])
    const { category, results } = route.params;
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            try {
                setIsLoading(true);
                const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
                setQueryProduct(response.data.products);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        getSingleProduct();

        const unsubscribe = listenToFavorites(setFavoriteIds)

        return () => unsubscribe();
    }, [])


    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.btnBg} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={moderateScale(24)} color="#000" />
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
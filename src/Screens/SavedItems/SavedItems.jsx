import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './savedItemsStyles'
import imagePath from '../../constants/imagePath'
import ProductCard from '../../components/ProductCard'
import { listenToFavorites, removeFavorite } from '../../Services/Firebase/db'

export default function SavedItems({ navigation }) {

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favProduct, setFavProduct] = useState([]);

  const toggleFavorite = async (productId) => {
    const isFav = favoriteIds.includes(productId);

    if (isFav) {
      // Remove
      removeFavorite(productId);
    }
    return;
  };

  useEffect(() => {
    const unSubscribe = listenToFavorites(setFavoriteIds, (callBack) => {
      if (callBack) {
        callBack.length > 0 ? fetchFavorites(callBack) : setFavProduct([])
      }
    });

    async function fetchFavorites(favProducts) {
      if (favProducts.length < 1) return;
      try {
        // create an array of fetch promises
        const promises = favProducts?.map(id =>
          axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
        );

        // wait until ALL requests are done
        const results = await Promise.all(promises);

        setFavProduct(results);
      } catch (err) {
        Alert.alert("Error", "Please try again later.");
      }
    }

    return () => unSubscribe();

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
        <Text style={styles.categoryTitle}>Saved Items</Text>
      </View>
      <Text
        style={styles.categoryItemCount}>
        {favProduct.length > 0 ? favProduct.length : 0}
        {favProduct.length > 1 ? " items " : " item "}
      </Text>
      {favProduct.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnSeparate}
          numColumns={2}
          data={favProduct}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              onPress={() => navigation.navigate("ProductDetails", { ProductId: item.id })}
              item={item}
              handleFavorite={() => toggleFavorite(item.id)}
              favoriteIds={favoriteIds} />
          )}
        />
      ) : (
        <View style={styles.EmptyFavContainer}>
          <Image source={imagePath.heartDuotone} style={styles.heartDuotoneImg} resizeMode='cover' />
          <Text style={styles.emptyFavTitle}>No Saved Items!</Text>
          <Text style={styles.emptyFavDesc}>You don’t have any saved items. Go to home and add some.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
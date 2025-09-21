import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './savedItemsStyles'
import ProductCard from '../../components/ProductCard'
import { listenToFavorites, removeFavorite } from '../../Services/Firebase/db'
import { ChevronLeft, Heart } from 'lucide-react-native'
import { moderateScale } from 'react-native-size-matters'
import Colors from '../../constants/colors'

export default function SavedItems({ navigation }) {

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favProduct, setFavProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true)
      try {
        // create an array of fetch promises
        const promises = favProducts?.map(id =>
          axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
        );

        // wait until ALL requests are done
        const results = await Promise.all(promises);

        setFavProduct(results);
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        Alert.alert("Error", "Please try again later.");
      }
    }

    return () => unSubscribe();

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
        <Text style={styles.headerTitle}>Saved Items</Text>
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
          <Heart size={moderateScale(64)} color={Colors.inActiveBorder} />
          <Text style={styles.emptyFavTitle}>No Saved Items!</Text>
          <Text style={styles.emptyFavDesc}>You don’t have any saved items. Go to home and add some.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
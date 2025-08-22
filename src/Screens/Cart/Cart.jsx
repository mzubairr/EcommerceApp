import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './cartStyles'
import imagePath from '../../constants/imagePath'
import ProductCard from '../../components/ProductCard'
import ProductCart from '../../components/ProductCart'
import { listenToCarts } from '../../Services/Firebase/db'

export default function Cart() {

  const [cartIds, setCartIds] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);

  // const toggleFavorite = async (productId) => {
  //   const isFav = favoriteIds.includes(productId);

  //   if (isFav) {
  //     // Remove
  //     removeFavorite(productId);
  //   }
  //   return;
  // };

  useEffect(() => {

    const unSubscribe = listenToCarts(setCartIds, (callBack) => {
      if (callBack) {
        callBack.length > 0 ? fetchCart(callBack) : setCartProduct([])
      }
    });

    async function fetchCart(cartProducts) {
      if (cartProducts.length < 1) return;
      try {
        // create an array of fetch promises
        const promises = cartProducts?.map(id =>
          axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
        );

        // wait until ALL requests are done
        const results = await Promise.all(promises);

        setCartProduct(results);
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
        <Text style={styles.categoryTitle}>My Cart</Text>
      </View>
      {cartProduct.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartProduct}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <ProductCart
                onPress={() => () => { }}
                item={item}
              // handleFavorite={() => toggleFavorite(item.id)}
              // cartIds={cartIds}
              />
              <View style={{
                height: 2,
                backgroundColor: "red",
                flex: 1,
                marginVertical: 10,
              }} />
            </>
          )}
        />
      ) : (
        <View style={styles.EmptyCartContainer}>
          <Image source={imagePath.cartDuotone} style={styles.cartDuotoneImg} resizeMode='cover' />
          <Text style={styles.emptyCartTitle}>Your Cart Is Empty!</Text>
          <Text style={styles.emptyCartDesc}>When you add products, they’ll appear here.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
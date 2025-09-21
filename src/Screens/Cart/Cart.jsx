import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import styles from './cartStyles'
import imagePath from '../../constants/imagePath'
import ProductCart from '../../components/ProductCart'
import { deleteCartItem, listenToCarts, updateQuantity } from '../../Services/Firebase/db'
import ButtonComp from '../../components/ButtonComp'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { moderateScale } from 'react-native-size-matters'
import { ChevronLeft, ShoppingCart } from 'lucide-react-native'
import Colors from '../../constants/colors'

export default function Cart({ navigation }) {

  const [cartProduct, setCartProduct] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const swipeableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Close any open swipeable when navigating back
    const unsubscribe = navigation.addListener('blur', () => {
      if (swipeableRef.current) {
        swipeableRef.current.reset();
        swipeableRef.current = null;
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unSubscribe = listenToCarts((callBack) => {
      if (callBack.length > 0) {
        fetchCart(callBack);
        setQuantity([...callBack]);
      } else {
        setCartProduct([]);
      }
    });

    async function fetchCart(cartProducts) {
      if (cartProducts.length < 1) return;
      setIsLoading(true)
      try {
        const promises = cartProducts?.map(item =>
          axios.get(`https://dummyjson.com/products/${item.productId}`).then(res => res.data)
        );
        const results = await Promise.all(promises);
        setCartProduct(results);
      } catch (err) {
        Alert.alert("Error", "Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    return () => unSubscribe();
  }, [])

  const getQuantity = (id) => {
    const item = quantity.find(qty => String(qty.productId) === String(id));
    return item ? item.quantity : 1;
  };

  const increaseQuantity = (id) => {
    const item = quantity.find(qty => String(qty.productId) === String(id));
    if (!item) return;
    updateQuantity(id, item.quantity + 1);
  };

  const lessQuantity = (id) => {
    const item = quantity.find(qty => String(qty.productId) === String(id));
    if (!item || item.quantity <= 1) return;
    updateQuantity(id, item.quantity - 1);
  };

  const subTotal = cartProduct.reduce((acc, item) => {
    const qtyObj = quantity.find(qty => String(qty.productId) === String(item.id));
    const qty = qtyObj ? qtyObj.quantity : 1;
    return acc + item.price * qty;
  }, 0);

  const deliveryFee = 20;
  const discount = 10;
  const total = subTotal + deliveryFee - discount;

  const handleSwipeableOpen = (swipeable) => {
    // Close previously opened swipeable
    if (swipeableRef.current && swipeableRef.current !== swipeable) {
      swipeableRef.current.reset();
    }
    // Set new swipeable as reference
    swipeableRef.current = swipeable;
  };

  const handleSwipeableClose = () => {
    if (swipeableRef.current) {
      swipeableRef.current = null;
    }
  };

  const renderRightActions = (id, swipeableRef) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        deleteCartItem(id);
        if (swipeableRef.current) {
          swipeableRef.current.reset();
          swipeableRef.current = null;
        }
      }}
    >
      <Image style={styles.deleteIcon} source={imagePath.trashIcon} resizeMode='contain' />
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      {cartProduct.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            gap: moderateScale(16),
          }}
          showsVerticalScrollIndicator={false}
          data={cartProduct}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              ref={(ref) => {
                item.swipeableRef = ref;
              }}
              onSwipeableOpen={() => handleSwipeableOpen(item.swipeableRef)}
              onSwipeableClose={handleSwipeableClose}
              renderRightActions={() => renderRightActions(item.id, swipeableRef)}
            >
              <ProductCart
                item={item}
                quantity={getQuantity(item.id)}
                addQty={() => increaseQuantity(item.id)}
                lessQty={() => lessQuantity(item.id)}
                cart={true}
              />
            </Swipeable>
          )}
          ListFooterComponent={
            <>
              <View style={styles.footerContainer}>
                <View style={styles.footerItem}>
                  <Text style={styles.footerText}>Sub-total</Text>
                  <Text style={styles.priceText}>${subTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.footerItem}>
                  <Text style={styles.footerText}>Delivery Fee</Text>
                  <Text style={styles.priceText}>${deliveryFee.toFixed(2)}</Text>
                </View>
                <View style={styles.footerItem}>
                  <Text style={styles.footerText}>Discount</Text>
                  <Text style={styles.priceText}>${discount.toFixed(2)}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.footerItem}>
                  <Text style={[styles.footerText, { fontFamily: "Satoshi-Bold" }]}>Total</Text>
                  <Text style={styles.priceText}>${total.toFixed(2)}</Text>
                </View>
              </View>
              <ButtonComp
                onPress={() => navigation.navigate("Checkout", {
                  subTotal,
                  deliveryFee,
                  discount,
                  total,
                  cartItems: cartProduct,
                  quantities: quantity
                })}
                btnTitle="Go To Checkout" />
            </>
          }
        />
      ) : (
        <View style={styles.EmptyCartContainer}>
          <ShoppingCart size={moderateScale(64)} color={Colors.inActiveBorder} />
          <Text style={styles.emptyCartTitle}>Your Cart Is Empty!</Text>
          <Text style={styles.emptyCartDesc}>When you add products, they'll appear here.</Text>
        </View>
      )}
    </SafeAreaView>
  )
}
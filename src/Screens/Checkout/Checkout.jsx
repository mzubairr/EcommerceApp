import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './checkoutStyles'
import imagePath from '../../constants/imagePath'
import ButtonComp from '../../components/ButtonComp';
import { clearCart, placeOrder } from '../../Services/Firebase/db';
import { Apple, Banknote, ChevronLeft, CreditCard, MapPin, Pencil } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../constants/colors';

export default function Checkout({ navigation, route }) {
  const { subTotal, deliveryFee, discount, total, cartItems, quantities } = route.params;

  const handlePlaceOrder = async () => {
    try {
      const itemsWithQty = cartItems.map(product => {
        const qtyObj = quantities.find(q => String(q.productId) === String(product.id));
        return {
          ...product,
          quantity: qtyObj ? qtyObj.quantity : 1
        };
      });

      await placeOrder(itemsWithQty, total);
      await clearCart();

      Alert.alert("Success", "Your order has been placed!");
      navigation.navigate("TabRoutes");
    } catch (err) {
      Alert.alert("Error", "Something went wrong, please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressTitle}>Delivery Address</Text>
          <Text style={styles.addressChange}>Change</Text>
        </View>
        <View style={styles.addressDetails}>
          <MapPin size={moderateScale(24)} color={"#938F9C"} />
          <View style={styles.addressInfo}>
            <Text style={styles.addressLabel}>Home</Text>
            <Text style={styles.addressText}>925 S Chugach St #APT 10, Alaska 99645</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentTitle}>Payment Method</Text>
        <View style={styles.paymentDetails}>
          <TouchableOpacity style={[styles.paymentOption,
          { backgroundColor: false ? Colors.btnBg : Colors.bg }]}>
            <CreditCard size={moderateScale(24)} color={false ? "#fff" : "#000"} />
            <Text style={[styles.paymentLabel, { color: false ? "#fff" : "#000" }]}>Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentOption,
          { backgroundColor: true ? Colors.btnBg : Colors.bg }]}>
            <Banknote size={moderateScale(24)} color={false ? "#fff" : "#000"} />
            <Text style={styles.paymentLabel}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paymentOption,
          { backgroundColor: true ? Colors.btnBg : Colors.bg }]}>
            <Apple size={moderateScale(24)} color={false ? "#fff" : "#000"} />
            <Text style={styles.paymentLabel}>Pay</Text>
          </TouchableOpacity>
        </View>
        {/* Payment card */}
        <View style={styles.paymentCard}>
          <View style={styles.paymentInfo}>
            <Image
              source={imagePath.visaIcon}
              style={styles.cardImage}
            />
            <Text style={styles.cardNumber}>**** **** **** 2512</Text>
          </View>
          <Pencil size={moderateScale(24)} color={false ? "#fff" : "#000"} />
        </View>
        {/* Payment card */}
      </View>
      <View style={styles.separator} />
      <View style={styles.paymentContainer}>
        <Text style={styles.orderTitle}>Order Summary</Text>
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
        <View style={[styles.separator, { marginVertical: 0 }]} />
        <View style={styles.footerItem}>
          <Text style={[styles.footerText, { fontFamily: "Satoshi-Bold" }]}>Total</Text>
          <Text style={styles.priceText}>${total.toFixed(2)}</Text>
        </View>
      </View>
      <ButtonComp
        onPress={handlePlaceOrder}
        btnTitle="Place Order" />
    </SafeAreaView >
  )
}
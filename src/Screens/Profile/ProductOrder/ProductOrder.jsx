import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './productOrderStyles'
import ProductCart from '../../../components/ProductCart'
import { listenToMyOrders } from '../../../Services/Firebase/db'
import { moderateScale } from 'react-native-size-matters'
import { ChevronLeft, ScrollText } from 'lucide-react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from '../../../constants/colors'

export default function ProductOrder({ navigation }) {
    const TopTab = createMaterialTopTabNavigator();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const unsub = listenToMyOrders((list) => setOrders(list));
        return () => unsub && unsub();
    }, []);

    const TabScreen = ({ status }) => (
        <OrdersList data={orders.filter(o => o.status === status)} />
    );

    // ✅ Common FlatList component for all tabs
    const OrdersList = ({ data }) => (
        <View style={styles.orderListContainer}>
            {data.length > 0 ? (
                <FlatList
                    contentContainerStyle={styles.columnSeparate}
                    showsVerticalScrollIndicator={false}
                    data={data.flatMap(order => order.items)}
                    keyExtractor={(item) => item.orderItemId}
                    renderItem={({ item }) => <ProductCart item={item} />}
                />
            ) : (
                <Text style={styles.emptyText}>No orders found!</Text>
            )}
        </View>
    );

    function PendingOrders() {
        return <TabScreen status="Pending" />;
    }

    function CompletedOrders() {
        return <TabScreen status="Completed" />;
    }

    function CancelledOrders() {
        return <TabScreen status="Cancelled" />;
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={moderateScale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
            </View>

            {orders.length > 0 ? (
                <TopTab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIndicatorStyle: { backgroundColor: "transparent" },
                        tabBarStyle: { ...styles.tabBarStyle },
                        tabBarLabel: ({ focused }) => (
                            <View style={[
                                styles.tabLabelContainer,
                                { backgroundColor: focused ? Colors.bg : "transparent" }
                            ]}>
                                <Text
                                    style={[styles.tabLabelText, { color: focused ? "#000" : "#777" }]}>
                                    {route.name}
                                </Text>
                            </View>
                        ),
                    })}
                    sceneContainerStyle={{ backgroundColor: "#fff", marginTop: 0 }}

                >
                    <TopTab.Screen name="Pending" component={PendingOrders} />
                    <TopTab.Screen name="Completed" component={CompletedOrders} />
                    <TopTab.Screen name="Cancelled" component={CancelledOrders} />
                </TopTab.Navigator >

            ) : (
                <View style={styles.EmptyCartContainer}>
                    <ScrollText size={moderateScale(64)} />
                    <Text style={styles.emptyCartTitle}>No Ongoing Orders!</Text>
                    <Text style={styles.emptyCartDesc}>
                        You don’t have any ongoing orders at this time.
                    </Text>
                </View>
            )}
        </SafeAreaView >
    );
}

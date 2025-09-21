// firebaseFavorites.js
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, deleteField, collection, addDoc, query, where, deleteDoc } from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';
import uuid from 'react-native-uuid';

// Get Firestore instance (modular)
const firestore = getFirestore(getApp());

// Helper to get current user ID
const getUserId = () => getAuth().currentUser?.uid;

// Add a product to favorites
const addFavorite = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    const userFavRef = doc(firestore, 'favorites', userId);

    await setDoc(
        userFavRef,
        {
            productIds: arrayUnion(productId)
        },
        { merge: true } // merge so it doesn't overwrite existing array
    );
};

// Remove a product from favorites
const removeFavorite = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    const userFavRef = doc(firestore, 'favorites', userId);

    await updateDoc(userFavRef, {
        productIds: arrayRemove(productId)
    });
};

// Listen to favorite changes
const listenToFavorites = (setFavoriteIds, callBack) => {
    const userId = getUserId();
    if (!userId) return null;

    const userFavRef = doc(firestore, 'favorites', userId);

    const unsubscribe = onSnapshot(userFavRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            setFavoriteIds(data?.productIds || []);
            if (callBack) callBack(data?.productIds);
        }
    });

    return unsubscribe;
};

// Add item to cart
const addCart = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    const userCartRef = doc(firestore, 'cart', userId);

    await setDoc(
        userCartRef,
        { cart: { [productId]: { quantity: 1 } } },
        { merge: true }
    );

    return true;
};

// Clear full cart after placing order
const clearCart = async () => {
    const userId = getUserId();
    if (!userId) return;

    const userCartRef = doc(firestore, "cart", userId);

    try {
        await deleteDoc(userCartRef);
    } catch (err) {
        console.log("Error removing cart:", err);
    }
};

// Delete item from cart
const deleteCartItem = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    const userCartRef = doc(firestore, 'cart', userId);

    await updateDoc(userCartRef, {
        [`cart.${productId}`]: deleteField()
    });
};

// Listen to cart changes
const listenToCarts = (callBack) => {
    const userId = getUserId();
    if (!userId) return null;

    const userCartRef = doc(firestore, 'cart', userId);

    const unsubscribe = onSnapshot(userCartRef, (docSnap) => {
        if (docSnap.exists()) {
            const cartData = docSnap?.data()?.cart || {};
            const cartArray = Object.keys(cartData).map(productId => ({
                productId,
                ...cartData[productId]
            }));

            if (callBack) callBack(cartArray);
        } else {
            if (callBack) callBack([]);
        }
    });

    return unsubscribe;
};

// Update quantity (increase or decrease)
const updateQuantity = async (productId, quantity) => {
    const userId = getUserId();
    if (!userId) return;

    const userCartRef = doc(firestore, 'cart', userId);

    await updateDoc(userCartRef, {
        [`cart.${productId}.quantity`]: quantity
    });
};
// Place an order
const placeOrder = async (items, totalAmount) => {
    const userId = getUserId();
    if (!userId) throw new Error('Not logged in');

    const ordersRef = collection(firestore, 'orders');

    const itemsWithIds = items.map((item) => ({
        ...item,
        orderItemId: uuid.v4(), // unique id for each item in the order
    }));

    await addDoc(ordersRef, {
        userId,
        items: itemsWithIds,
        totalAmount,
        status: 'Pending',
        createdAt: new Date()
    });

    return true;
};

// Listen to user's orders
const listenToMyOrders = (callback) => {
    const userId = getUserId();
    if (!userId) return () => { };

    const q = query(collection(firestore, 'orders'), where('userId', '==', userId));
    const unsub = onSnapshot(q, (snap) => {
        const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        callback(orders);
    });

    return unsub;
};

// Save user profile (username, dob, gender)
const saveUserProfile = async (username, dob, gender) => {
    const userId = getUserId();
    if (!userId) return false;

    const userRef = doc(firestore, 'users', userId);

    await setDoc(userRef, {
        username,
        dob: dob instanceof Date ? dob.toISOString() : dob,
        gender
    }, { merge: true });

    return true;
};

// Listen to user profile changes
const listenToUserProfile = (callback) => {
    const userId = getUserId();
    if (!userId) return () => { };

    const userRef = doc(firestore, "users", userId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data());
        } else {
            callback(null);
        }
    });

    return unsubscribe;
};

export {
    addFavorite,
    removeFavorite,
    listenToFavorites,
    addCart,
    clearCart,
    deleteCartItem,
    listenToCarts,
    updateQuantity,
    placeOrder,
    listenToMyOrders,
    saveUserProfile,
    listenToUserProfile
};
import firestore from '@react-native-firebase/firestore';
import { getAuth } from "@react-native-firebase/auth";

const getUserId = () => getAuth().currentUser?.uid;

const addFavorite = async (productId) => {

    const userId = getUserId();
    if (!userId) return;

    await firestore()
        .collection('favorites')
        .doc(userId)
        .set({
            productIds: firestore.FieldValue.arrayUnion(productId)
        }, { merge: true });
};

const removeFavorite = async (productId) => {

    const userId = getUserId();
    if (!userId) return;

    await firestore()
        .collection('favorites')
        .doc(userId)
        .update({
            productIds: firestore.FieldValue.arrayRemove(productId)
        });
};

const listenToFavorites = (setFavoriteIds, callBack) => {

    const userId = getUserId();
    if (!userId) return;

    const unsubscribe = firestore()
        .collection('favorites')
        .doc(userId)
        .onSnapshot(docSnapshot => {
            if (docSnapshot.exists) {
                const productIds = docSnapshot?.data()?.productIds || [];
                setFavoriteIds(productIds);
                if (callBack) callBack(productIds);
                console.log("callBacksss", callBack);

            }
        });

    return unsubscribe;
}

const addCart = async (productId) => {

    const userId = getUserId();
    if (!userId) return;

    await firestore()
        .collection('cart')
        .doc(userId)
        .set({
            cartIds: firestore.FieldValue.arrayUnion(productId)
        }, { merge: true });
};

const removeCart = async (productId) => {

    const userId = getUserId();
    if (!userId) return;

    await firestore()
        .collection('cart')
        .doc(userId)
        .update({
            cartIds: firestore.FieldValue.arrayRemove(productId)
        });
};

const listenToCarts = (setCartIds, callBack) => {

    const userId = getUserId();
    if (!userId) return;

    const unsubscribe = firestore()
        .collection('cart')
        .doc(userId)
        .onSnapshot(docSnapshot => {
            if (docSnapshot.exists) {
                const productIds = docSnapshot?.data()?.cartIds || [];
                setCartIds(productIds);
                if (callBack) callBack(productIds);
                console.log("callBacksss", callBack);
            }
        });

    return unsubscribe;
}

export {
    addFavorite,
    removeFavorite,
    listenToFavorites,
    addCart,
    removeCart,
    listenToCarts
};
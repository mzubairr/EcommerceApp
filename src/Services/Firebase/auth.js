import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    sendEmailVerification,
} from '@react-native-firebase/auth';

const auth = getAuth();

export const registerUser = async (email, password, setFirebaseError) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        return userCredential.user;
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already in use. Please use a different email address';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter valid email address';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak, Please use at least 6 characters';
                break;
            default:
                errorMessage = 'An unknown error occured';
                break;
        }
        setFirebaseError(errorMessage);
    }
};

export const loginUser = async (email, password, setFirebaseError) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { user };
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'Incorrect Password';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found!';
                break;
            default:
                errorMessage = 'An unknown error occurred';
        }
        setFirebaseError(errorMessage);
        return null
    }
};

export const resetPasswrod = async (email, setFirebaseError) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'This user does not exist';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid Email address';
                break;
            default:
                errorMessage = 'An unknown error occurred';
        }
        setFirebaseError(errorMessage);
        return false;
    }
};

export const signOutUser = async (setFirebaseError) => {
    try {
        await signOut(auth);
    } catch (error) {
        setFirebaseError(error);
    }
}
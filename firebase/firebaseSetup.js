// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, initializeAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:apiKey, 
    authDomain:authDomain, 
    projectId:projectId, 
    storageBucket:storageBucket, 
    messagingSenderId:messagingSenderId,
    appId:appId,
};

// Initialize Firebase
const gas_pred_app = initializeApp(firebaseConfig);
export const auth = initializeAuth(gas_pred_app, {
    persistence: getReactNativePersistence(AsyncStorage),
});


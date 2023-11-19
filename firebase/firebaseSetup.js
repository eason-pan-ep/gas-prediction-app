// This is the firebase setup file. It is used to initialize the firebase server accesses
// // it exports the auth variable which is used to access the authentication functions

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from "@env";



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
export const database = getFirestore(gas_pred_app);


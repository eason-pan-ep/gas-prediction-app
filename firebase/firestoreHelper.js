// This is the firestore helper file.
// It contains functions that are used to access the firestore database.

import { database, auth } from "./firebaseSetup";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";


// This function writes the user profile data to the userProfiles collection in the database.
// It takes in 1 parameter:
// // 1. data - the data to be written
export const writeToUserProfile = async (data) => {
    // add the user id to the data object
    const newData = {...data, user: auth.currentUser.uid};
    try{
        // add the data to the userProfiles collection
        const docRef = await addDoc(collection(database, "userProfiles"), newData);
    }catch(error){
        console.log("Error writing to user Profile data collection: ", error);
    }
}


// This function updates the user profile data in the userProfiles collection in the database.
// It takes in 2 parameters:
// // 1. data - the data to be updated
// // 2. docID - the document id of the document to be updated
export const updateUserProfile = async (data, docID) => {
    const docRef = doc(database, "userProfiles", docID);
    try{
        const newData = {...data, user: auth.currentUser.uid};
        await updateDoc(docRef, newData);
    }catch(error){
        console.log("Error updating user profile data: ", error);
    }
}


// This function writes the fueling data to the fuelingHistory collection in the database.
// It takes in 1 parameter:
// // 1. data - the data to be written
export const writeToFuelingHistory = async (data) => {
    // add the user id to the data object
    const newData = {...data, user: auth.currentUser.uid};
    try{
        // add the data to the fuelingHistory collection
        const docRef = await addDoc(collection(database, "fuelingHistory"), newData);
    }catch(error){
        console.log("Error writing to fueling history data collection: ", error);
    }
}

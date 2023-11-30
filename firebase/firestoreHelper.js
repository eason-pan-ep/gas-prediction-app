// This is the firestore helper file.
// It contains functions that are used to access the firestore database.

import { database, auth } from "./firebaseSetup";
import { addDoc, collection, doc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { storage } from "./firebaseSetup";


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

// This function updates the fueling data in the fuelingHistory collection in the database.
// It takes in 2 parameters:
// // 1. data - the data to be updated
// // 2. docID - the document id of the document to be updated
export const updateFuelingHistory = async (data, docID) => {
    const docRef = doc(database, "fuelingHistory", docID);
    try{
        const newData = {...data, user: auth.currentUser.uid};
        await updateDoc(docRef, newData);
    }catch(error){
        console.log("Error updating fueling history data: ", error);
    }
};

// This function deletes the fueling data in the fuelingHistory collection in the database.
// It takes in 1 parameter:
// // 1. docID - the document id of the document to be deleted
export const deleteFromFuelingHistory = async (docID) => {
    const docRef = doc(database, "fuelingHistory", docID);
    try{
        await deleteDoc(docRef);
    }catch(error){
        console.log("Error deleting fueling history data: ", error);
    }
};


// This function writes the prediction data to the predictionData collection in the database.
// It takes in 1 parameter:
// // 1. data - the data to be written
export const writeToPredictionData = async (data) => {
    // add the user id to the data object
    const newData = {...data, user: auth.currentUser.uid};
    try{
        // add the data to the predictionData collection
        const docRef = await addDoc(collection(database, "predictionData"), newData);
    }catch(error){
        console.log("Error writing to prediction data collection: ", error);
    }
};


// This function clears current user's cache in the prediction collection in the database.
export const clearUserPredictionCache = async () => {
    let deleteIDs = []; // store the document ids in an array to be deleted later
    try{
        // get all the documents in the predictionData collection that matches the current user
        const q = query(collection(database, "predictionData"),where("user", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteIDs.push(doc.id); //store the document ids in an array
        });
        // delete all the documents in the predictionData collection that matches the current user
        for(let i = 0; i < deleteIDs.length; i++){
            const docRef = doc(database, "predictionData", deleteIDs[i]);
            try{
                await deleteDoc(docRef);
            }catch(error){
                console.log("Error deleting prediction data: ", error);
            }
        }
    }catch(error){
        console.log("Error clearing user prediction cache: ", error);
    }
};




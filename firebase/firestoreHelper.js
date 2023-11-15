// This is the firestore helper file.
// It contains functions that are used to access the firestore database.

import { database, auth } from "./firebaseSetup";
import { addDoc, collection } from "firebase/firestore";


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

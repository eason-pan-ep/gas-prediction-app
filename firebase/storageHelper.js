// This file contains the helper functions for the firebase storage.

import { storage } from "./firebaseSetup";
import { ref, uploadBytesResumable } from "firebase/storage";

import { writeToFuelingHistory, updateFuelingHistory } from "./firestoreHelper";


// This function uploads the image to the firebase storage, 
// and updates the fueling entry data in the database with the image url.
// It takes in 3 parameters:
// //1. uri - the uri of the image to be uploaded
// //2. entryInfo data - the data of the fueling entry
// //3. docID - the document id of the fueling entry (if available)
export const uploadImage = async (uri, entryInfo, docID) => {
    try{
        // fetch the image from the uri and convert it to blob
        const response = await fetch(uri);
        const blob = await response.blob();

        // get the image name and create a reference to the image in the firebase storage
        const imageName = uri.substring(uri.lastIndexOf('/')+1);
        const imageRef = ref(storage, `images/${imageName}`);

        // upload the image to the firebase storage and get the download url
        const uploadRes = await uploadBytesResumable(imageRef, blob);
        const url = uploadRes.metadata.fullPath;
        console.log("Image uploaded: ", url);
        if(docID !== ""){
            // if the docID is available, update the fueling entry data in the database with the image url
            updateFuelingHistory({...entryInfo, photoRef: url}, docID);
        }else{
            // if the docID is not available, write the fueling entry data to the database with the image url
            writeToFuelingHistory({...entryInfo, photoRef: url});
        }
    }catch(error){
        console.log("Error uploading image: ", error);
    }
    
};

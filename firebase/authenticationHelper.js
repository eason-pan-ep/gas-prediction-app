// This is the firebase authentication helper file.
// It contains functions that are used to access the authentication functions.
//

import { auth } from './firebaseSetup';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

// Function to verify whether user's input matches their current password
export const verifyPassword = async (password) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    try{
        await reauthenticateWithCredential(auth.currentUser, credential);
        return true;
    }catch(error){
        console.log("Error verifying password: ", error);
        return false;
    }
};

// Function to change user's password
export const changePassWords = async (newPassword) => {
    try{
        await updatePassword(auth.currentUser, newPassword);
    }catch(error){
        console.log("Error changing password: ", error);
    }
};
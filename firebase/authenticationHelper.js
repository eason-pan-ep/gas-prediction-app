import { auth } from './firebaseSetup';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

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

export const changePassWords = async (newPassword) => {
    try{
        await updatePassword(auth.currentUser, newPassword);
    }catch(error){
        console.log("Error changing password: ", error);
    }
};
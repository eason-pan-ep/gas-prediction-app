// // This is the utility file for the Prediction screen.
import { GAS_APP_BACKEND_KEY } from "@env"; // backend API key from .env file 

// This function calls the backend API to get the major city name based on coordinates.
export const getCity = async (coordinate) => {
    const latitudeStr = coordinate.latitude.toString();
    const longitudeStr = coordinate.longitude.toString();
    const backendKEY = GAS_APP_BACKEND_KEY;
    const requestURL = `https://gas-prediction-back-end-a68f10a4a29c.herokuapp.com/city?latitude=${latitudeStr}&longitude=${longitudeStr}&GAS_APP_BACKEND_KEY=${backendKEY}`;
    try{
        const response = await fetch(requestURL,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error getting city from backend: ", error);
    }
    
}


// This function returns the suggested date to fill up gas based on the price list.
export const getSuggestedDate = (priceList) => {
    let minPrice = priceList[0];
    let minIndex = 0;
    for(let i = 1; i < priceList.length; i++){
        if(priceList[i] < minPrice){
            minPrice = priceList[i];
            minIndex = i;
        }
    }
    const today = new Date();
    return new Date(today.setDate(today.getDate() + minIndex)).toISOString().split("T")[0];  
};


// This async function gets the prices of gas for today and the next day, with regular, premium, and diesel prices

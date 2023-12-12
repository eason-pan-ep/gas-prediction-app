// // This is the utility file for the Prediction screen.

// This function returns a list of 5 dates starting from today.
export const getDateList = () => {
    const today = new Date();
    let output = [];
    // get 5 days starting from today
    for(let i = 0; i < 5; i++){
        let date = new Date(today);
        date.setDate(date.getDate() + i);
        output.push(date.toISOString().split("T")[0]);
    }
    return output;
};


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

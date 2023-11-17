// Purpose: Generates random dummy prediction data for testing purposes.


// This function generates a random integer between the upper and lower bounds
const generateRandomInt = (upperBound, lowerBound) => {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
};

// This function generates a random location from the location pool
export const generateRandomLocation = () => {
    const locationPool = ["Burnaby", "Vancouver", "Coquitlam", "Surrey", "Richmond", "Delta", "Langley", "Abbotsford", "Chilliwack", "Maple Ridge", "New Westminster", "North Vancouver", "Port Coquitlam", "Port Moody", "West Vancouver", "White Rock"];
    const randomIndex = generateRandomInt(0, locationPool.length - 1);
    return locationPool[randomIndex];
};


// This function generates a random prediction data, contains the date, location and the gas price prediction of 4 days
export const generateDummyPrediction = () => {
    const date = new Date();
    const randomLocation = generateRandomLocation();

    const randomPrices = [];
    for(let i = 0; i < 4; i++){
        const randomPrice = generateRandomInt(140, 299) / 100;
        randomPrices.push(randomPrice);
    }

    const predictionData = {
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        location: randomLocation,
        prices: randomPrices,
    };

    return predictionData;
};
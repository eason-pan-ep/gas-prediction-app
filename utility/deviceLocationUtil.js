// This is a utility file that will contain functions that will be used by multiple components.
// This file contains functions that parse the location object returned by the expo-location library and return the desired data.


// This function will return the latitude of the location object
export const getLatitude = (location) => {
    return location.coords.latitude;
};

// This function will return the longitude of the location object
export const getLongitude = (location) => {
    return location.coords.longitude;
};
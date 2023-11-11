// This file contains functions that calculate various values from the fueling history.
// The fueling history is an array of fueling history entries and each fueling history entry has the following structure:
// {
//   date: Date,
//   amount: Number,
//   price: Number,
//   photo: ???,
// }

export function calculateTotalAmountSpent(fuelingHistory) {
  // Function: calculateTotalAmountSpent
  // Parameters:
  // // fuelingHistory -- array of object, the fueling history
  // Returns: number, the total amount spent on fuel

  let totalAmountSpent = 0;
  for (let i = 0; i < fuelingHistory.length; i++) {
    totalAmountSpent += fuelingHistory[i].amount * fuelingHistory[i].price;
  }
  return totalAmountSpent;
}

export function calculateAverageAmountSpent(fuelingHistory) {
  // Function: calculateAverageAmountSpent
  // Parameters:
  // // fuelingHistory -- array of object, the fueling history
  // Returns: number, the average amount spent per L of fuel

  let totalAmountSpent = 0;
  let totalAmountOfFuel = 0;
  for (let i = 0; i < fuelingHistory.length; i++) {
    totalAmountSpent += fuelingHistory[i].amount * fuelingHistory[i].price;
    totalAmountOfFuel += fuelingHistory[i].amount;
  }
  return totalAmountSpent / totalAmountOfFuel;
}

export function calculateLowestPricePaid(fuelingHistory) {
  // Function: calculateLowestPricePaid
  // Parameters:
  // // fuelingHistory -- array of object, the fueling history
  // Returns: number, the lowest price paid per L of fuel

  let lowestPricePaidPerL = fuelingHistory[0].price;
  for (let i = 1; i < fuelingHistory.length; i++) {
    if (fuelingHistory[i].price < lowestPricePaidPerL) {
      lowestPricePaidPerL = fuelingHistory[i].price;
    }
  }
  return lowestPricePaidPerL;
}

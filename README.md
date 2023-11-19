# Gas Prediction App
Group project for CS5520, fall 2023.
## Team Member
Macarious Kin Fung Hui, Yuchen Pan (Eason)

## Iteration #1
### Navigation & Screens with placeholder UIs
Primary Contributor: Mcarious

### Server Side Development
Primary Contributor: Eason
#### Authentication
- Sign up
- Sign in
- Change password
#### Firestore database
CRUD operations for 3 collections in Firestore
1. userProfiles
<br>Store user profile data, contains fields:
    - email: String -- user's email
    - carMake: String -- the make of users' car
    - carModel: String -- the model of users' car
    - gasType: Number -- the type of gas for their car
    - user: String -- unique uid for an individual user
2. fuelingHistory
<br>Store users' fueling entries, contains fields:
    - city: String -- where did they fueled up their car
    - data: String -- when did they go there
    - price: Number -- the gas price when they fueled up
    - amount: Number -- the total amount of gas purchased
    - photoRef: String -- reference link of photo storage
    - user: String -- unique uid for an individual user
3. predictionData
<br>Store user requested prediction data. So the next time when user want to get prediction data, the program will check whether there is a matched data in this collection, if not get from external APIs, if yes, read from the database to save time.
<br>Contains fields:
    - date: String -- "today", the day user requested a prediction
    - location: String -- the target city for getting prediction
    - prices: Array[5] -- "today"'s gas price + prediction of the following 4 days
    - user: String -- unique uid for an individual user

### Screenshots
#### Front-end
<br>![iteration 1 screens](/ReadMeRes/Iteration_1_screens.png)

#### Back-end
<br>![iteration 1 firebase](/ReadMeRes/Iteration_1_firebase.png)


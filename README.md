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
- First write right after a user successfully signed up an account
- Users can update information in their profile while using the app
- Data in this collection contains fields:
    - email: String -- user's email
    - carMake: String -- the make of users' car
    - carModel: String -- the model of users' car
    - gasType: Number -- the type of gas for their car
    - user: String -- unique uid for an individual user
2. fuelingHistory
- Users can write (add) new entries
- Users can update entries
- Users can delete entries
- Data in this collection contains fields:
    - city: String -- where did they fueled up their car
    - data: String -- when did they go there
    - price: Number -- the gas price when they fueled up
    - amount: Number -- the total amount of gas purchased
    - photoRef: String -- reference link of photo storage
    - user: String -- unique uid for an individual user
3. predictionData
- Write data to this collection when there is a new prediction generated
- Try to find a match data when a user requests prediction in the same city at the same day multiple times
- If there is no data matches when and where the user requests a new prediction, get new prediction and write to this collection
- Users can clear all stored prediction data
- Data in this collection contains fields:
    - date: String -- "today", the day user requested a prediction
    - location: String -- the target city for getting prediction
    - prices: Array[5] -- "today"'s gas price + prediction of the following 4 days
    - user: String -- unique uid for an individual user

### Screenshots
#### Front-end
![iteration 1 screens](/ReadMeRes/Iteration_1_screens.png)

#### Back-end
![iteration 1 firebase](/ReadMeRes/Iteration_1_firebase.png)


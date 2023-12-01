# Gas Prediction App

Group project for CS5520, fall 2023.
| App Name | Octane Oracle |
| --- | --- |
| App Description | OctaneOracle is the ultimate app for smart and savvy drivers looking to take the guesswork out of filling up their gas tanks. With real-time data and powerful predictive prices, OctaneOracle helps you save money and decide when to fill your gas tank. OctaneOracle also comes with a handy expense tracker to help you manage your budget |
| Slogan | Your Fuel Future, Revealed |
| Target users | Gasoline car owners in Canada |

## Team Member
Macarious Kin Fung Hui, Yuchen Pan (Eason)

## Summary
### Iteration I - *Device Features and UI Design*
- App navigation
- Firestore databse setup with CRUD operations

### Iteration II - *Device Features and UI Design*
- Authentication
- Camera features with firestore storage
- Read, parse and store user's location data (Google Map API to be implemented in Iteration #3)
- UI design (update mock screens, to be fully implemented in Iteration 3)

## Iteration III - *Prediction Feature and Polish*
- OpenAI API & LangChain Integration
- Google Map APIs (the Near Gas Station part, and prep for later prediction use)
- Production UI integration
- Polish interactions 
- Test and compile (pack)
  
## Iteration I

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

### Frontend Development
Primary Contributor: Macarious

#### App navigation
- Implement app navigation using `NativeStackNavigator` and `BottomTabNavigator` with the following structure:
    - Application
      - Not authenticated: AuthStack (`NativeStackNavigator`)
        - Sign In screen (also used for registration)
      - Authenticated: MainStack (`BottomTabNavigato`r)
        - HomeStack (`NativeStackNavigator`)
          - Home screen
          - Prediction screen
        - FuelingHistoryStack (`NativeStackNavigator`)
          - Fueling History screen
          - Fueling Entry screen
          - Edit Fueling Entry screen
        - ProfileStack (`NativeStackNavigator`)
          - Profile screen
          - Edit Profile screen
        - Nearby Gas Stations screen

#### Page layouts
  - Create basic page layout for each screen, incorporating navigation functions and buttons
  - Some screens include dummy pressables and fields, with the understanding that UI/UX enhancements will be made in subsequent iterations
  - Create and reuse components such as pressables, input fields, static lists to ensure styling consistency and reduce repetition of code
  - Basic styling information such as colors and font sizes are saved in a separate file for reuse.
 
#### Fueling history statistics
  - Implement functions to calculate key statistics on the user's fueling history, including:
      - total amount spent
      - average amount spent
      - lowest price paid
  - These functions are displayed on the Profile page

### Screenshots from Iteration #1
#### Front-end
![iteration 1 screens](/ReadMeRes/Iteration_1_screens.png)

#### Back-end
![iteration 1 firebase](/ReadMeRes/Iteration_1_firebase.png)

## Iteration II - Device Features and UI Design
- Authentication
- Camera features with firestore storage
- Read, parse and store user's location data (Google Map API to be implemented in Iteration #3)
- UI design (update mock screens, to be fully implemented in Iteration 3)

### Server Side Development
Primary Contributor: Eason

#### Authentication
- New users can register for the application by providing necessary information
- Implement validation checks to ensure data integrity during the sign-up process
- Existing users can securely log in using their registered credentials

Registered users, shown on Firebase Authentication screen:
![image](https://github.com/eason-pan-ep/gas-prediction-app/assets/63441014/5ae3a6f1-3162-4f70-82d4-62e6d2f35fc7)

### Camera Features
1. Capture Process:
- Request camera permissions to enable photo capture
- Implement functionality to take and crop photos
2. Firebase Storage Integration:
- Implement features for uploading, downloading, and deleting photos in Firebase Storage
- Set storage rules to ensure only authorized users can access stored content
3. Fueling Entries and Editing:
- When users delete an entry, associated photos in Firebase Storage will be automatically deleted
- Removal of a photo from an entry or uploading a new photo triggers appropriate updates in Firebase Storage

Photos Reference are saved in Firestore database successfully:
![image](https://github.com/eason-pan-ep/gas-prediction-app/assets/63441014/1f3d9ece-1942-40a4-bc8c-4c40b81a5c9b)

Photos are saved in Firestore Storage successfully:
![image](https://github.com/eason-pan-ep/gas-prediction-app/assets/63441014/595320e2-f603-4efd-85f0-f491367f85c2)

### User's Location Data
- Request location permissions for accessing the device's location service
- Add button to retrieve the current location of the device
- Process the location data and display it on the Nearby Gas Stations page
- Map will be implemented in Iteration III

### Frontend Development

### UI design (mock screens update)
- Mock screens are continually updated on Figma
- Final UI design will be implemented in Iteration III

## Iteration III - Prediction Feature and Polish
- OpenAI API & LangChain Integration
- Google Map APIs (the Near Gas Station part, and prep for later prediction use)
- Production UI integration
- Polish interactions 
- Test and compile (pack)

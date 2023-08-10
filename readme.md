# Expo Project README

Welcome to our Expo project! This README provides instructions on how to clone the project repository and test the app.

## Clone the Repository

To clone the project repository, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command to clone the repository:

   ```
   git clone https://github.com/ahmad-crossplatform/expo-router-test.git
   ```

4. After running the command, the repository will be cloned to your local machine.

5. Create a `.env` file and make sure it contains the following variables

```
EXPO_PUBLIC_FIREBASE_APIKey=##YOURKEY##
EXPO_PUBLIC_FIREBASE_AUTHDomain=##YOURKEY##
EXPO_PUBLIC_FIREBASE_DatabaseURL=##YOURKEY##
EXPO_PUBLIC_FIREBASE_ProjectID=##YOURKEY##
EXPO_PUBLIC_FIREBASE_StorageBucket=##YOURKEY##
EXPO_PUBLIC_FIREBASE_MessagingSenderID=##YOURKEY##
EXPO_PUBLIC_FIREBASE_AppID=##YOURKEY##
EXPO_PUBLIC_FIREBASE_MeasurementID=##YOURKEY##

EXPO_PUBLIC_NEWS_API_KEY=##YOURKEY##
```

6. Replace `##YOURKEY` with the actual key for your APIs. Make sure to write them _WITHOUT double quotations""_ .

## Install Dependencies

Before testing the app, make sure to install the required dependencies. Follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the project directory (the directory where you cloned the repository).
3. Run the following command to install the dependencies:

   ```
   npm install
   ```

   This command will install all the necessary packages and dependencies listed in the `package.json` file.

## Test the App

Once the dependencies are installed, you can start testing the app. Here's how:

1. Make sure you have the Expo CLI installed on your machine. If not, run the following command to install it globally:

   ```
   npm install -g expo-cli
   ```

2. With the terminal or command prompt still open, navigate to the project directory.
3. Run the following command to start the development server:

   ```
   npm run start
   ```

   This will launch the Expo development server and provide a QR code in the terminal window.

4. To test the app on a physical device:

   - Download the Expo Go app from the [App Store](https://apps.apple.com/app/apple-store/id982107779) (for iOS) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (for Android).
   - Scan the QR code displayed in the terminal with your device's camera.
   - Once scanned, the Expo Go app will load the app and you can interact with it.

5. To test the app on an emulator or simulator:

   - Make sure you have an Android emulator or iOS simulator set up on your machine.
   - In the terminal, press `a` to open the app in an Android emulator or `i` to open it in an iOS simulator.

6. You should now be able to see and interact with the app on your device or emulator/simulator.

## Contributing

We welcome contributions to our project. If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make the necessary changes, commit them, and push to your forked repository.
5. Submit a pull request to the original repository, explaining the changes you made.

We appreciate any contribution and will review your pull request as soon as possible.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify it according to your needs.

If you have any questions or issues, please don't hesitate to reach out to us.

Happy coding!

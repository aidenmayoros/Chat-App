# Chat App

Welcome to the Chat App project! This repository contains the source code for a mobile application built using React Native. The app's main focus is to provide users with a chat interface along with the ability to share images and their location.

## Technologies Used

- React Native
- Expo (toolchain for building native apps in JavaScript)
- React Native Gifted Chat library
- Google Firestore DB
- Google Firebase Authentication
- AsyncStorage caching for offline use
- Firebase Cloud Storage (for storing images)
- Expo ImagePicker & MediaLibrary for communication features

## Key Features

The Chat App offers the following features:

- **User Profile Setup:** Users can set their display name and choose a background color for the chat screen before entering the chat.
- **Chat Interface:** The app displays the conversation thread, an input field, and a submit button.
- **Communication Options:** Users can send images and share location data within the chat.
- **Data Persistence:** Messages and other data are stored both online and offline, ensuring a seamless experience.

## Getting Started

Follow these steps to set up the application:

```shell
# Install Expo CLI globally
npm install -g expo-cli

# Start Expo
npm start

# Install the required dependency to fix image sending issues
npm i whatwg-fetch@3.6.2

=======
# Sync the Metro Bundler with your smartphone using Expo Go app
# or an emulator to preview the app.
```
## Database Configuration

If you want to use your own database:

1. Create a new database on [Firebase](https://firebase.google.com/) (sign up required).
2. Install Firebase:

```shell
npm i firebase
```

1. In the Firebase Console:

- Add a new project.
- Navigate to "Build" > "Firestore Database" and create a new database in production mode.
- Go to "Project Settings" > "General" > "Your apps" > web app (</>) and follow the prompts to create a Firebase web app.
- Copy the configuration code (starting with const firebaseConfig =) from the setup and replace it in App.js.

## Set up Android Studio

If you wish to use all features of the app, install the necessary libraries:

```shell
expo install expo-image-picker
expo install react-native-maps
expo install expo-location
expo install expo-media-library
```

## GitHub Repository

Explore the source code and more on our [GitHub repository](https://github.com/juli20008/chat).

Feel free to contribute, raise issues, or use the code as a reference for your own projects. Happy coding! 🚀
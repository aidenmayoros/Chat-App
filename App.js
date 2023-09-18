import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// Ignore log message
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
	const connectionStatus = useNetInfo();

	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert('Connection Lost!');
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

	const firebaseConfig = {
		apiKey: 'AIzaSyAf-kLNkH0tCcOT-FSYXlFppEBN8lWR7do',
		authDomain: 'chat-app-7d8e2.firebaseapp.com',
		projectId: 'chat-app-7d8e2',
		storageBucket: 'chat-app-7d8e2.appspot.com',
		messagingSenderId: '1002337076960',
		appId: '1:1002337076960:web:ab9d5a9adacfdd9aa63285',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);
	const storage = getStorage(app);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen name='Start' component={Start} />
				<Stack.Screen name='Chat'>
					{(props) => (
						<Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;

import { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Pressable,
	TextInput,
	ImageBackground,
} from 'react-native';

const image = '../assets/Background-image.png';

const Start = ({ navigation }) => {
	const [name, setName] = useState('');

	return (
		<ImageBackground source={require(image)} style={{ width: '100%', height: '100%' }}>
			<View style={styles.mainContainer}>
				<Text style={styles.appTitle}>App Title</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.textInput}
						value={name}
						onChangeText={setName}
						placeholder='Your Name'
					/>
					<Pressable
						style={styles.startChattingButton}
						onPress={() => navigation.navigate('Chat', { name: name })}>
						<Text style={styles.chatButtonText}>Start Chatting</Text>
					</Pressable>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
	},
	appTitle: {
		fontSize: 45,
		fontWeight: 600,
		color: '#FFFFFF',
	},
	inputContainer: {
		width: '88%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding: 15,
		marginTop: '80%',
		borderRadius: 3,
	},
	textInput: {
		width: '88%',
		padding: 15,
		borderWidth: 1,
		marginTop: 15,
		marginBottom: 15,
		borderRadius: 3,
	},
	startChattingButton: {
		backgroundColor: '#757083',
		width: '88%',
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 3,
	},
	chatButtonText: {
		fontSize: 16,
		fontWeight: 600,
		color: '#ffffff',
	},
});

export default Start;

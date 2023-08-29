import { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Pressable,
	TextInput,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';

const image = '../assets/Background-image.png';
const colors = ['rgb(9 11 8)', 'rgb(78, 93, 104)', 'rgb(153, 163, 177)', 'rgb(185 199 174)'];

const Start = ({ navigation }) => {
	const [name, setName] = useState('');
	const [selectedColor, setSelectedColor] = useState(colors[0]);

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
					<Text>Choose Background Color:</Text>
					<View style={styles.colorListContainer}>
						{colors.map((color) => {
							const fullColorButton = { ...styles.colorPicker, backgroundColor: color };
							const borderOnly = {
								...styles.colorPicker,
								borderColor: color,
								borderWidth: 6,
							};

							return color == selectedColor ? (
								<TouchableOpacity
									key={color}
									onPress={() => {
										setSelectedColor(color);
									}}
									style={fullColorButton}></TouchableOpacity>
							) : (
								<TouchableOpacity
									key={color}
									onPress={() => {
										setSelectedColor(color);
									}}
									style={borderOnly}></TouchableOpacity>
							);
						})}
					</View>
					<Pressable
						style={styles.startChattingButton}
						onPress={() => navigation.navigate('Chat', { name: name, color: selectedColor })}>
						<Text style={styles.chatButtonText}>Start Chatting</Text>
					</Pressable>
				</View>
			</View>
		</ImageBackground>
	);
};
// return (
// 	<TouchableOpacity
// 		key={color}
// 		onPress={() => {
// 			setSelectedColor(color);
// 		}}
// 		style={selectedColorStyles}></TouchableOpacity>
// );
const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
	},
	appTitle: {
		fontSize: 45,
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
	colorListContainer: {
		flexDirection: 'row',
		padding: 20,
	},
	colorPicker: {
		width: 40,
		height: 40,
		padding: 10,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 20,
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
		color: '#ffffff',
	},
});

export default Start;

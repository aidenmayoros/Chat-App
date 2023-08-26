import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
	const { name } = route.params;
	const { color } = route.params;
	const dynamicStyledBackground = { ...styles.container, backgroundColor: color };

	useEffect(() => {
		navigation.setOptions({ title: name });
	}, []);

	return (
		<View style={dynamicStyledBackground}>
			<Text style={{ color: 'white' }}>Chat screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Chat;

import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
	const { name } = route.params;
	const { color } = route.params;
	const dynamicStyledBackground = { ...styles.container, backgroundColor: color };

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		navigation.setOptions({ title: name });
		setMessages([
			{
				_id: 1,
				text: 'Hello developer',
				createdAt: new Date(),
				user: {
					_id: 2,
					name: 'React Native',
					avatar: 'https://placeimg.com/140/140/any',
				},
			},
			{
				_id: 2,
				text: 'test -- This is a system message',
				createdAt: new Date(),
				system: true,
			},
		]);
	}, []);

	const onSend = (newMessages) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#000',
					},
					left: {
						backgroundColor: '#FFF',
					},
				}}
			/>
		);
	};

	return (
		<View style={dynamicStyledBackground}>
			<GiftedChat
				textInputStyle={styles.chatInput}
				messages={messages}
				renderBubble={renderBubble}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: 1,
				}}
			/>
			{Platform.OS === 'android' || Platform.OS === 'ios' ? (
				<KeyboardAvoidingView behavior='height' />
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	chatInput: {
		padding: 10,
	},
});

export default Chat;

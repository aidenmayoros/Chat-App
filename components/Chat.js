import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, storage, route, navigation, isConnected }) => {
	const { name } = route.params;
	const { color } = route.params;
	const { userID } = route.params;
	const dynamicStyledBackground = { ...styles.container, backgroundColor: color };
	const [messages, setMessages] = useState([]);

	let unsubMessages;

	useEffect(() => {
		navigation.setOptions({ title: name });

		if (isConnected === true) {
			if (unsubMessages) unsubMessages();
			unsubMessages = null;

			const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
			unsubMessages = onSnapshot(q, (docs) => {
				let newMessages = [];
				docs.forEach((doc) => {
					newMessages.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else loadCachedMessages();

		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, [isConnected]);

	const loadCachedMessages = async () => {
		const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
		setMessages(JSON.parse(cachedMessages));
	};

	const cacheMessages = async (messagesToCache) => {
		try {
			await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
		} catch (error) {
			console.log(error.message);
		}
	};

	const onSend = async (newMessages) => {
		addDoc(collection(db, 'messages'), newMessages[0]);
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

	const renderInputToolbar = (props) => {
		if (isConnected === true) return <InputToolbar {...props} />;
		else return null;
	};

	const renderCustomActions = (props) => {
		return <CustomActions storage={storage} userID={userID} {...props} />;
	};

	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	return (
		<View style={dynamicStyledBackground}>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				onSend={(messages) => onSend(messages)}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				user={{
					_id: userID,
					name,
				}}
			/>
			{Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
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

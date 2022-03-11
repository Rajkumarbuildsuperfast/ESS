import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	StyleSheet, ImageBackground, SafeAreaView, Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';


const SplashScreen = ({ navigation }) => {
	const [animating, setAnimating] = useState(true);
	var deviceJSON = {};
	deviceJSON.uniqueId = DeviceInfo.getUniqueId();
	deviceJSON.model = DeviceInfo.getModel();
	AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceJSON));
	console.log(deviceJSON, 'deviceset');

	useEffect(() => {
		console.log('login')
		setTimeout(() => {
			setAnimating(false);
			AsyncStorage.getItem('user_id').then((value) =>
				navigation.replace(
					// value === null ? 'Auth' : 'LoginScreen',
					value === null ? 'Auth' : 'DrawerNavigationRoutes'
				),

			);
		}, 5000);
	}, []);

	return (
		<ImageBackground
			style={{ flex: 1 }}
			source={{ uri: 'asset:/images/spalshscreen1280x2320.gif' }
			}>

			<SafeAreaView>
				<View style={styles.container}>
					<Text>Welcome To SplashScreen</Text>
				</View>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#307ecc',
	},
	activityIndicator: {
		alignItems: 'center',
		height: 80,
	},
});









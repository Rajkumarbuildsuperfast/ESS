
import React, { useState, createRef, useEffect } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	Text,
	ScrollView,
	Keyboard,
	TouchableOpacity,
	KeyboardAvoidingView,
	ToastAndroid,
	Image,
	ImageBackground
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import InternetBar from '../../Components/internetConnector';
import { LoginRequest } from '../../../service/api/apiservice';

const LoginScreen = props => {

	const [UserName, setUserName] = useState('');
	const [Password, setUserPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errortext, setErrortext] = useState('');
	const passwordInputRef = createRef();
	const [data, setData] = useState([]);


	useEffect(() => {

		retrieveData();
	}, [data]);

	const retrieveData = async () => {
		try {
			const valueString = await AsyncStorage.getItem('clientId');
			const value = JSON.parse(valueString);
			setData(value);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitButton = async ({ navigation }) => {
		setErrortext('');
		if (!UserName) {
			alert('Please fill Username');
			return;
		}
		if (!Password) {
			alert('Please fill Password');
			return;
		}
		setLoading(true);

		let dataToSend = {
			Username: UserName,
			Password: Password,
			ClientId: '14022',			// ClientId: '1009',
			ModuleType: '15',
			ProjectId: '1',
		};

		console.log(dataToSend, 'chinna')
		try {
			console.log("datatosend==>", dataToSend)
			let response = await LoginRequest(dataToSend)
			console.log("value===>", response)
			const data = await response.json();
			if (data.Status === 'valid') {
				let ClientId = await AsyncStorage.getItem('clientId');
				let UserId = await AsyncStorage.getItem('userId');
				let dataToSend = {
					UserId: UserId,
					ClientId: ClientId,
				};
				ToastAndroid.show('Login sucessfully!', ToastAndroid.SHORT);
				props.navigation.navigate('DrawerNavigationRoutes');
				AsyncStorage.setItem('userId', data.userId);

			} else if (data.Status === 'invalid') {
				ToastAndroid.show('invalid data!', ToastAndroid.SHORT);
			}
		} catch (error) {
			ToastAndroid.show(error, ToastAndroid.SHORT);
			console.log('Error happened here!');
			console.log(error);
		}

	};
	return (
		<ImageBackground source={{ uri: 'asset:/images/login.png'}} resizeMode="cover" style={styles.image}>
	
	
		<View style={[styles.container, {
			// Try setting `flexDirection` to `"row"`.
			flexDirection: "column"
		}]}>
			<InternetBar />




			{/* <View style={{ flex: 1, backgroundColor: "#0057ad", borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }} >
				<View style={styles.viewlogo}>
					<Image
						source={{ uri: 'asset:/images/teamwork.png' }}
						style={styles.logo}
					/>
					<Text style={styles.logoText}>Management</Text>
				</View>
			</View> */}
			<View style={styles.mainBody}>

				<ScrollView
					keyboardShouldPersistTaps="handled"
					// eslint-disable-next-line react-native/no-inline-styles
					contentContainerStyle={{
						justifyContent: 'center',
						alignContent: 'center',
					}}>
					<View style={{ alignItems: 'center', marginTop: '1%', }}>
						<Text style={styles.text}>Login</Text>
					</View>
					<View>
						<KeyboardAvoidingView enabled>
							<View style={{ alignItems: 'center' }}></View>
							<View style={styles.SectionStyle}>
								<TextInput
									style={styles.inputStyle}
									onChangeText={UserName => setUserName(UserName)}
									placeholder="Enter UserName" //dummy@abc.com
									placeholderTextColor="#03509c"
									autoCapitalize="none"
									keyboardType="default"
									returnKeyType="next"
									onSubmitEditing={() =>
										passwordInputRef.current && passwordInputRef.current.focus()
									}
									underlineColorAndroid="#f000"
									blurOnSubmit={false}
								/>
							</View>
							<View style={styles.SectionStyle}>
								<TextInput
									style={styles.inputStyle}
									onChangeText={Password => setUserPassword(Password)}
									placeholder="Enter Password" //12345
									placeholderTextColor="#03509c"
									keyboardType="default"
									ref={passwordInputRef}
									onSubmitEditing={Keyboard.dismiss}
									blurOnSubmit={false}
									secureTextEntry={true}
									underlineColorAndroid="#f000"
									returnKeyType="next"
								/>
							</View>
							{errortext != '' ? (
								<Text style={styles.errorTextStyle}>{errortext}</Text>
							) : null}
							<TouchableOpacity
								style={styles.buttonStyle}
								activeOpacity={0.5}
								onPress={handleSubmitButton}>
								<Text style={styles.buttonTextStyle}>LOGIN</Text>
							</TouchableOpacity>
						</KeyboardAvoidingView>
					</View>
				</ScrollView>
			</View>
		</View>

		</ImageBackground>
	);
};
export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	mainBody: {
		flex: 2,
		justifyContent: 'center',
		backgroundColor: '#ffff',
		alignContent: 'center',
	},
	logo: {
		width: 100,
		height: 100,

	},
	viewlogo: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 'auto',
		marginTop: '10%',
	},
	logoText: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 25,
	},
	text: {
		color: '#03509c',
		paddingVertical: 10,
		fontSize: 30,
		marginTop: '1%',

	},
	SectionStyle: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
		marginLeft: 35,
		marginRight: 35,
		margin: 10,
	},
	buttonStyle: {
		// backgroundColor: '#002b80',
		backgroundColor: '#d6471c',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 50,
		alignItems: 'center',
		// borderRadius: 30,
		marginLeft: 35,
		marginRight: 35,
		marginTop: '10%',
		marginBottom: 20,
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 20,
	},
	inputStyle: {
		flex: 1,
		color: '#03509c',
		paddingLeft: 15,
		paddingRight: 15,
		borderBottomWidth: 3,
		// borderRadius: 25,
		fontSize: 18,
		borderColor: '#dadae8',
	},
	registerTextStyle: {
		color: '#FFFFFF',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 14,
		alignSelf: 'center',
		padding: 10,
	},
	errorTextStyle: {
		color: 'red',
		textAlign: 'center',
		fontSize: 14,
	},
});

import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Image,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader';
import InternetBar from '../../Components/internetConnector';
import { RegisterRequest } from '../../../service/api/apiservice';
// import localStorage from '.react-native';

const RegisterScreen = (props) => {
    const [ClientName, setClientName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    // // const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const clientInputRef = createRef();
    const usernameInputRef = createRef();
    const mobileInputRef = createRef();



    const handleSubmitButton = async () => {
        setErrortext('');
        if (!ClientName) {
            alert('Please fill ClientName');
            return;
        }
        if (Mobile.length < 10) {
            alert('Please fill MobileNumber');
            return;
        }
        if (!UserName) {
            alert('Please fill UserName');
            return;
        }


        const device = await AsyncStorage.getItem('deviceDetails');
        var deviceData = JSON.parse(device)
        //Show Loader
        setLoading(true);
        try {

            var data = {

                ClientName: ClientName,
                Username: UserName,
                Mobile: Mobile,
                DeviceId: deviceData.uniqueId,
                DeviceName: deviceData.model,
                // DeviceId: '4cf17744089fa086',
                // DeviceName: 'Android SDK built for x86',
                ModuleType: '15',
                ProjectId: '1',

                
            };
            console.log(data, 'rese');
            let response = await RegisterRequest(data)
            const datas = await response.json();
            
            console.log(datas, 'dataaction');

            if (datas.Action === 'Approved') {
                AsyncStorage.setItem('clientId', datas.ClientId);
                AsyncStorage.setItem('user_id', datas.Action);
                ToastAndroid.show('successfully Register!', ToastAndroid.SHORT);
                props.navigation.navigate('LoginScreen',);
            }
            else if (datas.Action === 'Pending') {
                ToastAndroid.show('Please wait Your request is Pending!', ToastAndroid.SHORT);
                // props.navigation.navigate('DrawerNavigationRoutes');
            } else if (datas.Action === 'NotValid') {
                ToastAndroid.show('Invalid Data !', ToastAndroid.SHORT);
            }

        } catch (error) {
            console.log('Error happened here!');
            console.error(error);
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

            <View style={{ flex: 2, backgroundColor: '#ffffff' }}>

                <Loader loading={loading} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    // eslint-disable-next-line react-native/no-inline-styles
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <View style={{ alignItems: 'center', marginTop: '1%', }}>
                        <Text style={styles.text}>Register</Text>
                    </View>
                    <KeyboardAvoidingView>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={ClientName => setClientName(ClientName)}
                                underlineColorAndroid="#f000"
                                placeholder="Enter ClientName"
                                placeholderTextColor="#03509c"
                                autoCapitalize="sentences"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    usernameInputRef.current && usernameInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={Mobile => setMobile(Mobile)}
                                underlineColorAndroid="#f000"
                                placeholder="Enter Your Mobile number"
                                placeholderTextColor="#03509c"
                                ref={mobileInputRef}
                                keyboardType="numeric"
                                minLength={10}
                                maxLength={10}
                                returnKeyType="next"
                                secureTextEntry={false}
                                onSubmitEditing={() =>
                                    mobileInputRef.current && mobileInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={UserName => setUserName(UserName)}
                                underlineColorAndroid="#f000"
                                placeholder="Enter UserName"
                                placeholderTextColor="#03509c"
                                ref={usernameInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    usernameInputRef.current && usernameInputRef.current.focus()
                                }
                                blurOnSubmit={false}
                            />
                        </View>
                        

                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>{errortext}</Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitButton}>
                            <Text style={styles.buttonTextStyle}>REGISTER</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>

        </View>
	</ImageBackground>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

      image: {
        flex: 1,
        justifyContent: "center"
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
    view: {
        height: 70,
        width: "100%",
        backgroundColor: 'blue',
        borderBottomRightRadius: 25,
        flex: 1,

    },
    logoText: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 25,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 60,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
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
    text: {
        color: '#03509c',
        paddingVertical: 10,
        fontSize: 30,
        marginTop: '2%',
        marginLeft: '1%',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },

   
});

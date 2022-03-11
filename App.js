import 'react-native-gesture-handler';

// Import React
import React, { useEffect } from 'react';
import { BackHandler, Alert, Button, TouchableOpacity, PermissionsAndroid } from 'react-native';
// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import Screens
import SplashScreen from './src/Screen/DrawerScreens/Auth/SplashScreen';
import RegisterScreen from './src/Screen/DrawerScreens/Auth/RegisterScreen';
import LoginScreen from './src/Screen/DrawerScreens/Auth/LoginScreen';
import DashboardScreen from './src/Screen/DrawerScreens/DashboardScreen';
import DrawerNavigationRoutes from './src/Screen/DrawerNavigationRoutes';
import AccountPayableScreen from './src/Screen/DrawerScreens/AccountPayble/AccountPayableScreen';
import AccountReceivableScreen from './src/Screen/DrawerScreens/AccountRecievable/AccountReceivableScreen';
import PayableDetailsScreen from './src/Screen/DrawerScreens/AccountPayble/PayableDetailsScreen';
import ReceivableDetailsScreen from './src/Screen/DrawerScreens/AccountRecievable/ReceivableDetailsScreen';
import BankDetailsScreen from './src/Screen/DrawerScreens/BankDetails/BankDetailsScreen';
import PendingListScreen from './src/Screen/DrawerScreens/PendingListScreen/PendingListScreen';
import Permission  from './src/Screen/DrawerScreens/PendingListScreen/Permission';
import LeaveRequestRegister from './src/Screen/DrawerScreens/PendingListScreen/LeaveRequestRegister';
import RequestEntry from './src/Screen/DrawerScreens/PendingListScreen/RequestEntry';
import PreviewComponent from './src/Screen/Components/PreviewComponent';
import { Icon } from 'react-native-elements/dist/icons/Icon';
const Stack = createStackNavigator();
const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="RegisterScreen">
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PreviewComponent"
                component={PreviewComponent}
                options={{
                    headerShown: true,
                    // headerLeft: (
                    //     <TouchableWithoutFeedback
                    //         onPress={() => navigation.goBack()} >
                    //         <Icon name="md-arrow-round-back" size={16} color="#000" />
                    //     </TouchableWithoutFeedback>
                    // )
                }}

            />
            <Stack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
                options={{
                    headerShow: false,
                    title: 'Dashboard', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                    headerRight: () => (
                        <Button
                            onPress={() => alert('This is a button!')}
                            title="Info"
                            color="#fff"
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
};


const App = (Props) => {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigationRoutes"
                    component={DrawerNavigationRoutes}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="AccountPayableScreen"
                    component={AccountPayableScreen}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="AccountReceivableScreen"
                    component={AccountReceivableScreen}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="PayableDetailsScreen"
                    component={PayableDetailsScreen}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />

               
                <Stack.Screen
                    name="LeaveRequestRegister"
                    component={LeaveRequestRegister}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        title: 'Leave Request Register',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="ReceivableDetailsScreen"
                    component={ReceivableDetailsScreen}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="BankDetailsScreen"
                    component={BankDetailsScreen}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="PendingListScreen"
                    component={PendingListScreen}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="Permission"
                    component={Permission}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        title: 'Permission',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                       <Stack.Screen
                    name="RequestEntry"
                    component={RequestEntry}
                    options={{
                        headerShown: true, headerStyle: {
                            backgroundColor: '#040485',
                        },
                        title: 'RequestEntry',
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
console.disableYellowBox = true;

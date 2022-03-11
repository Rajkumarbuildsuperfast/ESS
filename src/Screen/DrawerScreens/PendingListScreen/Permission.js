import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Button, Image, TextInput, SafeAreaView, ScrollView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';
import { color } from 'react-native-elements/dist/helpers';
import InternetBar from '../../Components/internetConnector';
import { ReceivableRequest } from '../../../service/api/apiservice';
import Loader from '../../Components/Loader';
import DatePicker from 'react-native-datepicker';
import DatePicker1 from 'react-native-date-picker'


const Permission = (props) => {
    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState('');
    const [date1, setDate1] = useState(new Date());
    const [open, setOpen] = useState(false);



    state = {
        choosenIndex: 0
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    //     setLoading(true)
    //     retrieveData();
    // }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        setLoading(true)
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        setDate(date);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <InternetBar />
                    <View style={styles.row1}>



                        <View style={styles.row1}>
                            <View style={styles.Flatlistview}>
                                <View style={styles.inputContainer2}>
                                    <Text style={styles.textStyle}>Ref Date</Text>

                                </View>
                                <View style={styles.inputContainer2}>
                                    <Text style={styles.textStyle}>To Date</Text>
                                    <DatePicker
                                        style={styles.datePickerStyle}
                                        date={date} // Initial date from state
                                        mode="date" // The enum of date, datetime and time
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate={new Date(Date.now() + (10 * 60 * 1000))}
                                        //   maxDate="01-01-2019"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                //display: 'none',
                                                position: 'absolute',
                                                right: 0,
                                                top: 4,
                                                marginLeft: 0,
                                            },
                                            dateInput: {
                                                marginLeft: 0,
                                                borderWidth: 1,
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                paddingTop: 6,
                                            },
                                        }}
                                        onDateChange={(date) => {
                                            setDate(date);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.row1}>
                            <View style={styles.Flatlistview}>
                                <View style={styles.inputContainer2}>
                                    <Text style={styles.textStyle}>CompanyV No </Text>
                                </View>
                                <View style={styles.inputContainer2}>
                                    <TextInput
                                        style={styles.textInput}
                                        maxLength={20}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.row1}>
                            <View style={styles.Flatlistview}>
                                <View style={styles.inputContainer2}>
                                    <Text style={styles.textStyle}>Ref No </Text>
                                </View>
                                <View style={styles.inputContainer2}>
                                    <TextInput
                                        style={styles.textInput}
                                        maxLength={20}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.row1}>
                            <View style={styles.Flatlistview}>
                                <View style={styles.inputContainer2}>
                                    <Text style={styles.textStyle}>Permission Date</Text>
                                </View>
                                <View style={styles.inputContainer2}>
                                    <DatePicker
                                        style={styles.datePickerStyle}
                                        date={date} // Initial date from state
                                        mode="date" // The enum of date, datetime and time
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate={new Date(Date.now() + (10 * 60 * 1000))}
                                        //   maxDate="01-01-2019"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                //display: 'none',
                                                position: 'absolute',
                                                right: 0,
                                                top: 4,
                                                marginLeft: 0,
                                            },
                                            dateInput: {
                                                marginLeft: 0,
                                                borderWidth: 1,
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                paddingTop: 6,
                                            },
                                        }}
                                        onDateChange={(date) => {
                                            setDate(date);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.row1}>
                            <View style={styles.Flatlistview}>
                                <View style={styles.inputContainer2}>

                                    <Text style={styles.textStyle}>From</Text>
                                    <TouchableOpacity onPress={() => setOpen(true)} >
                                    <Text style={styles.textInput}> </Text>
                                    {/* <Text style={styles.textInput}>{date1.length !=0 ? date1 : 'select date' }</Text> */}
                                   </TouchableOpacity>
                                    <DatePicker1
                                        mode="time"
                                        modal
                                        open={open}
                                        date={date1}
                                        onConfirm={(date1) => {
                                            setOpen(false)
                                            setDate1(date1)
                                            console.log(date1, 'lastselect');
                                        }}
                                        onCancel={() => {
                                            setOpen(false)
                                        }}
                                    />
                                </View>

                                <View style={styles.inputContainer2}>
                                    <Text style={styles.textStyle}>To</Text>
                                    <TouchableOpacity onPress={() => setOpen(true)} >
                                        <Text style={styles.textInput} > HII</Text>
                                    
                                    </TouchableOpacity>
                                    <DatePicker1
                                        mode="time"
                                        modal
                                        open={open}
                                        date={date1}
                                        onConfirm={(date1) => {
                                            setOpen(false)
                                            setDate1(date1)
                                        }}
                                        onCancel={() => {
                                            setOpen(false)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.textStyle}>Reason </Text>
                            <TextInput
                                style={styles.textInput}
                                maxLength={100}
                            />
                        </View>
                        <View style={styles.inputContainerbtn1}>
                            <Pressable style={styles.button} >
                                <Text style={styles.text}>Request</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Permission;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        backgroundColor: '#cad4e8',
        width: '96%',
        margin: '2%',
    },
    row1: {

        marginTop: 2,

        flexDirection: "row",
        flexWrap: "wrap",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: '#fff',
        PaddingBottom: 10,
    },

    row2: {

        marginTop: 2,
        flexDirection: "row",
        flexWrap: "wrap",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,

    },
    datePickerStyle: {
        width: '100%',
        padding: 5,
        borderWidth: 0,
    },
    itemTitle: {
        color: 'white',
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        paddingTop: 1,
        width: "98%",
        margin: 1,
        padding: 1,
        marginLeft: '2%',
        // backgroundColor: 'red',

    },
    inputContainer2: {
        paddingTop: 1,
        width: "49%",
        margin: 1,
        padding: 1,
        // marginLeft: '2%',
        //  backgroundColor: 'red',

    },
    inputContainerbtn: {
        paddingTop: 5,
        width: "49%",
        padding: 5,

    },
    inputContainerbtn1: {
        paddingTop: 5,
        width: "60%",
        marginLeft: '20%',
        padding: 5,

    },
    textInput: {

        height: 40,
        fontSize: 18,
        borderColor: 'grey',
        borderWidth: 1,
        margin: 5,
    },
    textStyle: {

        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    pickerStyle: {
        height: 150,
        width: "80%",
        color: '#344953',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        marginTop: 1,
        marginLeft: 0,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ea4c89',
        borderRadius: 25,
        margin: '3%',
    },
    button1:
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#ea4c89',
        marginTop: 12,
        width: 120,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#ffff',
    },
    Flatlistview1:
    {
        margin: 0,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between',
        padding: 0,
    },
    itemTitle1: {
        color: 'red',
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    btnContainer1: {
        flexDirection: 'row',
        backgroundColor: '#0e3c7d',
        marginRight: 0,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        borderRadius: 5,
    },
    Flatlistview:
    {
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },

})
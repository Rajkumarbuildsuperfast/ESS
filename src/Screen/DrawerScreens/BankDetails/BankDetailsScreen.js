

import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AsyncStorage from '@react-native-community/async-storage';
import { BankDetailsRequest } from '../../../service/api/apiservice';
import { parse } from '@babel/core';
const BankDetailsScreen = (props) => {

    const CompanyId = props.route.params.CompanyId;
    console.log(CompanyId, 'bankDetails');

    const [customSelectedIndex, setCustomSelectedIndex] = useState(0);
    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [data, setData] = useState([]);
    const [Count, setCount] = useState('');
    const [cashcount, setcashcount] = useState('');
    // const [selectedIndex, setselectedIndex] = useState('0')

    useFocusEffect(
        React.useCallback(async () => {
            try {
                const valueString = await AsyncStorage.getItem('clientId');
                setClientId(valueString);
                const userid = await AsyncStorage.getItem('userId');
                setUserId(userid);
                console.log(valueString, 'value');

                let data = {
                    ClientId: ClientId,
                    UserId: UserId,
                    CompanyId: CompanyId,
                };
                async function fetchData() {
                    const response = await BankDetailsRequest(data)
                    console.log(data, 'params');
                    const datas = await response.json();
                    setlistItems(datas);
                    console.log(datas, 'data');
                    const chinna = datas;
                    console.log(chinna, '56');
                    var sum = 0;
                    var totalcash = 0;
                    for (let i = 0; i < datas.length; i++) {
                        // const Balance = datas[i].Balance;
                        if (datas[i].Type == 'Bank') {
                            const BankBalance = datas[i].Balance;
                            const sumdata = parseFloat(datas[i].Balance);
                            sum += sumdata;
                            setCount(sum.toFixed(2));
                            console.log(sumdata, 'total');
                        } else if (datas[i].Type == 'Cash') {
                            const sumCash = parseFloat(datas[i].Balance);
                            totalcash += sumCash;
                            setcashcount(totalcash.toFixed(2));
                        }
                        var Balance = parseFloat(datas[i].Balance);
                        var currencyformat = Balance.toLocaleString('en-IN');
                        datas[i].Balance = currencyformat;
                        setlistItems(datas);
                        setData(datas);
                        const type = datas[i].Type;
                    }
                }
                fetchData();

            } catch (error) {
                console.log(error);
            }
        }, [ClientId, UserId]));

    const updateCustomSegment = (event) => {
        setCustomSelectedIndex(event);
        console.log(event, 'hiii')
    };

    return (
        <SafeAreaView style={styles.MainContainer}>

            <View style={styles.MainContainer}>
                <SegmentedControlTab
                    borderRadius={0}
                    values={['Bank', 'Cash']}
                    selectedIndex={customSelectedIndex}
                    onTabPress={updateCustomSegment}
                    tabsContainerStyle={{
                        height: 45,
                        backgroundColor: '#bfd0e3'
                    }}
                    tabStyle={{
                        backgroundColor: '#bfd0e3',
                        borderWidth: 0,
                        borderColor: 'transparent',
                    }}
                    activeTabStyle={{ backgroundColor: '#040485', marginTop: 2 }}
                    tabTextStyle={{ color: '#040485', fontWeight: 'bold', fontSize: 16 }}
                    activeTabTextStyle={{ color: '#fff', fontSize: 16 }}
                />
                {customSelectedIndex === 0 && (
                    <View style={styles.container}>
                        <View style={styles.centeredView}>
                            <View style={styles.searchview}>
                                <FlatList style={styles.flatlist}
                                    data={listItems}
                                    keyExtractor={item => item.CashBankName}
                                    renderItem={({ item }) => {
                                        if (item.Type == "Bank") {
                                            return <View style={styles.touch}>
                                                <TouchableOpacity >
                                                    <Text style={styles.itemTitle}>{item.CashBankName}</Text>
                                                    <Text style={styles.itemTitle}>₹ {item.Balance} </Text>
                                                </TouchableOpacity>
                                            </View>

                                        }
                                    }}
                                />
                                <View style={styles.total}>
                                    <Text style={styles.itemTitle}>Total: ₹ {Count}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                {customSelectedIndex === 1 && (
                    <View style={styles.container}>
                        <View style={styles.searchview}>
                            <FlatList style={styles.flatlist}
                                data={listItems}
                                keyExtractor={item => item.CashBankName}
                                renderItem={({ item }) => {
                                    if (item.Type == "Cash") {
                                        return <View style={styles.touch}><TouchableOpacity  >
                                            <Text style={styles.itemTitle}>{item.CashBankName}</Text>
                                            <Text style={styles.itemTitle}> ₹ {item.Balance} </Text>
                                        </TouchableOpacity>
                                        </View>
                                    }
                                }}

                            />
                            <View>
                                <View style={cashcount < 0 ? styles.negative : styles.total}>
                                    <Text style={styles.itemTitle}>Total: ₹ {cashcount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>

        </SafeAreaView>
    );
};

export default BankDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
        width: '100%'
    },
    centeredView:
    {
        flex: 2,
    },
    titleText: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        padding: 8,
    },
    itemTitle: {
        color: '#0a3d8f',
        innerHeight: 100,
        height: 50,
        fontWeight: 'bold',
        fontSize: 19,
    },
    tabTextStyle: {
        padding: 20,
        color: '#000',
        fontSize: 18,
    },
    flatlist: {
        width: '100%',
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 10,
    },
    divider: {
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 20

    },
    searchview: {
        flex: 0,
        marginTop: 22,
        width: '100%',
    },

    touch: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: 2,
        marginBottom: 2,
        padding: 2,
        justifyContent: 'flex-start',
        borderLeftWidth: 4,
        borderLeftColor: "#03509c",
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#cad4e8',
        borderRightColor: '#cad4e8',
        borderBottomColor: '#cad4e8',
        fontSize: 24,
        fontWeight: 'bold',
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    total: {
        backgroundColor: '#FFF',
        borderColor: 'blue',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingTop: '5%',
    },
    negative: {
        backgroundColor: '#FFF',
        borderColor: 'blue',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingTop: '5%',
        color: 'red',
        itemTitle: {
            color: 'red'
        }
    }
});
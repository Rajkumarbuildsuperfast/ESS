import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';
import InternetBar from '../../Components/internetConnector';
import { PayableRequest } from '../../../service/api/apiservice'
import Loader from '../../Components/Loader';
const AccountPayable = (props) => {

    // const { CompanyId } = params;
    const CompanyId = props.route.params?.CompanyId;
    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        setLoading(true)
        retrieveData();
    }, [UserId, ClientId]);

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);

            let data = {
                ClientId: ClientId,
                UserId: UserId,
                CompanyId: CompanyId,
            }
            let response = await PayableRequest(data)
            const datas = await response.json();
            for (let i = 0; i < datas.length; i++) {
                var payable = parseFloat(datas[i].Payable);
                var currencyformat = payable.toLocaleString('en-IN', { minimumFractionDigits: 2 });
                datas[i].Payable = currencyformat;
                setlistItems(datas);
                setData(datas);
            }


        } catch (error) {
            console.log(error);
        }

    }

    const onChangeSearch = (query) => {
        if (query) {
            const newData = listItems.filter(
                function (item) {
                    const itemData = item.SubLedgerName
                        ? item.SubLedgerName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = query.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                }
            );
            setData(newData);
            setSearch(query);
        } else {
            setData(listItems);
            setSearch(query);
        }
    };
    console.log(data, 'res')
    return (

        <>
            <Loader loading={loading} />
            <View style={styles.container}>
                <InternetBar />
                <View style={styles.centeredView}>
                    <View style={styles.searchview}>
                        <Searchbar style={styles.modalView}
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={search}
                        />
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            // eslint-disable-next-line react-native/no-inline-styles
                            contentContainerStyle={{
                                justifyContent: 'center',
                                alignContent: 'center',
                            }}>
                            <FlatList style={styles.flatlist}
                                data={data.slice(0, 15)}
                                keyExtractor={item => item.CompanyId}
                                renderItem={({ item }) => {
                                    return <TouchableOpacity style={[styles.touch, styles.elevation]} onPress={() => { item ? props.navigation.navigate('PayableDetailsScreen', { SubLedgerId: item.SubLedgerId, CompanyId: CompanyId }) : console.log(rec) }}>
                                        <Text style={styles.itemTitle}>{item.SubLedgerName}</Text>
                                        {/* <Text style={styles.itemTitle1}> ₹ {item.Payable}</Text> */}
                                        <View style={styles.border}></View>
                                        <View style={styles.Flatlistview}>
                                            <Text style={styles.itemTitle1}> ₹ {item.Payable}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }}
                            />
                            <View>
                                <Text style={styles.filteEmpty}>{data.length == 0 ? 'No Data Found' : null}</Text>
                            </View>
                        </ScrollView>
                    </View>

                </View>
            </View>

        </>
    );
}


export default AccountPayable;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#EAEDED',
    },
    list: {
        flex: 0,
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        padding: 5,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    searchview: {
        flex: 0,
        marginTop: 22,
    },
    border:
    {
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '5%',
        marginBottom: 5
    },

    Flatlistview:
    {
        flexDirection: 'row',
        margin: 0,

    },
    touch: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: '1%',
        marginBottom: 2,
        padding: 5,
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
    shadowProp: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    itemTitle: {
        color: '#0a3d8f',
        innerHeight: 100,
        height: 50,
        fontWeight: 'bold',
        fontSize: 19,
    },
    flatlist: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: 'blue',
        marginBottom: 10,
    },
    itemTitle1: {
        color: 'black',
        // innerHeight: 30,
        height: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    centeredView:
    {
        flex: 2,
    },
    filteEmpty: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    }

})
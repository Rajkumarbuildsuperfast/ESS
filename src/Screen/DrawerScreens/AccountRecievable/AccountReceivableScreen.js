import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';
import { color } from 'react-native-elements/dist/helpers';
import InternetBar from '../../Components/internetConnector';
import { ReceivableRequest } from '../../../service/api/apiservice';
import Loader from '../../Components/Loader';



const AccountReceivableScreen = (props) => {

    const CompanyId = props.route.params.CompanyId;
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
    }, []);

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
            let data = {
                ClientId: valueString,
                UserId: userid,
                CompanyId: CompanyId,
            };

            const response = await ReceivableRequest(data)
            const datas = await response.json();
            for (let i = 0; i < datas.length; i++) {
                var Receivable = parseFloat(datas[i].Receivable);
                var currencyformat = Receivable.toLocaleString('en-IN', { minimumFractionDigits: 2 });
                datas[i].Receivable = currencyformat;
                setlistItems(datas);
                setData(datas);
            };
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

    return (
        <>
            {/* <View>
                <Text>preview post with id {CompanyId}</Text>
            </View> */}
            <View style={styles.container}>
                <InternetBar />
                <View style={styles.centeredView}>
                    <View style={styles.searchview}>
                        <Searchbar style={styles.modalView}
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={search}
                        />
                        <FlatList style={styles.flatlist}
                            data={data}
                            keyExtractor={item => item.CompanyId}
                            renderItem={({ item }) => {
                                return <TouchableOpacity style={styles.touch} onPress={() => { item ? props.navigation.navigate('ReceivableDetailsScreen', { SubLedgerId: item.SubLedgerId, CompanyId: CompanyId }) : console.log(rec) }}>
                                    <Text style={styles.itemTitle}>{item.SubLedgerName}</Text>
                                    <Text style={styles.itemTitle1}> ₹ {item.Receivable}</Text>
                                </TouchableOpacity>
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.filteEmpty}>{data.length == 0 ? 'No Data Found' : null}</Text>
                    </View>
                </View>
            </View>

        </>
    );
}


export default AccountReceivableScreen;

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
    touch: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: '1%',
        marginBottom: 5,
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
        marginBottom: 5,
    },
    searchview: {
        flex: 0,
        marginTop: 22,
    },
    itemTitle: {
        color: '#0a3d8f',
        height: 50,
        fontWeight: 'bold',
        fontSize: 18,
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
        fontSize: 18,
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
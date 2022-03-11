import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';
import Loader from '../../Components/Loader';
import { ReceivableDetailsRequest } from '../../../service/api/apiservice';

const ReceivableDetailsScreen = (props) => {
    // const { SubLedgerId } = params;
    // const { CompanyId } = params;
    const CompanyId = props.route.params.CompanyId;
    const SubLedgerId = props.route.params.SubLedgerId;
    const [ClientId, setClientId] = useState('');
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
    }, [ClientId]);

    const retrieveData = async () => {
        const valueString = await AsyncStorage.getItem('clientId');
        setClientId(valueString);

        let data = {
            ClientId: ClientId,
            CompanyId: CompanyId,
            SubLedgerId: SubLedgerId
        };
        const response = await ReceivableDetailsRequest(data)
        const datas = await response.json();
        console.log(datas, 'recdetails');
        setlistItems(datas);
        setData(datas);
    };



    const onChangeSearch = (query) => {
        if (query) {
            const newData = listItems.filter(
                function (item) {
                    const itemData = item.BillNo
                        ? item.BillNo.toUpperCase()
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
            <Loader loading={loading} />
            <View style={styles.container}>
                <View style={styles.centeredView1}>
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
                                return <TouchableOpacity style={styles.touch} >
                                    <Text style={styles.itemTitle}>BillNo : {item.BillNo}</Text>
                                    <Text style={styles.itemTitle}>Receivable : {item.Receivable}</Text>
                                    <Text style={styles.itemTitle}>RefType : {item.RefType}</Text>
                                    <Text style={styles.itemTitle}>BillDate :{item.BillDate}</Text>
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

export default ReceivableDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEDED  ',
    },
    list: {
        flex: 0,
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        padding: 5,
    },
    searchview: {
        flex: 0,
        marginTop: 22,
    },
    modalView: {
        borderRadius: 10,
        padding: 5,
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: '5%',
        marginBottom: 10
    },
    touch: {
        backgroundColor: 'white',
        marginTop: '2%',
        marginLeft: '1%',
        border: 1,
        padding: 10,
        justifyContent: 'space-between',
        borderLeftWidth: 4,
        borderLeftColor: "#03509c",
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#cad4e8',
        borderRightColor: '#cad4e8',
        borderBottomColor: '#cad4e8',
        borderRadius: 2,
        fontSize: 24,
        fontWeight: 'bold',
        shadowColor: "#000",

    },
    itemTitle: {
        color: '#0a3d8f',
        innerHeight: 35,
        height: 35,
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
    filteEmpty: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    }
})
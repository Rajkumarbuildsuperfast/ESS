import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';




const FundAvailability = ({ route: { params } }) => {
    const { CompanyId } = params;
    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');


    useEffect(() => {
        retrieveData();
    }, []);

    const retrieveData = async () => {
        const valueString = await AsyncStorage.getItem('clientId');
        setClientId(valueString);
        const userid = await AsyncStorage.getItem('userId');
        setUserId(userid);

        let data = {
            ClientId: valueString,
            UserId: userid,
            CompanyId: CompanyId,
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        const response = await fetch('http://13.232.196.255/mobileapp2.0/public/application/management/getpayable', requestOptions);
        const datas = await response.json();
        setlistItems(datas);
        setData(datas);
    };



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
            <View>
                <Text>preview post with id {CompanyId}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.centeredView1}>
                    <View style={styles.modalView}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={search}
                        />
                        <FlatList style={styles.flatlist}
                            data={data}
                            keyExtractor={item => item.CompanyId}
                            renderItem={({ item }) => {
                                return <TouchableOpacity onPress={() => actionOnRow(item)}>
                                    <Text style={styles.itemTitle}>{item.SubLedgerName}</Text>
                                </TouchableOpacity>
                            }}
                        />
                    </View>
                </View>
            </View>

        </>
    );
}


export default FundAvailability;

const styles = StyleSheet.create({
    list: {
        flex: 0,
        fontSize: 20,
        color: 'green',
        textAlign: 'center',
        padding: 5,
    },
})


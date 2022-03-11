import { useState, useEffect } from 'react';
import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';;
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-elements/dist/icons/Icon';
import { ToastAndroid } from 'react-native';
import { approvalDetailsViewRequest, ApproveListRequest, ApproveWorkRequest } from '../../../service/api/apiservice';
import Loader from '../../Components/Loader';


const PendingListScreen = (props) => {

    const [ClientId, setClientId] = useState('');
    const [UserId, setUserId] = useState('');
    const [listItems, setlistItems] = useState([]);
    const [Data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [Preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 3000);
        setLoading(true);
        retrieveData();

    }, [ClientId, UserId]);

    const retrieveData = async () => {
        try {
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
            let data = {
                ClientId: ClientId,
                // UserId: "1",
                UserId: UserId
            };
            console.log(data, 'pending_params')
            const response = await ApproveListRequest(data)
            const datas = await response.json();
            const pendingList = datas.PendingList;
            console.log(pendingList, 'pending');
            setlistItems(pendingList);
            setData(pendingList);
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeSearch = (query) => {
        try {
            if (query) {
                const newData = listItems.filter(
                    function (item) {
                        const itemData = item.PendingRole
                            ? item.PendingRole.toUpperCase()
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
        } catch (error) {
            console.log(error);
        }
    };
    const RejectResponse = (async (item, index) => {
        try {
            const LogId = item.LogId;
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
            Alert.alert(
                "Confirm",
                "Do You want to Reject",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            console.log("Cancel Pressed")
                        }
                        ,
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: (async () => {
                            setTimeout(async () => {
                                setLoading(false);
                            }, 5000)
                            setLoading(true);

                            let RejectParams = {
                                ClientId: ClientId,
                                UserId: UserId,
                                LogId: LogId,
                                Type: "Reject",
                            };
                            const response = await ApproveWorkRequest(RejectParams)
                            const rejectResponse = await response.json();
                            let logUpdate = rejectResponse.logUpdate;
                            if (logUpdate == true) {
                                console.log(Data, 'length');
                                setData(listItems);
                                Data.splice(index, 1);

                                if (Data.LogId !== LogId) {
                                    setLoading(false);
                                }

                                console.log(Data, 'removeafter');
                                setData(Data);

                            }
                            else if (logUpdate == false) {
                                ToastAndroid('LogUpdate false try again later', ToastAndroid.SHORT);
                            }
                            setLoading(true);
                        })
                    }
                ]
            );
        } catch (error) {
            consolelog(error);
        }
    });
    const Approve = (async (item, index) => {
        try {
            const LogId = item.LogId;
            const valueString = await AsyncStorage.getItem('clientId');
            setClientId(valueString);
            const userid = await AsyncStorage.getItem('userId');
            setUserId(userid);
        } catch (error) {
            console.log(error)
        }
        Alert.alert(
            "Confirm",
            "Do you want to approve?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel Pressed")
                    }
                    ,
                    style: "cancel"
                },
                {
                    text: "OK", onPress: (async () => {
                        try {
                            setTimeout(() => {
                                setLoading(false);
                            }, 5000);
                            setLoading(true);

                            let ApproveParams = {
                                ClientId: ClientId,
                                UserId: UserId,
                                LogId: LogId,
                                Type: "Approve",
                            };
                            const response = await ApproveWorkRequest(ApproveParams)
                            const ApproveResponse = await response.json();
                            let logUpdate = ApproveResponse.logUpdate;
                            if (logUpdate == true) {
                                setData(listItems);
                                Data.splice(index, 1);
                                setData(Data);
                            }
                            else if (logUpdate == false) {
                                ToastAndroid('LogUpdate false try again later', ToastAndroid.SHORT);
                            }

                        } catch (error) {
                            console.log(error);
                        }
                    })
                }
            ]
        );
    });


    const handleRemoveItem = (async (item) => {
        setModalVisible(true);
        try {
            setModalVisible(true);
            const PreviewData = item;
            console.log(PreviewData, 'data');
            const PreviewParams = {
                ClientId: ClientId,
                LogId: item.LogId,
            }

            const response = await approvalDetailsViewRequest(PreviewParams)
            const previewResponse = await response.json();
            console.log(previewResponse);
            setPreview(previewResponse);
            console.log(Preview, 'hi')
        } catch (error) {
            console.log(error);
        }
    }
    )

    return (

        <>
            <Loader loading={loading} />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.centeredView}>
                        <View style={styles.searchview}>
                            <Searchbar style={styles.modalView}
                                placeholder="Search"
                                onChangeText={onChangeSearch}
                                value={search}
                            />
                            <FlatList style={styles.flatlist}
                                data={Data}
                                keyExtractor={item => item.TransId}
                                renderItem={({ item, index }) => {
                                    return <View  ><TouchableOpacity style={styles.touch}>
                                        <View style={styles.Flatlistview}>
                                            <Text style={styles.itemTitle}>{item.PendingRole.slice(0, 15)}</Text>
                                            <View style={styles.btnContainer}>
                                                <Icon name="md-eye" type="ionicon" color="#fff" size={15}  style={styles.btnIcon} />
                                                <Text onPress={() => handleRemoveItem(item)} style={styles.previewtxt}>Preview</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.itemTitle1} >{item.RefDate.slice(0, 15)}</Text>
                                        <View style={styles.Flatlistview1} >
                                            <TouchableOpacity
                                                style={styles.RejectButton}
                                                onPress={() => RejectResponse(item, index)}
                                                underlayColor='#fff'>
                                                <Text style={styles.RejectText}>Reject</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.ApproveButton}
                                                onPress={() => Approve(item, index)}
                                                underlayColor='#fff'>
                                                <Text style={styles.ApproveText}>Approve</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                }}
                            />
                            <Modal style={styles.centeredView}
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.modeltouch}>
                                    <View style={styles.modalView}>
                                        <FlatList style={styles.flatlist}
                                            data={Preview}
                                            keyExtractor={item => item.RoleName}
                                            renderItem={({ item }) => {
                                                return <View><TouchableOpacity >
                                                    <Text style={item.RoleName.length > 0 ? styles.previewtxt : null}>{item.RoleName.length > 0 ? 'RoleName :' + '' + item.RoleName : null}</Text>
                                                    {/* <Text style={item.RoleName == "" ? styles.previewtxt : null}>{item.RoleName != '' ? 'RoleName :' + '' + item.RoleName : console.log(item.RoleName)}</Text> */}
                                                    <Text style={item.RefDate != '' ? styles.previewtxt : null} >{item.RefDate != '' ? 'RefDate :' + '' + item.RefDate : null}</Text>
                                                    <Text style={item.RefNo != '' ? styles.previewtxt : null}>{item.RefNo != '' ? 'RefNo :' + ' ' + item.RefNo : null}</Text>
                                                    <Text style={item.CostCentreName != '' ? styles.previewtxt : null}>{item.CostCentreName != '' ? 'CostCentreName :' + '' + item.CostCentreName : null}</Text>
                                                    <Text style={item.VendorName != '' ? styles.previewtxt : null}>{item.VendorName != '' ? 'VendorName :' + '' + item.VendorName : null}</Text>
                                                    <Text style={item.Amount != '' ? styles.previewtxt : null}>{item.Amount != '' ? 'Amount :' + '' + item.Amount : null}</Text>
                                                    <Text style={item.Type != '' ? styles.previewtxt : null}>{item.Type != '' ? 'Type :' + '' + item.Type : null}</Text>
                                                </TouchableOpacity>
                                                    <View style={styles.EmptyPreview}>
                                                        <Text style={{ textAlign: 'center', color: 'red', fontSize: 19 }} >{item.RefDate == '' && item.RefNo == '' && item.CostCentreName == '' && item.VendorName == '' && item.Amount == '' && item.Type == '' ? 'No Records' : null}</Text>
                                                        <View>
                                                            <TouchableOpacity
                                                                style={styles.closeButton}
                                                                onPress={() => setModalVisible(false)}
                                                                underlayColor='#fff'>
                                                                <Text style={styles.closeText}> Close</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            }}
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.filteEmpty}>{Data.length == 0 ? 'No Data Found' : null}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default PendingListScreen;
const styles = StyleSheet.create({
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'transparent',
    },
    searchview: {
        flex: 0,
        marginTop: 22,
    },
    modeltouch: {
        backgroundColor: 'white',
        marginTop: '40%',
        margin: '2%',
        marginBottom: 10,
        padding: 10,
        justifyContent: 'flex-start',
        borderLeftWidth: 2,
        borderLeftColor: "#03509c",
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#cad4e8',
        borderRightColor: '#cad4e8',
        borderBottomColor: '#cad4e8',
        fontSize: 24,
        fontWeight: 'bold',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    touch: {
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: '1%',
        marginBottom: 10,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    itemTitle: {
        color: 'black',
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    flatlist: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
        color: 'blue',
    },
    itemTitle1: {
        flex: 0,
        color: 'black',
        height: 30,
        fontWeight: 'bold', paddingLeft: 5,
    },
    Flatlistview:
    {
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,
    },
    Flatlistview1:
    {
        margin: 0,
        flexDirection: 'row',
        width: '100%',
        alignContent: 'space-between',
        padding: 0,
    },
    RejectButton: {
        marginRight: 12,
        marginLeft: 12,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#dbdad7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    ApproveButton: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#4CB962',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff'
    },
    closeButton:
    {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    ApproveText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 18,
    },
    RejectText: {
        color: '#66635c',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 18,
    },
    previewtxt:
    {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: '#0e3c7d',
        marginRight: 0,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        borderRadius: 5,
    },
    btnIcon: {
        marginTop: 4, height: 20, width: 20,
    },
    previewmodaltext:
        { color: 'black', height: 30, fontWeight: 'bold', fontSize: 18, },

    closeText:
    {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 18,
    },
    filteEmpty: {
        color: 'red',
        textAlign: 'center',
        padding: 10,
        fontSize: 20
    }

})


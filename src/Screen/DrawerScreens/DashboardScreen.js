import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput,StatusBar 
} from "react-native";
import Intl from 'intl';
import "intl/locale-data/jsonp/en";
import { getESSDashBoardList } from '../../service/api/apiservice';
import { Value } from 'react-native-reanimated';

const DashboardScreen = (props) => {
  const [ClientId, setClientId] = useState('');
  const [UserId, setUserId] = useState('');
  const [listItems, setlistItems] = useState([]);
  useEffect(() => {
    retrieveData();
  }, [ClientId, UserId]);
  const retrieveData = async () => {
    const valueString = await AsyncStorage.getItem('clientId');
    setClientId(valueString);
    const userid = await AsyncStorage.getItem('userId');
    setUserId(userid);
    let data = {
      // ClientId: ClientId,
      UserId: '9452',
      ClientId: '14022',
      // UserId: 7297,
    };
    // direct call // 
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // };
    // const response = await fetch('http://192.168.1.112/mobileapp2.0/public/application/ess/getdashboardlist', requestOptions);
    console.log(data, 'hh')
    const response = await getESSDashBoardList(data);
    const datas = await response.json();
    console.log(datas, 'resp');
    setlistItems(datas);
  };
  const navigatepage = (argId, argEntryName) => {

  
    if(argId==1){

         props.navigation.navigate('LeaveRequestRegister');
    }

    if(argId==8){

      props.navigation.navigate('Permission');
 }


 if(argId==2){
  props.navigation.navigate('RequestEntry');
}

  }
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
        <View style={styles.flatlist}>
          <View style={styles.row1}>
            <View style={styles.button1}>
              <Image
                source={{
                  uri:
                    'https://cdn-icons.flaticon.com/png/512/4140/premium/4140061.png?token=exp=1646830605~hmac=7287d042eb6eff0db08ae02d2798c7c7',
                }}
                style={{ width: 80, height: 80, margin: 16 }}
              />
            </View>
            <View style={styles.button2}>
              <View style={styles.profilerow}>
                <Text style={styles.Profilename}>MIcromen</Text>
              </View>
              <View style={styles.profilerow}>
                <Text style={styles.Profiledesignation}>Developer</Text>
              </View>

              <View style={styles.profilerow}>
                <Text style={styles.ProfileDobandemail}>micromen@buildsuperfast.com</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            {listItems.map((value) => (
              <TouchableOpacity
              onPress={() => { navigatepage(value.id, value.ModuleName); }}
                //  onPress={() => {value.ModuleName.length > 0 ? props.navigation.navigate('LeaveRequestRegister') :console.log('data')}}
                 key={value.id}
                style={styles.button}
              >
                <Image source={{ uri: value.ModuleImage }} style={styles.logo}></Image>
                <Text
                  style={styles.buttonLabel} >
                  {value.ModuleName}
                </Text>
                {/* <Text style={styles.buttonLabel}>{value.ModuleImage}</Text> */}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({

  container: {
    flex: 0,
    // paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    margin: 0,
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row1: {
    backgroundColor: '#07348F',
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 12,
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
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#FFFF",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "40%",
    marginLeft: '6%',
    marginTop: '5%',

    alignItems: 'center',
    height: 160,
    borderWidth: 2,
    borderColor: "#cad4e8",
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
  button1: {
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginHorizontal: "2%",
    marginBottom: 0,
    marginTop: 12,
    alignItems: 'center',
    minWidth: "15%",

  },
  button2: {
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    alignItems: 'center',
    borderRadius: 12,
    minWidth: "62%",

  },
  profilerow: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    Width: 100,
    borderRadius: 12,

  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#5f7d95",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    padding: 10,
    marginTop: 20,
  },
  flatlist: {
    justifyContent: 'center',
    flex: 1,

  },
  
  Profilename:
  {
    //  color: '#34356D',
    color: '#ffff',
    paddingBottom: 5,
    fontWeight: 'bold',
    fontfamily: "Roboto",
    fontSize: 19,
    textTransform: 'uppercase',
  },

  Profiledesignation:
  {
    // color: '#617379',
    color: '#ffff',
    paddingBottom: 10,
    fontWeight: 'bold',
    fontfamily: "Roboto",
    fontSize: 15,
  },
  ProfileDobandemail:
  {
    // color: '#617379',
    color: '#ffff',
    paddingBottom: 10,
    fontWeight: 'bold',
    fontfamily: "Roboto",
    fontSize: 15,
  },
});
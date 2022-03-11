import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Searchbar } from 'react-native-paper';

const ModalSearch = (props) => {
	// const listItems = [{ CompanyId: "1165", CompanyName: "5MM" }, { CompanyId: "1190", CompanyName: "A2B" }]
	const Company = props.data;
	const [data, setData] = useState([])
	const [search, setSearch] = useState('');
	// const [searchQuery, setSearchQuery] = React.useState('');


	const onChangeSearch = (query) => {
		setSearchQuery(query)
		console.log(query)
		const newdata = data.filter(item => {
			const itemData = `${item.CompanyName.toUpperCase()}`;
			const textData = query.trim().toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		setData(newdata)
	};
	return (
		<View style={styles.container}>
			<Modal
				style={styles.centeredView}
				animationType="slide"
				transparent={true}
				visible={props.visible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					props.onChange()
				}}
			>
				<View>
					<View style={styles.modalView}>
						{/* <Searchbar
						placeholder="Search"
						onChangeText={props.onChangeSearch(search)}
						// onChangeText={props.onChangeSearch}
						value={search}
					/> */}
						<Searchbar
							placeholder="Search"
							// onChangeText={props.onChangeSearch(props.searchQuery)}
							onChangeText={(value) => props.onChangeSearch(value)}
							value={props.searchQuery}
						/>
						{/* <FlatList style={styles.flatlist}
						data={props.data}
						keyExtractor={item => item.CompanyId}
						renderItem={({ item }) => {
							return <TouchableOpacity onPress={(item) => props.actionOnRow(item)}>
								<Text style={styles.itemTitle}>{item.CompanyName}</Text>
							</TouchableOpacity>
						}}
					/> */}
						<FlatList style={styles.flatlist}
							data={props.data}
							keyExtractor={item => item.CompanyId}
							renderItem={({ item }) => {
								return <TouchableOpacity onPress={() => props.actionOnRow(item)}>
									<Text style={styles.itemTitle}>{item.CompanyName}</Text>
								</TouchableOpacity>
							}}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		width: '100%'
	},
	modalView: {
		margin: 10,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		width: '90%',
		marginLeft: '5%',
		alignItems: "center",
		// shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	flatlist: {
		fontSize: 20,
		padding: 8,
		fontWeight: 'bold',
		color: 'blue',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	container: {
		flex: 1,
		// backgroundColor: '#EAEDED',
	},
	itemTitle:
	{
		color: 'black',
		fontSize: 15,
		fontWeight: 'bold',
		margin: 3,

	}

});


export default ModalSearch;
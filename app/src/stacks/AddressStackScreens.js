import React from "react";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { SelectPointScreen, AddressForm, AddAddressScreen, MyAddress, AddressUpdateForm } from "../screens/index";
import { useNavigation } from "@react-navigation/native";


const AddressStackScreens = () => {
	const AddProductService = createStackNavigator();
	const navigation = useNavigation();
	const screenOptions= {
		headerTitleStyle: {
			fontWeight: "bold",
		},
		headerTitleAlign: "center"
	};


	const options = {
		headerLeft: () => (
			<BorderlessButton onPress={() => navigation.goBack()} style = {{marginLeft:11}}>
				<Feather name = "arrow-left" size = {24} color = "#000" />
			</BorderlessButton>
		),
		headerRight: () => (
			<BorderlessButton onPress={() => navigation.toggleDrawer()} style={{marginRight: 20}}>
				<Feather name="menu" size={24} color="black" />
			</BorderlessButton>
		)
	};



	return (
		<AddProductService.Navigator headerMode = "screen" screenOptions = {screenOptions}>
			<AddProductService.Screen options = {options} name = "Meus Endereço" component = {MyAddress} />
			<AddProductService.Screen name = "Cadastro de Endereço" component = {AddAddressScreen} />
			<AddProductService.Screen name = "Formulario de Endereço" component = {AddressForm} />
			<AddProductService.Screen name = "Editar Endereço" component = {AddressUpdateForm} />
			<AddProductService.Screen name = "Selecionar Local" component = {SelectPointScreen} />
		</AddProductService.Navigator>
	);
};

export default AddressStackScreens;

import React from "react";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductServiceTypeScreen, ProductForm, EditProductForm, SelectAddress, AddAddressScreen, AddressForm, SelectPointScreen, MyProducts} from "../screens/index";
import { useNavigation } from "@react-navigation/native";

const ProductStackScreens = () => {
	const Product = createStackNavigator();
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
		),
	};



	return (
		<Product.Navigator headerMode = "screen" screenOptions = {screenOptions}>
			<Product.Screen options = {options} name = "Selecionar tipo produto" component = {ProductServiceTypeScreen} />
			<Product.Screen name = "Cadastro de produto" component = {ProductForm} />
			<Product.Screen name = "Editar Produto" component = {EditProductForm} />
			<Product.Screen name = "Selecionar Endereço" component = {SelectAddress} />
			<Product.Screen name = "Cadastro de Endereço" component = {AddAddressScreen} />
			<Product.Screen name = "Formulario de Endereço" component = {AddressForm} />
			<Product.Screen name = "Selecionar Local" component = {SelectPointScreen} />
			<Product.Screen name = "Meus Produtos" options = {options} component = {MyProducts}/>
		</Product.Navigator>
	);
};

export default ProductStackScreens;

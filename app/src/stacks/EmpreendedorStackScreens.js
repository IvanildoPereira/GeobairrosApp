import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"; 
import { createStackNavigator } from "@react-navigation/stack";
import { FollowScreen, PerfilScreen, ProductsList, ProductScreen } from "../screens/index";

const EmpreendedorStackScreens = ({navigation}) => {
	const EmpreendedorStack = createStackNavigator();

	const screenOptions= {
		headerTitleStyle: {
			fontWeight: "bold",
		},
		headerTitleAlign: "center"
	};

	const options = {
		headerRight: () => (
			<BorderlessButton onPress={() => navigation.toggleDrawer()} style={{marginRight: 20}}>
				<Feather name="menu" size={24} color="black" />
			</BorderlessButton>
		),
	};

	return (
		<EmpreendedorStack.Navigator headerMode = "screen" screenOptions = {screenOptions}>
			<EmpreendedorStack.Screen name = "Empreendedores" component = {FollowScreen} options = {options}/>
			<EmpreendedorStack.Screen name = "Perfil" component = {PerfilScreen} options = {options} />
			<EmpreendedorStack.Screen name = "Produtos Oferecidos" component = {ProductsList} options = {options} />
			<EmpreendedorStack.Screen name = "Details" options = {{headerShown: false}}  component = {ProductScreen} />
		</EmpreendedorStack.Navigator>
	);
};

export default EmpreendedorStackScreens;
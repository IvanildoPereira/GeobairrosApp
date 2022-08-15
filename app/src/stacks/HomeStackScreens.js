import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"; 
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, PerfilScreen, ProductScreen, ProductsList  } from "../screens/index";

const HomeStackScreens = ({navigation}) => {
	const HomeStack = createStackNavigator();

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
		<HomeStack.Navigator headerMode = "screen" screenOptions = {screenOptions}>
			<HomeStack.Screen name = "Feed" component = {HomeScreen} options = {options}/>
			<HomeStack.Screen name = "Details" options = {{headerShown: false}} component = {ProductScreen} />
			<HomeStack.Screen name = "Perfil" component = {PerfilScreen} />
			<HomeStack.Screen name = "Produtos Oferecidos" component = {ProductsList} />
		</HomeStack.Navigator>
	);
};

export default HomeStackScreens;

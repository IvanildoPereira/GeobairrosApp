import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MapScreen, ProductScreen, PerfilScreen  } from "../screens/index";

const MapStackScreen = () => {
	const MapStack = createStackNavigator();

	const screenOptions= {
		headerTitleStyle: {
			fontWeight: "bold",
		},
		headerTitleAlign: "center"
	};

	return (
		<MapStack.Navigator headerMode = "none" screenOptions = {screenOptions}>
			<MapStack.Screen name = "Map" component = {MapScreen} />
			<MapStack.Screen name = "Details" component = {ProductScreen} />
			<MapStack.Screen name = "Perfil" component = {PerfilScreen} />
		</MapStack.Navigator>
	);
};

export default MapStackScreen;

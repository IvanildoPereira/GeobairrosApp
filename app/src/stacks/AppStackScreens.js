import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoadingScreen from "../screens/LoadingScreen";
import AuthStackScreens from "./AuthStackScreens";
//import TabBarStackScreens from './TabBarStackScreens';
import DrawerStackScreens from "./DrawerStackScreens";
import { AuthContext } from "../context/auth-context";

const AppStackScreens = () => {
	const AppStack = createStackNavigator();
	const auth = useContext(AuthContext);

	return (
		<AppStack.Navigator headerMode = "none">
			{auth.token === null ? (
				<AppStack.Screen name = "Loading" component = {LoadingScreen} />
			) : auth.token ? (
				<AppStack.Screen name = "Main" component = {DrawerStackScreens}/>
			) : (
				<AppStack.Screen name = "Auth" component = {AuthStackScreens}/>  
			)}
		</AppStack.Navigator> 
	);
};

export default AppStackScreens;

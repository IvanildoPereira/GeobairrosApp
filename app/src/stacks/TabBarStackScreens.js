import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import EmpreendedorStackScreens from "./EmpreendedorStackScreens";
import ProfileStackScreens from "./ProfileStackScreens";
import HomeStackScreens from "./HomeStackScreens";
import ProductStackScreens from "./ProductStackScreens";
import MapStackScreen from "./MapStackScreen";

const TabBarStackScreens = () => {
	const TabStack = createBottomTabNavigator();

	const tabBarOptions = {
		keyboardHidesTabBar: true,
		showLabel: false,
		style:{
			backgroundColor: "#ffffff",
			paddingBottom: 8,
			height: 60
		},
        
        
	};

	const screenOptions = (({ route }) => ({
        
		tabBarVisible: route.name === "Add" ? false : true,   
		tabBarIcon: ({ focused }) =>{
			let iconName = "home";

			switch(route.name){
			case "Home":
				iconName = "ios-home";
				break;
                
			case "Empreendedores":
				iconName = "ios-star";
				break;

			case "Map":
				iconName = "md-map";
				break;

			case "Profile":
				iconName = "ios-person";
				break;

			default:
				iconName = "ios-home";
                
			}

			if(route.name === "Add"){
				return <Ionicons 
					name = "ios-add-circle" 
					size = {60} 
					color = "#0070E4"
					style = {{
						shadowColor: "#23a8d9",
						shadowOffset: { width: 0, height: 10},
						shadowRadius: 10,
						shadowOpacity: 0.3
					}} />;
			}

			return <Ionicons name = {iconName} size = {30} color = {focused ? "#0070E4" : "#c4c4c4"}/>;
		},
        
	}));

	return(
		<TabStack.Navigator tabBarOptions = {tabBarOptions} screenOptions = {screenOptions}>
			<TabStack.Screen name = "Home" component = {HomeStackScreens}/>
			<TabStack.Screen name = "Empreendedores" component = {EmpreendedorStackScreens} />
			<TabStack.Screen name = "Add" component = {ProductStackScreens}/>
			<TabStack.Screen name = "Map" component = {MapStackScreen}/>
			<TabStack.Screen name = "Profile" component = {ProfileStackScreens}/>
		</TabStack.Navigator>
	);
};

export default TabBarStackScreens ;



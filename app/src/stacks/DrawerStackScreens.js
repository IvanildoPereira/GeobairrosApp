import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabBarStackScreens from "./TabBarStackScreens";
import DrawerContent from "./DrawerContent";
import AddressStackScreens from "./AddressStackScreens";
import ProductStackScreens from "./ProductStackScreens";

const Drawer = createDrawerNavigator();

const DrawerStackScreens = () => {
	return (
		<Drawer.Navigator drawerContent={ props => <DrawerContent {...props} />}>
			<Drawer.Screen name="Feed" component={TabBarStackScreens} />
			<Drawer.Screen name = "Address" component={AddressStackScreens}/>
			<Drawer.Screen name = "Products" component = {ProductStackScreens}/> 
		</Drawer.Navigator>
	);
};

export default DrawerStackScreens;

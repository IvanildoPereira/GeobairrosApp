import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons"; 
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen, EditProfileScreen, EditPassword, ProductsList, ProductScreen } from "../screens/index";

const ProfileStackScreens = ({navigation}) => {
	const ProfileStack = createStackNavigator();

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
		<ProfileStack.Navigator headerMode = "screen" screenOptions = {screenOptions}>
			<ProfileStack.Screen name = "Meu Perfil" options = {{headerShown: false}} component = {ProfileScreen} />
			<ProfileStack.Screen name = "Atualizar Perfil" component = {EditProfileScreen} />
			<ProfileStack.Screen name = "Atualizar Senha" component = {EditPassword} />
			<ProfileStack.Screen name = "Produtos Oferecidos" component = {ProductsList} options = {options} />
			<ProfileStack.Screen name = "Details" options = {{headerShown: false}}  component = {ProductScreen} />
		</ProfileStack.Navigator>
	);
};

export default ProfileStackScreens;

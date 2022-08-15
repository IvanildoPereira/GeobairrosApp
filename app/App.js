import React from "react";
import styled from "styled-components";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useAuth } from "./src/hooks/auth-hook";
import { AuthContext } from "./src/context/auth-context";
import AppStackScreens from "./src/stacks/AppStackScreens";

const App = () => {
	const { token, userId, login, logout } = useAuth();

	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: "#FFF",
		},
	};

	return(
		<AuthContext.Provider value={{ token: token, userId , login, logout }}>
			<StatusBar barStyle = "dark-content" />
			<NavigationContainer theme = {MyTheme}>
				<AppStackScreens />
			</NavigationContainer>
		</AuthContext.Provider>
	);

  
};

const StatusBar = styled.StatusBar``;

export default App;
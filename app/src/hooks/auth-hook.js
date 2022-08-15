import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const autoLogin = async () =>{
			const storedData = JSON.parse( await AsyncStorage.getItem("userData"));
			if (
				storedData &&
      storedData.token
			) {
				login(storedData.userId, storedData.token);
			} else{
				setToken(false);
			}
		};
		autoLogin();
	}, [login]);

	// Login
	const login = useCallback(async (uid, token) => {
		setToken(token);
		setUserId(uid);

		await AsyncStorage.setItem(
			"userData",
			JSON.stringify({
				userId: uid,
				token: token
			})
		);
	}, []);

	// Logout
	const logout = useCallback(async () => {
		setToken(false);
		setUserId(null);
		await AsyncStorage.removeItem("userData");
	}, []);

	return { token, userId , login, logout };
};
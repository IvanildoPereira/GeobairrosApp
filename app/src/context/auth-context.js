import { createContext } from "react";

export const AuthContext = createContext({
	userId: null,
	email: "",
	token: null,
	login: () => {}, 
	logout: () => {}
});
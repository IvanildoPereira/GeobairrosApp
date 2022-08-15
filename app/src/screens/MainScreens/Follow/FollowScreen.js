import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { SimpleSearch, Text } from "../../../components/index";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import styled from "styled-components";
import config from "../../../../config";
import ShimmerPlaceholderFollow from "./Components/ShimmerPlaceholderFollow";
import UserList from "./Components/UserList";


const FollowScreen = () => {
	const [ users, setUsers ] = useState();
	const [ search, setSearch] = useState("");
	const auth = useContext(AuthContext);
	const { isLoading, sendRequest } = useFetch();

	useEffect(()=>{
		const fetchUsers = async() => {
			try {
				const { response } = await sendRequest(`${config.API_URL}/perfil/all`, "GET", null, {
					Authorization: "bearer " + auth.token
				});
				setUsers(response);
                
                
			} catch (err) {
				Alert.alert(err);
			}
		};
		fetchUsers();
	}, [auth.token]);

	const handleSearch = async() =>{
		try {
			const { response } = await sendRequest(`${config.API_URL}/perfil/all?search=${search}`, "GET", null, {
				Authorization: "bearer " + auth.token
			});
			setUsers(response);
		} catch (err) {
			Alert.alert(err);
		}
	};

	return (
		<Container>

			<SimpleSearch
				value = {search}
				onChangeText = {search => setSearch(search.trim())} 
				handleSearch = {handleSearch}
				isLoading = {isLoading}
			/>
            
			<UsersContainer>
				{!isLoading && users && users.length <= 0 &&<Text center color = "red">Nenhum Empreendedor encontrado</Text>}

				{isLoading && 
                    <ShimmerPlaceholderFollow />
				}

				{!isLoading && users && 
                    <UserFlatList
                    	data={users}
                    	keyExtractor={item => item.id.toString()}
                    	renderItem={({ item }) => ( 
                    		<UserList item = {item} />                        
                    	)}/>}
                        
			</UsersContainer>
		</Container>
	);
};


const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;



const UsersContainer = styled.View`
    
`;

const UserFlatList = styled.FlatList`
    margin-bottom: 100px;
`;

export default FollowScreen;



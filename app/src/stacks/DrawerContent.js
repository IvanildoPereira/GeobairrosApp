import React, { useContext, useState, useEffect} from "react";
import {
	DrawerItem,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { FontAwesome, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import styled from "styled-components";
import Text from "../components/Text";
import { AuthContext } from "../context/auth-context";
import useFetch from "../hooks/useFetch";
import config from "../../config";


const DrawerContent = ({props, navigation}) => {
	const auth = useContext(AuthContext);
	const { sendRequest } = useFetch();
	const isDrawerOpen = useIsDrawerOpen();
	const [ user, setUser ] = useState();

	useEffect(()=>{
		const fetchUser = async()=>{
			const { response } = await sendRequest(`${config.API_URL}/users/`, "GET", null,{
				Authorization: "Bearer " + auth.token,
			});
			setUser(response);
		};
		if(isDrawerOpen){
			fetchUser();
		}
	}, [auth.token, isDrawerOpen]);

	return (
		<DrawerContentScrollView {...props}>
			<DrawerSection>
				<DrawerAvatarContainer>
					<DrawerAvatarImageContainer>
						{user && <DrawerAvatar source = {{ uri:  user.info.avatar_img}}/>}
					</DrawerAvatarImageContainer>
					{user && <Text color = "#fff" center margin = "0 30px" medium heavy>{user.info.name}</Text>}
					<DrawerAvatarInfo>
						<DrawerAvatarInfoBox>
							<Text color = "#fff" center>{user ? user.numberOfFollowing : 0}</Text>
							<Text color = "#fff" center>Seguindo</Text>
						</DrawerAvatarInfoBox>
						<Border/>
						<DrawerAvatarInfoBox>
							<Text color = "#fff" center>{user ? user.numberOfFollowers : 0}</Text>
							<Text color = "#fff" center>Seguidores</Text>
						</DrawerAvatarInfoBox>
					</DrawerAvatarInfo>
				</DrawerAvatarContainer>
			</DrawerSection>

			<DrawerSection>
				<DrawerItem
					icon={() => (
						<FontAwesome name = 'shopping-bag' color = "#0070e4" size = {25}/>
					)}
					label="Meus Produtos"
					onPress={() => navigation.navigate("Products", {
						screen: "Meus Produtos",
						params: {
							type: "Produto"
						}
					})}
				/>
			</DrawerSection>

			<DrawerSection>
				<DrawerItem
					icon={() => (
						<FontAwesome name = 'handshake-o' color = "#0070e4" size = {20}/>
					)}
					label="Meus Serviços"
					onPress={() => navigation.navigate("Products", {
						screen: "Meus Produtos",
						params: {
							type: "Serviço"
						}
					})}
				/>
			</DrawerSection>

			<DrawerSection>
				<DrawerItem
					icon={() => (
						<FontAwesome5 name = 'map-marked-alt' color = "#0070e4" size = {25}/>
					)}
					label="Meus Endereços"
					onPress={() => {
						navigation.navigate("Address");
					}}
				/>
			</DrawerSection>

			<DrawerSection>
				<DrawerItem
					icon={() => (
						<AntDesign name = 'logout' color = "#0070e4" size = {25}/>
					)}
					label="Sair"
					onPress={() => auth.logout()}
				/>
			</DrawerSection>
		</DrawerContentScrollView>
	);
};

const DrawerSection = styled.View`
    
`;

const DrawerAvatarContainer = styled.View`
    background-color: #0070E4;
    margin-top: -10px;
    height: 300px;
    justify-content: center;
    align-items: center;
`;

const DrawerAvatarImageContainer = styled.View`
    margin-bottom: 10px;
    width: 120px;
    height: 120px;
    border-radius: 60px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    background-color: #0070e4;
    elevation: 4;
`;

const DrawerAvatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
`;

const DrawerAvatarInfo = styled.View`
    flex-direction: row;
    margin-top: 20px;
`;

const DrawerAvatarInfoBox = styled.View`
`;

const Border = styled.View`
    border-right-width: 1px;
    border-color: #fff;
    margin: 0 20px;
`;

export default  DrawerContent;
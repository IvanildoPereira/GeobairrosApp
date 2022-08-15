import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../../components/index";
import { AuthContext } from "../../../../context/auth-context";

const UserList = ({item}) => {
	const navigation = useNavigation();
	const auth = useContext(AuthContext);
	return (
		<>
			<UserInfo onPress = {() => item.id !== auth.userId && navigation.navigate("Perfil", {
				perfilId: item.id
			})}>
				<ImageAvatar source = {{ uri: item.avatar_img }}/>
				<UserDetails>
					<Text color = "#000" medium heavy>{item.name}</Text>
					<Text justify color = "#000" small>
						{item.description} 
					</Text>
				</UserDetails>                           
			</UserInfo>
			<Line/>
		</>
	);
};

const UserInfo = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    margin: 10px;
    
`;

const ImageAvatar = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 35px;
`;

const UserDetails = styled.View`
    padding: 0px 10px;
    flex: 1;
`;


const Line = styled.View`
    width: 90%;
    border: 1px solid #c4c4c4;
    align-self: center;
`;

export default UserList;


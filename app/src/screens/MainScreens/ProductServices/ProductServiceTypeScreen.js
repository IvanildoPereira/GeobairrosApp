import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons"; 
import Text from "../../../components/Text";

const ProductServiceTypeScreen = () => {
	const [ type, setType ] = useState("Produto");
	const navigation = useNavigation();
	return (
		<Container>
			<Text large heavy margin = "10px 0">Selecione uma categoria</Text>
			<Text medium color = "#9FA2A5">Escolha o que voce deseja oferecer para as pessoas que moram perto.</Text>
			<BoxSelectContainer>
				<BoxSelect onPress = {() => setType("Produto")}
					style = {{
						backgroundColor: type === "Produto" ? "#0070E4": "#fff",
						borderColor: type === "Produto" ? "#0070E4": "#C4C4C4"
					}}>
					<IconContainer>
						<FontAwesome5 name="shopping-bag" size={50} color = {type === "Produto" ? "#fff": "#9FA2A5"} />
					</IconContainer>
					<Text medium color = {type === "Produto" ? "#fff": "#9FA2A5"}>Produto</Text>
				</BoxSelect>
				<BoxSelect onPress = {() => setType("Serviço")}
					style = {{
						backgroundColor: type === "Serviço" ? "#0070E4": "#fff",
						borderColor: type === "Serviço" ? "#0070E4": "#C4C4C4"
					}}>
					<IconContainer>
						<FontAwesome5 name="handshake" size={50} color = {type === "Serviço" ? "#fff": "#9FA2A5"} />
					</IconContainer>
					<Text medium color = {type === "Serviço" ? "#fff": "#9FA2A5"}>Serviço</Text>
				</BoxSelect>
			</BoxSelectContainer>
			<ButtonNext onPress = {() => navigation.navigate("Cadastro de produto",{typeProduct: type})}>
				<Text bold center color = "#fff">Proxima Etapa</Text>
			</ButtonNext>
		</Container>
	);
};

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 30px;
    
`;

const BoxSelectContainer = styled.View`
    flex-direction: row;
    margin: 40px 0 ;
`;

const BoxSelect = styled.TouchableOpacity`
    width: 50%;
    height: 150px;
    border-radius: 5px;
    margin-right: 10px;
    border-width: 1px;
    justify-content: center;
    align-items: center;
`;

const IconContainer = styled.View`
    height: 60px;
`;

const ButtonNext = styled.TouchableOpacity`
    height: 50px;
    width: 60%;
    align-items: center;
    justify-content: center; 
    background-color: #0070E4;
    border-radius: 4px;
    margin-bottom: 20px;
`;

export default ProductServiceTypeScreen;
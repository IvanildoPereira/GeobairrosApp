import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components";
import { FontAwesome5, Entypo } from "@expo/vector-icons"; 
import Text from "../../../components/Text";

const AddAddressScreen = () => {
	const [ type, setType ] = useState("Minha Localização");
	const navigation = useNavigation();
	const route = useRoute();
	let screenRoot = route.params.screenRoot;

	return (
		<ScrollView>
			<Container>
                
				<Text large heavy center margin = "10px 0 10px 0">Selecione uma opção de preenchimento</Text>
				<Text medium center color  = "#9FA2A5">Escolha a opção que você deseja para preenchimento do endereço.</Text>
				<BoxSelectContainer>
					<BoxSelect onPress = {() => setType("Minha Localização")}
						style = {{
							backgroundColor: type === "Minha Localização" ? "#0070E4": "#fff",
							borderColor: type === "Minha Localização" ? "#0070E4": "#C4C4C4"
						}}>
						<IconContainer>
							<Entypo name="location" size={50} color = {type === "Minha Localização" ? "#fff": "#9FA2A5"} />
						</IconContainer>
						<Text medium center color  = {type === "Minha Localização" ? "#fff": "#9FA2A5"}>Minha Localização</Text>
					</BoxSelect>
					<BoxSelect onPress = {() => setType("Procurar Endereço")}
						style = {{
							backgroundColor: type === "Procurar Endereço" ? "#0070E4": "#fff",
							borderColor: type === "Procurar Endereço" ? "#0070E4": "#C4C4C4"
						}}>
						<IconContainer>
							<FontAwesome5 name="search-location" size={50} color = {type === "Procurar Endereço" ? "#fff": "#9FA2A5"} />
						</IconContainer>
						<Text center medium color = {type === "Procurar Endereço" ? "#fff": "#9FA2A5"}>Procurar Endereço</Text>
					</BoxSelect>
				</BoxSelectContainer>
				<ButtonNext onPress = {() => navigation.navigate("Formulario de Endereço", {type, screenRoot})}>
					<Text bold center color = "#fff">Proxima Etapa</Text>
				</ButtonNext>
				<Text small justify color = "#9FA2A5" margin = "20px 0">Obs: O App utiliza um banco de mapas gratuito, então há certas limitações no preenchimento.
                Aconselhamos que para melhor resultado seja ultilizado a opção <Text small heavy>Minha Localização.</Text></Text>
                
			</Container>
		</ScrollView>
	);
};

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 30px;
`;

const ScrollView = styled.ScrollView``;



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
    width: 200px;
    align-items: center;
    justify-content: center; 
    background-color: #0070E4;
    border-radius: 4px;
    margin-bottom: 20px;
`;

export default AddAddressScreen;


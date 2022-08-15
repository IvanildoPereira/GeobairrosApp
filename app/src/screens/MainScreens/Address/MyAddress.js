import React, {useState, useCallback, useContext } from "react";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styled from "styled-components";
import Text from "../../../components/Text";
import { Alert } from "react-native";


const MyAddress = () => {
	const navigation = useNavigation();
	const [ addresses, setAddresses ] = useState(null);
	const { isLoading, sendRequest, error, clearError } = useFetch();
	const auth = useContext(AuthContext);
    
    
	useFocusEffect(
		useCallback(() => {
			const fetchAddress = async() => {
				try {
					const { response } = await sendRequest(`${config.API_URL}/address/`, "GET", null, {
						Authorization: "bearer " + auth.token
					});
					setAddresses(response);
                    
				} catch (err) {
					Alert.alert("Error", err, [
						{text: "ok", onPress: () => clearError()}
					]);
				}
			};
			fetchAddress();
		}, [auth.token, sendRequest])
	);

	const handleDelete = async(addressId) =>{
		try {
			const { status } = await sendRequest(`${config.API_URL}/address/delete/${addressId}`, "DELETE", null, {
				Authorization: "bearer " + auth.token
			});   
			if(status){
				let addressesNew = addresses.filter(address => address.id !== addressId);
				setAddresses(addressesNew);   
			}
                         
		} catch (err) {
			Alert.alert("Error", err, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};

	const alertDelete = (addressId) =>{
		Alert.alert("Excluir", "Você tem certeza que quer deletar esse endereço?",[
			{text: "Sim", onPress: () => handleDelete(addressId)},
			{text: "Não", onPress: () => {return;}}
		],
		{ cancelable: false }
		);
	};

    

	return (
		<Container>
			{error && <Text>{error}</Text>}
			{isLoading && <Loading/>}
			<Text margin = "20px" heavy medium center color = "#9FA2A5">Seus Endereços para serem usados quando for colocar nos produtos e serviços</Text>
			{addresses && addresses.length > 0 && !isLoading &&<AddressFlatList
				data={addresses}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<AddressCard>
						<Text color = "#000">{item.logradouro}</Text>
						<Text color = "#000">{item.bairro}</Text>
						<Text color = "#000">{item.cidade} - {item.uf}</Text>
						<ButtonGruop>
							<ButtonAction onPress = {() => alertDelete(item.id)}>
								<AntDesign name="delete" size={24} color="#FC0B0B" />
							</ButtonAction>
							<ButtonAction onPress = {() => navigation.navigate("Editar Endereço", {
								addressId: item.id
							})}>
								<MaterialCommunityIcons name="square-edit-outline" size={26} color="#0070E4" />
							</ButtonAction>
						</ButtonGruop>
					</AddressCard>
				)}
			/>} 
            
            

			{addresses && addresses.length <=0 && !isLoading &&<Text center margin = "40px" color = "#FC0B0B">Não há nenhum endereço cadastrado!</Text>}
            
			<NormalButton onPress = {() => navigation.navigate("Cadastro de Endereço",{screenRoot: "Meus Endereço"})}>
				<Text center underline>Adicionar Novo Endereço</Text>
			</NormalButton>
            
		</Container>
	);
};

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

const AddressFlatList = styled.FlatList`
    margin: 10px 20px;
    max-height: 80%;
`;

const AddressCard = styled.View`
    border: 1px solid #000;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
`;

const ButtonGruop = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

const ButtonAction = styled.TouchableOpacity`
    margin-left: 10px;
`;

const NormalButton = styled.TouchableOpacity`
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#0070E4",
	size: "small"
}))``;

export default MyAddress;
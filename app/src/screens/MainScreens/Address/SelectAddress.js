import React, {useState, useCallback, useContext } from "react";
import { Alert } from "react-native";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import styled from "styled-components";
import Text from "../../../components/Text";

const SelectAddress = () => {
	const navigation = useNavigation();
	const [ addresses, setAddress ] = useState(null);
	const [ selectedAddress, setSelectedAddress ] = useState(null);
	const { isLoading, sendRequest, error, clearError } = useFetch();
	const auth = useContext(AuthContext);
	const route = useRoute();
    
    
	useFocusEffect(
		useCallback(() => {
			clearError();
			const fetchAddress = async() => {
				try {
					const { response } = await sendRequest(`${config.API_URL}/address/`, "GET", null, {
						Authorization: "bearer " + auth.token
					});
					setAddress(response);
                    
				} catch (err) {
					Alert.alert(err);
				}
			};
			fetchAddress();
			if(route.params.addressId){
				setSelectedAddress(route.params.addressId);
			}
		}, [auth.token, route.params])
	);

    
	const subtmitProduct = async() =>{
		try {
			// eslint-disable-next-line no-undef
			const formData = new FormData();
			formData.append("name", route.params.name);
			formData.append("price", route.params.price);
			formData.append("description", route.params.description);
			formData.append("whatsapp", route.params.whatsapp);
			formData.append("link", route.params.link);
			formData.append("type", route.params.typeProduct);
			formData.append("addressId", selectedAddress);
			route.params.images.forEach((image) => {
				if(image.type){
					formData.append("images", image);
				}else{
					formData.append("images", image.path);
				}
			});

			let apiAction = route.params.action !== "update" ? `${config.API_URL}/product/create` : `${config.API_URL}/product/edit/${route.params.productId}`; 

			const { status } = await sendRequest(
				apiAction, "POST", formData,{
					Authorization: "Bearer " + auth.token,
				}
			);

			if(status && route.params.action !== "update"){
				navigation.popToTop();
				navigation.navigate("Home"); 
			}else if(status && route.params.action == "update"){
				navigation.navigate("Meus Produtos");
			}
                
            
		} catch (err) {
			Alert.alert(err);
		}
	};

	return (
		<Container>
			{error && <Text>{error}</Text>}
			{isLoading && <Loading/>}
			<Text margin = "20px" heavy medium center color = "#9FA2A5">Seus Endereços para serem usados quando for colocar nos produtos e serviços</Text>
			{addresses && !isLoading &&<AddressFlatList
				data={addresses}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<AddressCard 
						style = {{
							backgroundColor: selectedAddress === item.id ? "#0070E4": "#fff",
							borderColor: selectedAddress === item.id ? "#0070E4": "#C4C4C4"
						}}
						onPress = {() => setSelectedAddress(item.id)}
					>
						<Text color = {selectedAddress === item.id ? "#fff": "#c4c4c4"}>{item.logradouro}</Text>
						<Text color = {selectedAddress === item.id ? "#fff": "#c4c4c4"}>{item.bairro}</Text>
						<Text color = {selectedAddress === item.id ? "#fff": "#c4c4c4"}>{item.cidade} - {item.uf}</Text>
					</AddressCard>
				)}
			/>} 
            
            

			{!addresses && !isLoading &&<Text center margin = "40px" color = "#FC0B0B">Não há nenhum endereço cadastrado!</Text>}
            
			<NormalButton onPress = {() => navigation.navigate("Cadastro de Endereço", {
				screenRoot: "Selecionar Endereço"
			})}>
				<Text center underline>Adicionar Novo Endereço</Text>
			</NormalButton>

			<ButtonNext onPress = {subtmitProduct}>
				{isLoading ? (
					<Loading />
				) : (
					<Text bold center color = "#fff">Salvar</Text>
				)}
			</ButtonNext>
            
		</Container>
	);
};

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

const AddressFlatList = styled.FlatList`
    margin: 10px 20px;

`;

const AddressCard = styled.TouchableOpacity`
    border: 1px solid #000;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 20px;
`;



const NormalButton = styled.TouchableOpacity`
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#0070E4",
	size: "small"
}))``;

const ButtonNext = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    align-items: center;
    justify-content: center; 
    align-self: center;
    background-color: #0070E4;
    border-radius: 4px;
    margin: 20px 0 50px 0;
`;

export default SelectAddress;
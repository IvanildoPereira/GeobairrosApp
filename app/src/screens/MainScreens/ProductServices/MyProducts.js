import React, {useState, useCallback, useContext } from "react";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import styled from "styled-components";
import Text from "../../../components/Text";
import { Alert } from "react-native";


const MyProduct = () => {
	const navigation = useNavigation();
	const [ products, setProducts ] = useState(null);
	const { isLoading, sendRequest, error, clearError } = useFetch();
	const auth = useContext(AuthContext);
	const route = useRoute();
	const { type } = route.params;
    
	useFocusEffect(
		useCallback(() => {
			clearError();
			navigation.setOptions({
				title: type === "Produto" ? "Meus Produtos" : "Meus Serviços" 
			});
			const fetchProducts = async() => {
				try {
					const { response } = await sendRequest(`${config.API_URL}/product/owner/products/?type=${type}`, "GET", null, {
						Authorization: "bearer " + auth.token
					});
					setProducts(response);                   
				} catch (err) {
					Alert.alert(err, [
						{text: "ok", onPress: () => clearError()}
					]);
				}
			};
			fetchProducts();
		}, [auth.token, sendRequest, route.params])
	);

	const handleDelete = async(productId) =>{
		try {
			const { status } = await sendRequest(`${config.API_URL}/product/delete/${productId}`, "DELETE", null, {
				Authorization: "bearer " + auth.token
			});   
			if(status){
				let productsNew = products.filter(product => product.id !== productId);
				setProducts(productsNew);   
			}
                         
		} catch (err) {
			Alert.alert(err, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};

	const alertDelete = (productId) =>{
		Alert.alert("Excluir", "Você tem certeza que quer deletar esse Produto?",[
			{text: "Sim", onPress: () => handleDelete(productId)},
			{text: "Não", onPress: () => {return;}}
		],
		{ cancelable: false }
		);
	};

    

	return (
		<Container>
			{error && <Text>{error}</Text>}
			{isLoading && <Loading/>}
			{products && products.length > 0 && !isLoading &&<ProductFlatList
				data={products}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item }) => (
					<>
						<ProductCard>
							<ProductInfo>
								{item.images[0] && <ProductImg source = {{ uri: config.API_URL + "/" + item.images[0].path }}/>}
								<TextGruop>
									<Text medium  heavy color = "#000">{item.name}</Text>
									<Text color = "#137C02">R${item.price.toFixed(2)}</Text>
									<Text small>{item.description.slice(0, 70)} ...</Text>
								</TextGruop>
							</ProductInfo>
							<ButtonGruop>
								<ButtonAction onPress = {() => alertDelete(item.id)}>
									<AntDesign name="delete" size={24} color="#FC0B0B" />
								</ButtonAction>
								<ButtonAction onPress = {() => navigation.navigate("Editar Produto", {
									productId: item.id,
									typeProduct: type
								})}>
									<MaterialCommunityIcons name="square-edit-outline" size={26} color="#0070E4" />
								</ButtonAction>
							</ButtonGruop>
                       
						</ProductCard>
						<Line/>
					</>
				)}
			/>} 
            
            

			{products && products.length <= 0  && !isLoading &&<Text center margin = "40px" color = "#FC0B0B">Não há nenhum {type} cadastrado!</Text>}
            
			<NormalButton onPress = {() => navigation.navigate("Cadastro de produto", {
				typeProduct: type
			})}>
				<Text center underline>Adicionar Novo {type}</Text>
			</NormalButton>
            
		</Container>
	);
};

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

const ProductFlatList = styled.FlatList`
    margin: 10px 20px;
    max-height: 90%;
`;

const ProductCard = styled.View`
    padding: 10px;
    margin-top: 10px;
`;

const ProductInfo = styled.View`
    flex-direction: row;
`;

const ProductImg = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-right: 10px;
`;

const TextGruop = styled.View`
    flex: 1;
    margin-bottom: 5px;
`;

const ButtonGruop = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

const ButtonAction = styled.TouchableOpacity`
    margin-left: 10px;
`;

const Line = styled.View`
    width: 90%;
    border: 1px solid #c4c4c4;
    align-self: center;
`;

const NormalButton = styled.TouchableOpacity`
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#0070E4",
	size: "small"
}))``;

export default MyProduct;
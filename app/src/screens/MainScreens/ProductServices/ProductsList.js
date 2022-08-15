import React, {useState, useCallback, useContext } from "react";
import { Alert } from "react-native";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { useNavigation ,useFocusEffect, useRoute } from "@react-navigation/native";
import styled from "styled-components";
import {Text, SimpleSearch } from "../../../components/index";
import ShimmerPlaceholderProduct from "./Components/ShimmerPlaceholderProduct";
import ProductCardList from "./Components/ProductCardList";


const ProductsList = () => {
	const [ products, setProducts ] = useState(null);
	const [ search, setSearch ] = useState("");
	const { isLoading, sendRequest, error, clearError } = useFetch();
	const auth = useContext(AuthContext);
	const navigation = useNavigation();
	const route = useRoute();
	const { userId, type } = route.params;
    
	useFocusEffect(
		useCallback(() => {
			clearError();
			navigation.setOptions({
				title: type === "Produto" ? "Produtos Oferecidos" : "Serviços Oferecidos" 
			});
			const fetchProducts = async() => {
				try {
					const { response } = await sendRequest(`${config.API_URL}/product/owner/products/?userOwnerId=${userId}&type=${type}`, "GET", null, {
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

	const handleSearch = async()=>{
		const { response } = await sendRequest(`${config.API_URL}/product/owner/products/?search=${search}&userOwnerId=${userId}&type=${type}`, "GET", null, {
			Authorization: "bearer " + auth.token
		});
		setProducts(response);   
	};

	return (
		<Container>
			{error && <Text>{error}</Text>}
			<SimpleSearch
				value ={search}
				onChangeText = {search => setSearch(search.trim())}
				handleSearch = {handleSearch}
				isLoading = {isLoading}
			/>
           
			{!isLoading && products && products.length > 0 &&
            <ProductFlatList
            	data={products}
            	keyExtractor={item => item.id.toString()}
            	renderItem={({ item }) => (
            		<ProductCardList item = {item} apiUrl = {config.API_URL}/>
            	)}
            />} 

			{isLoading &&
                <ShimmerPlaceholderProduct />
			}
            
			{!isLoading && products && products.length <= 0  && !isLoading &&<Text center margin = "40px" color = "#FC0B0B">Não há nenhum {type} encontrado!</Text>}
            
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

export default ProductsList;



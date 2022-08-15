import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { RefreshControl } from "react-native";
import * as Location from "expo-location";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import Text from "../../../components/Text";
import styled from "styled-components";
import FeedCardItem from "./Components/FeedCardItem";
import ShimmerPlaceHolderHome from "./Components/ShimmerPlaceHolderHome";

const HomeScreen = () => {
	const [ refreshing, setRefreshing ] = useState(false);
	const [feed, setFeed ] = useState(null);
	const [useLocation, setUseLocation] = useState();
	const auth = useContext(AuthContext);
	const { isLoading, sendRequest, error } = useFetch();

	useEffect(() =>{
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Precisamos da permissão para ter acesso a sua localização e continuar o processo!");
			}
			const userCoordinates = await Location.getCurrentPositionAsync({});
			setUseLocation(userCoordinates.coords);    
			fetchFeed(userCoordinates.coords);     
		})();

	},[]); 

	const fetchFeed = async(coordinates) => {
		try {
			const { response } = await sendRequest(`${config.API_URL}/product/feed`, "POST", 
				JSON.stringify({
					latitude: coordinates ? coordinates.latitude : null,
					longitude: coordinates ? coordinates.longitude : null,
				}),
				{
					Authorization: "bearer " + auth.token,
					"Content-Type": "application/json"
				});
			setFeed(response.product);
		} catch (err) {
			Alert.alert(err);
		}
	};

	const onRefreshFeed = async() =>{
		setRefreshing(true);
		await fetchFeed(useLocation);
		setRefreshing(false);
	};
    
	return (
		<Container>
			{isLoading && 
              <ShimmerPlaceHolderHome />
			}
            
			{feed && !isLoading && <FeedFlatList
				data={feed}
				keyExtractor={item => item.id.toString()}
				refreshControl = {
					<RefreshControl refreshing = {refreshing} onRefresh = {onRefreshFeed}/>
				}
				renderItem={({ item }) => (
					<FeedCardItem item = {item} apiUrl = {config.API_URL} key = {item.id}/>
				)}
			>
                
			</FeedFlatList>}
			{error && !isLoading && <Text center heavy>Nenhum produto foi encontrado</Text>}
		</Container>
	);
};

const Container = styled.View`
    flex: 1;
`;

const FeedFlatList = styled.FlatList``;

export default HomeScreen;





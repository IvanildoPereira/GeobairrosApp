import React, { useState, useRef, useContext, useEffect } from "react";
import { Alert, Dimensions } from "react-native";
import * as Location from "expo-location";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components";
import { Text, SimpleSearch } from "../../../components/index";
import config from "../../../../config";
import ProductCard from "./Components/ProductCard";
import ShimmerPlaceholderMap from "./Components/ShimmerPlaceholderMap";
import CalloutView from "./Components/CalloutView";
import { MaterialIcons } from "@expo/vector-icons"; 

const { height, width } = Dimensions.get("window");

const MapScreen = () => {
	//const _mark = useRef(null);
	const _map = useRef(null);
	const _scrollView = useRef(null);
	const [places, setPlaces] = useState();
	const [ search, setSearch ] = useState("");
	const [useLocation, setUseLocation] = useState();
	const auth = useContext(AuthContext);
	const { isLoading, sendRequest, error, clearError } = useFetch();
    
    
	useEffect(() =>{
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Precisamos da permissão para ter acesso a sua localização e continuar o processo!");
			}
			const userCoordinates = await Location.getCurrentPositionAsync({});
			setUseLocation(userCoordinates.coords);               
		})();

	},[]);

	useEffect(()=>{
		const findProduct = async() =>{
			try {
				const { response } = await sendRequest(
					`${config.API_URL}/product/map/nearest`,
					"POST",
					JSON.stringify({
						latitude: useLocation.latitude,
						longitude: useLocation.longitude,
					}),
					{
						Authorization: "Bearer " + auth.token,
						"Content-Type": "application/json",
					}
				);    
				setPlaces(response);
               
				if(response[0]){
					// eslint-disable-next-line no-undef
					setTimeout(()=> response[0].mark ? response[0].mark.showCallout() : "", 100);   
				}
                
			} catch (err) {
				clearError();
			}
		};
		findProduct();
	}, [auth.token, useLocation]);

    
    
    
	const handleSearch = async() => {
		try {
			const { response } = await sendRequest(
				`${config.API_URL}/product/map/nearest?search=${search}`,
				"POST",
				JSON.stringify({
					latitude: useLocation.latitude,
					longitude: useLocation.longitude,
				}),
				{
					Authorization: "Bearer " + auth.token,
					"Content-Type": "application/json",
				}
			);    
			setPlaces(response);   
            
			if(response[0]){
				// eslint-disable-next-line no-undef
				setTimeout(()=> response[0].mark && response[0].mark.showCallout(), 100); 
			}
               
            
                  
		} catch (err) {
			Alert.alert(err, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};


	const handleScrollCards = (e) =>{
		if(places.length >0){
			const placed = (e.nativeEvent.contentOffset.x > 0)
				? e.nativeEvent.contentOffset.x / Dimensions.get("window").width
				: 0;       
          
			const latitude = Number(places[Math.round(placed)].address.latitude);
			const longitude = Number(places[Math.round(placed)].address.longitude);
			let _mark_callout = places[Math.round(placed)].mark;                 
          
			_map.current.animateCamera({
				center:{
					latitude,
					longitude
				}
			}, 500);

			// eslint-disable-next-line no-undef
			setTimeout(() => {
				_mark_callout.showCallout();
			}, 500);
		}
	};

	const onMarkPress = (id) => {
		_scrollView.current.scrollTo({y: 0, x: (id * width)});
	};

 

	return (
		<Container>
            

			<SimpleSearch 
				value ={search}
				border = "none"
				margin = {height <= 568 ? "20px" : "40px 20px"}
				onChangeText = {search => setSearch(search.trim())}
				isLoading = {isLoading}
				handleSearch = {handleSearch}
				onSubmitEditing={handleSearch} 
			/>
                
               
               
			{error && <Text>{error}</Text>}

			{!isLoading && places && places.map((place) => (
				<Image 
					key = {place.id}
					style={{
						width: 0,
						height: 0,
					}}
					source={{ uri: config.API_URL + "/" + place.address.fachada_img }}
					resizeMode="cover"
				/>
			))}

			{useLocation &&
             <MapView 
             	initialRegion={{
             		latitude: useLocation.latitude,
             		longitude: useLocation.longitude,
             		latitudeDelta: 0.01,
             		longitudeDelta: 0.01,
             	}}
             	ref={_map}
             	style={{
             		width: Dimensions.get("window").width, 
             		height: Dimensions.get("window").height,
             		zIndex: -100,
             		position: "absolute"
             	}}
             	mapType = "standard"
             >
             	<Marker
             		coordinate={{latitude: useLocation.latitude, longitude: useLocation.longitude}}
             	>
             		<MaterialIcons name="my-location" size={35} color="#0070E4" />
             	</Marker>
             	{!isLoading && places && places.map((place, index) => (
             		<Marker 
             			key = {place.id}
             			ref = {_mark => place.mark = _mark}
             			onPress = {() => onMarkPress(index)}           
             			coordinate={{ latitude: Number(place.address.latitude), longitude: Number(place.address.longitude) }}
             		>
             			<Callout tooltip onPress = {()=> places[index].mark.hideCallout()}>
             				<CalloutView place = {place} apiUrl = {config.API_URL}/>
             			</Callout>
             		</Marker>
             	))}
               
             </MapView>}

			<ScrollViewContainer
				ref={_scrollView}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={handleScrollCards}
			>   
				{!isLoading && places && places.map((place) =>(
					<ProductCard key = {place.id} place = {place} apiUrl = {config.API_URL}  />
				))}

				{!isLoading && places && places.length <= 0 && 
                    <Card style = {{justifyContent: "center", alignItems: "center"}}>
                    	<Text small heavy color = "red">Nenhum produto/serviço proximo de você!</Text>
                    </Card>
				}

				{isLoading && 
                    <ShimmerPlaceholderMap />   
				}
			</ScrollViewContainer>

		</Container>
	);
};



const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;

const ScrollViewContainer = styled.ScrollView`
    max-height: ${height <= 568 ? `${parseInt(height*0.22)}px` : `${parseInt(height*0.15)}px`};
    margin-bottom: 20px;
`;

const Card = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #ffffff;
    width: ${width-40}px;
    margin: 0 20px;
    border-radius: 5px;
`;

const Image = styled.Image`
`;

export default MapScreen;





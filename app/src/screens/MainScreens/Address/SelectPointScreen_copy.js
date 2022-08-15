import React, { useState, useEffect, useContext } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import geojson  from "geojson-utils";
import styled from "styled-components";
import { Dimensions, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Text from "../../../components/Text";



const SelectPointScreen = () => {
	const [ selectedCoord, setSelectedCoord ] = useState({latitude: 0, longitude: 0});
	const [ initialCoord, setInitialCoord ] = useState();
	const [ placeCoord, setPlaceCoord ] = useState();
	const route = useRoute();
	const auth = useContext(AuthContext);
	const navigation = useNavigation();
	const { isLoading, sendRequest, error } = useFetch();
    

    
	useEffect(()=>{
		setInitialCoord({
			lat: Number(route.params.lat),
			long: Number(route.params.long)
		});
		if(route.params.type === "Minha Localização"){
			setSelectedCoord({latitude: route.params.lat, longitude: route.params.long});
		}
		if(route.params.geojson && route.params.geojsonType === "LineString"){
			let coordinates;
			coordinates = route.params.geojson.map((place) =>{
				return  {
					latitude : place[1],
					longitude : place[0]
				};
			});
			setPlaceCoord(coordinates);
		}
        
	}, [route]); 

	const handleMap = (event) =>{
		const lat = event.nativeEvent.coordinate.latitude;
		const long = event.nativeEvent.coordinate.longitude;
		let valid = 1;
		if(placeCoord){
			valid = placeCoord.filter((place) => {
				const meters = geojson.pointDistance({type: "Point", coordinates:[place.longitude, place.latitude]},
					{type: "Point", coordinates:[long,lat]});
				return meters <= 20;
			});
			if(valid.length > 0){
				setSelectedCoord({latitude: lat, longitude: long}); 
			}else{
				Alert.alert("Selecione um local a menos de vinte metros da linha!");
			} 
		}else{
			valid = geojson.pointDistance({type: "Point", coordinates:[initialCoord.long, initialCoord.lat]},
				{type: "Point", coordinates:[long,lat]});
			valid < 60 ? setSelectedCoord({latitude: lat, longitude: long}) : Alert.alert("Selecione um local a menos de 60 metros de sua localização!");
		}
        
            
           
	};

	const submitAddress = async() => {
		try {
			await sendRequest(
				"http://10.0.0.106:8000/address/create",
				"POST",
				JSON.stringify({
					logradouro: route.params.local,
					bairro: route.params.bairro,
					cidade: route.params.cidade, 
					uf: route.params.uf,
					latitude: selectedCoord.latitude,
					longitude: selectedCoord.longitude
				}),
				{
					Authorization: "Bearer " + auth.token,
					"Content-Type": "application/json",
				}
			);

			Alert.alert("Salvo", "Endereço Salvo com sucesso!", [
				{title: "Meus endereços", onPress: () => navigation.navigate("Meus Endereço")}
			]);
            
            
		} catch (err) {
			Alert.alert(err);
		}
	};
    

   
    
    


    
       
	return (
		<Container>
			{error && 
               <Text>{error}</Text>
			}
			{initialCoord &&
            
            <MapView 
            	initialRegion={{
            		latitude: initialCoord.lat,
            		longitude: initialCoord.long,
            		latitudeDelta: 0.008,
            		longitudeDelta: 0.008,
            	}}
            	style={{
            		width: Dimensions.get("window").width, 
            		height: Dimensions.get("window").height,
            		zIndex: -100,
            		position: "absolute"
            	}}
            	mapType = "standard"
            	onPress = { handleMap }
            >

            	{placeCoord && <Polyline coordinates={placeCoord}  strokeWidth = {5} strokeColor = "#0070E4"/>}    
            	{selectedCoord !== 0 && <Marker coordinate={{latitude: selectedCoord.latitude, longitude: selectedCoord.longitude}}/>}
            </MapView>
			}

			<ButtonSave onPress = {submitAddress}>
				{isLoading ? (
					<Loading />
				) : (
					<Text bold center color = "#fff">
                        Salvar
					</Text>
				)}
			</ButtonSave>
		</Container>
	);
};

const Container = styled.View`
    flex:1;
    justify-content: flex-end;
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#ffffff",
	size: "small"
}))``;

const ButtonSave = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: #0070E4;
    border-radius: 5px;
    margin-bottom: 40px;
`;

export default SelectPointScreen;
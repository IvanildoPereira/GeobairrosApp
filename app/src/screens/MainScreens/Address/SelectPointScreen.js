import React, { useState, useEffect, useContext } from "react";
import config from "../../../../config";
import { useRoute, useNavigation } from "@react-navigation/native";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import geojson  from "geojson-utils";
import styled from "styled-components";
import { Dimensions, Alert } from "react-native";
import MapView, { Marker, Geojson } from "react-native-maps";
import Text from "../../../components/Text";



const SelectPointScreen = () => {
	const [ selectedCoord, setSelectedCoord ] = useState({latitude: 0, longitude: 0});
	const [ initialCoord, setInitialCoord ] = useState();
	const [ placeCoord, setPlaceCoord ] = useState();
	const route = useRoute();
	const auth = useContext(AuthContext);
	const navigation = useNavigation();
	const { isLoading, sendRequest, error } = useFetch();

	let screenRoot = route.params.screenRoot;
    

    
	useEffect(()=>{
		setInitialCoord({
			lat: Number(route.params.lat),
			long: Number(route.params.long)
		});
		if(route.params.type === "Minha Localização"){
			setSelectedCoord({latitude: route.params.lat, longitude: route.params.long});
		}
		if(route.params.geojson){
			let placeGeoJson;
			placeGeoJson = {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: {},
						geometry: {
							type: route.params.geojsonType,
							coordinates: route.params.geojson
						}
					}
				]
			};
            
			setPlaceCoord(placeGeoJson);
		}
        
	}, [route]); 

	const handleMap = (event) =>{
		const lat = event.nativeEvent.coordinate.latitude;
		const long = event.nativeEvent.coordinate.longitude;
		let valid = 1;
		if(placeCoord && route.params.geojsonType === "LineString"){
			valid = route.params.geojson.filter((place) => {
				const meters = geojson.pointDistance({type: "Point", coordinates:[place[0], place[1]]},
					{type: "Point", coordinates:[long,lat]});
				return meters <= 20;
			});
            
			if(valid.length > 0){
				setSelectedCoord({latitude: lat, longitude: long}); 
			}else{
				Alert.alert("Selecione um local a menos de vinte metros da linha!");
			} 
		} if(placeCoord && route.params.geojsonType !== "LineString"){
			valid = geojson.pointInPolygon({"type":"Point","coordinates":[long,lat]},
				{"type": route.params.geojsonType, "coordinates": route.params.geojson});
			valid ? setSelectedCoord({latitude: lat, longitude: long}) : Alert.alert("Selecione um ponto dentro da Área!");
		}
        
		else{
			valid = geojson.pointDistance({type: "Point", coordinates:[initialCoord.long, initialCoord.lat]},
				{type: "Point", coordinates:[long,lat]});
			valid < 60 ? setSelectedCoord({latitude: lat, longitude: long}) : Alert.alert("Selecione um local a menos de 60 metros de sua localização!");
		}
        
            
           
	};

	const submitAddress = async() => {
		try {
			// eslint-disable-next-line no-undef
			const formData = new FormData();
			formData.append("fachada_img", route.params.fachada_img);
			formData.append("logradouro", route.params.local);
			formData.append("bairro", route.params.bairro);
			formData.append("cidade", route.params.cidade);
			formData.append("uf", route.params.uf);
			formData.append("latitude", selectedCoord.latitude);
			formData.append("longitude", selectedCoord.longitude);
			const { status } = await sendRequest(`${config.API_URL}/address/create`, "POST", formData, {
				Authorization: "Bearer " + auth.token,
			}
			);
             
			if(status){
				Alert.alert("Salvo", "Endereço Salvo com sucesso!", [
					{title: "Meus endereços", onPress: () => navigation.navigate(screenRoot)}
				]);
			}
         
            
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

            	{placeCoord && <Geojson geojson={placeCoord} tappable  strokeColor="red"  strokeWidth={2}/>}    
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

import React from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { Text } from "../../../../components/index";

const { width } = Dimensions.get("window");

const ProductCard = ({place, apiUrl}) => {
	const navigation = useNavigation();
	return (
		<Card onPress = {() => navigation.navigate("Details",{ productId: place.id })}>         
			<ImageCover source = {{uri: apiUrl+ "/" + place.images[0].path}} resizeMode = 'cover'/>
			<InfoCard>
				<Text small heavy color = "#000">{place.name}</Text>
				<Text color = "#137C02" small margin = "2px 0">R${place.price.toFixed(2)}</Text>
				<Text color = "#9FA2A5" tiny justify>{place.description.slice(0, 110)} ...</Text>
			</InfoCard>
		</Card>
	);
};

const Card = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #ffffff;
    width: ${width-40}px;
    margin: 0 20px;
    border-radius: 5px;
`;

const ImageCover = styled.Image`
    width: ${width *0.2}px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const InfoCard = styled.View`
    padding: 10px 20px;
    flex: 1;
`;

export default ProductCard;


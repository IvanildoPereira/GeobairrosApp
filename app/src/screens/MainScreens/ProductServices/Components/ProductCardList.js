import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { Text } from "../../../../components/index";

const ProductCardList = ({item, apiUrl }) => {
	const navigation = useNavigation();
	return (
		<>
			<ProductCard onPress = {() => navigation.navigate("Details", {
				productId: item.id
			})}>
				<ProductInfo>
					<ProductImg source = {{ uri: apiUrl + "/" + item?.images?.[0].path }}/>
					<TextGruop>
						<Text medium  heavy color = "#000">{item.name}</Text>
						<Text color = "#137C02">R${item.price.toFixed(2)}</Text>
						<Text small>{item.description.slice(0, 70)} ...</Text>
					</TextGruop>
				</ProductInfo>                                   
			</ProductCard>
			<Line/>
		</>
	);
};

const ProductCard = styled.TouchableOpacity`
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

const Line = styled.View`
    width: 90%;
    border: 1px solid #c4c4c4;
    align-self: center;
`;

export default ProductCardList;
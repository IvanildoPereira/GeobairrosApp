import React from "react";
import styled from "styled-components";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ShimmerPlaceholderProduct = () => {
	return (
		<ProductCard>
			<ProductInfo>
				<ShimmerPlaceholder visible = {false} style ={{height: 70, width: 70, borderRadius: 35, marginRight: 5}}/>
				<TextGruop>
					<ShimmerPlaceholder visible = {false} style ={{height: 20, width: "100%", marginBottom: 10, borderRadius: 5}}/>
					<ShimmerPlaceholder visible = {false} style ={{height: 18, width: "20%", marginBottom: 10, borderRadius: 5}}/>
					<ShimmerPlaceholder visible = {false} style ={{height: 40, width: "100%", marginBottom: 10, borderRadius: 5}}/>
				</TextGruop>
			</ProductInfo>                       
		</ProductCard>
	);
};

const ProductCard = styled.TouchableOpacity`
    padding: 10px;
    margin-top: 10px;
`;

const ProductInfo = styled.View`
    flex-direction: row;
`;

const TextGruop = styled.View`
    flex: 1;
    margin-bottom: 5px;
`;

export default ShimmerPlaceholderProduct;


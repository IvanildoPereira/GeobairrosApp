import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const { width } = Dimensions.get("window");

const ShimmerPlaceholderMap = () => {
	return (
		<Card>
			<ShimmerPlaceholder style = {{height: "100%", width: width *0.2,  borderTopLeftRadius:5, borderBottomLeftRadius: 5}}/>
			<InfoCard>
				<ShimmerPlaceholder style = {{height: "15%", width: "100%", marginBottom:10, borderRadius: 5}}/>
				<ShimmerPlaceholder style = {{height: "12%", width: "100%", marginBottom:10, borderRadius: 5}}/>
				<ShimmerPlaceholder style = {{height: "55%", width: "100%", marginBottom:10, borderRadius: 5}}/>
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
const InfoCard = styled.View`
    padding: 10px 20px;
    flex: 1;
`;


export default ShimmerPlaceholderMap;

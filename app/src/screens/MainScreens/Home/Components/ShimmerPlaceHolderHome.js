import React from "react";
import styled from "styled-components";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ShimmerPlaceHolderHome = () => {
	return (
		<>
			<FeedCard>
				<FeedHeader>
					<FeedAvatarContainer>
						<ShimmerPlaceholder visible = {false} style = {{height: "100%", width: "100%", borderRadius: 35}}/>
					</FeedAvatarContainer>
					<FeedHeaderInfo>
						<ShimmerPlaceholder visible = {false} style = {{height: 20, borderRadius: 5}}/>
						<ShimmerPlaceholder visible = {false} style = {{height: 18, width: "30%", borderRadius: 5, marginTop: 5}}/>
						<ShimmerPlaceholder visible = {false} style = {{height: 15, width: "20%", borderRadius: 5, marginTop: 2}}/>
					</FeedHeaderInfo>
				</FeedHeader>
				<Description>
					<ShimmerPlaceholder visible = {false} style = {{height: 16, width: "100%", borderRadius: 5}}/>
					<ShimmerPlaceholder visible = {false} style = {{height: 16, width: "100%", borderRadius: 5, marginTop: 10}}/>
					<ShimmerPlaceholder visible = {false} style = {{height: 16, width: "100%", borderRadius: 5, marginTop: 10}}/>
					<ShimmerPlaceholder visible = {false} style = {{height: 200, width: "100%", borderRadius: 5, marginTop: 10}}/>
				</Description>
			</FeedCard>
		</>
	);
};

const FeedCard = styled.TouchableOpacity`
    background-color: #ffffff;
    margin: 10px 20px;
    border-radius: 4px;
    padding: 15px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
`;


const FeedHeader = styled.View`
    flex-direction: row;    
`;


const FeedAvatarContainer = styled.View`
    border: #DADADA 1px solid;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin-right: 5px;
`;

const FeedHeaderInfo = styled.View`
flex:1;
`;

const Description = styled.View`
    margin: 10px;
`;

export default ShimmerPlaceHolderHome;



import React from "react";
import styled from "styled-components";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ShimmerPlaceholderFollow = () => {
	return (
		<>
			<UserInfo>
				<ShimmerPlaceholder visible = {false} style ={{height: 70, width: 70, borderRadius: 35}}/>
				<UserDetails>
					<ShimmerPlaceholder visible = {false} style ={{height: 20, width: "100%", marginBottom: 10, borderRadius: 5}}/>
					<ShimmerPlaceholder visible = {false} style ={{height: 50, width: "100%", marginBottom: 10, borderRadius: 5}}/>
				</UserDetails>
			</UserInfo>
		</>
	);
};

const UserInfo = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    margin: 10px;
    
`;

const UserDetails = styled.View`
    padding: 0px 10px;
    flex: 1;
`;

export default ShimmerPlaceholderFollow;



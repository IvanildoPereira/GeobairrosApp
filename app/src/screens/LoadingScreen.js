import React from "react";
import styled from "styled-components";
import Text from "../components/Text";


const LoadingScreen = () => {  
	return (
		<Container>
			<Text title heavy color = "#ffffff">GeoBairros App</Text>
		</Container>
	);
};

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #0070E4;
`;

export default LoadingScreen;



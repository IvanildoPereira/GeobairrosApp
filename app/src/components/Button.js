import React from "react";
import styled from "styled-components/native";
import Text from "./Text";

const ButtonStyle = ({...props}) =>{
	return(
		<Button {...props}>
			{props.isLoading ? (
				<Loading />
			) : (
				<Text bold center color = {props.color}>
					{props.title}
				</Text>
			)}
		</Button>
	);
};

const Button = styled.TouchableOpacity`
    height: 50px;
    align-items: center;
    justify-content: center; 
    background-color: ${props => props.backgroundColor ?? "#0070E4"};
    border-radius: 4px;
    margin: 20px 0;
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#ffffff",
	size: "small"
}))``;

export default ButtonStyle;


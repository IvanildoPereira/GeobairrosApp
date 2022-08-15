import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const SimpleSearch = ({isLoading, color, border, bgColor, margin, handleSearch, ...otherProps}) => {
	return (
		<Search bgColor = {bgColor} colorText = {color} border = {border} marginSearch = {margin}>
			<SearchInput 
				{...otherProps}
			/>
			<SearchButton onPress = {handleSearch} disable = {isLoading ? true : false}>
				{isLoading ? (
					<Loading/>  
				) : (
					<Ionicons name = "ios-search" size = {20} color = "#c4c4c4"/>   
				)}
			</SearchButton>          
		</Search>
	);
};


const { width } = Dimensions.get("window");

const Search = styled.View`
    width: ${Math.round(width) - 40}px;
    margin: ${props => props.marginSearch ?? "40px 20px 10px 20px"};
    flex-direction: row;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.bgColor ?? "#ffffff"};
    height: 50px;
    border-radius: 5px;
    border: ${props => props.border ?? "1px solid #000"};
`;

const SearchInput = styled.TextInput`
    width: 90%;
    color: ${props => props.colorText ?? "#000"};
`;

const SearchButton = styled.TouchableOpacity``;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#0070E4",
	size: "small"
}))``;

export default SimpleSearch;



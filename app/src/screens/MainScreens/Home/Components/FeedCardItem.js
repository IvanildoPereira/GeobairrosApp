import React from "react";
import styled from "styled-components";
import Text from "../../../../components/Text";
import moment from "moment";
import "moment/locale/pt-br"; 
import { useNavigation } from "@react-navigation/native";


const FeedCardItem = ({item, apiUrl}) => {
	const navigation = useNavigation();

	return (
		<FeedCard onPress = {() => navigation.navigate("Details",{ productId: item.id })}>
			<FeedHeader>
				<FeedAvatarContainer>
					<AvatarImg source = {{uri: `${apiUrl}/${item.userProduct.avatar_img}`}}/>
				</FeedAvatarContainer>
				<FeedHeaderInfo>
					<Text color = "#0070E4" medium heavy>{item.name}</Text>
					<Text small color = "#9FA2A5" margin = "2px 0">{moment(item.createdAt).locale("pt-br").fromNow()}</Text>
					<Text small color = "#137C02">R${item.price.toFixed(2)}</Text>
				</FeedHeaderInfo>
			</FeedHeader>
			<Description>
				<Text color = "#9FA2A5">
					{item.description}
				</Text>
			</Description>
			{item.images && item.images[0] &&
                <ImageIlustration source = {{uri: apiUrl + "/" + item.images[0].path}}
                	resizeMode = 'cover'
                />}
		</FeedCard>
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


const AvatarImg = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 35px;
`;


const FeedHeaderInfo = styled.View`
flex:1;
`;

const Description = styled.View`
    margin: 10px;
`;

const ImageIlustration = styled.Image`
    width: 100%;
    height: 200px;
`;

export default FeedCardItem;

import React, {useState, useEffect, useContext} from "react";
import { Alert, Dimensions, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { FontAwesome5, Feather, Ionicons } from "@expo/vector-icons"; 
import styled from "styled-components";
import Text from "../../../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";


const { width } = Dimensions.get("window");
const height = width * 0.8;

const ProductScreen = () => {
	const [ activeImage, setActiveImage ] = useState(0);
	const [ product, setProduct ] = useState();
	const [ user, setUser ] = useState();
	const [ images, setImages ] = useState();
	const [ address, setAddress ] = useState();
	const auth = useContext(AuthContext);
	const navigation = useNavigation();
	const route = useRoute();
	const { sendRequest, clearError } = useFetch();
    
    
	const changeDotImage = ({nativeEvent}) =>{
		const slide = Math.round(nativeEvent.contentOffset.x / width);
		if(slide !== activeImage){
			setActiveImage(slide);
		}
	};

	useEffect(() =>{
		let productId = route.params.productId;
		const fetchProduct = async() => {
			try {
				const { response } = await sendRequest(`${config.API_URL}/product/${productId}`, "GET", null, {
					Authorization: "bearer " + auth.token
				});
				setProduct(response.product);
				setUser(response.user);
				setImages(response.imagesUri);
				setAddress(response.address);
			} catch (err) {
				Alert.alert(err, [
					{text: "ok", onPress: () => clearError()}
				]);
			}
		};
		fetchProduct();
	},[]);
    
	return (
		<Container showsVerticalScrollIndicator = {false}>
			{images && 
            <ContainerSlider>
            	<BackButton onPress = {() => navigation.goBack()}>
            		<Ionicons name="ios-arrow-back" size={22} color="#fff" style = {{marginRight: 2}}/>
            	</BackButton>
            	<Slider pagingEnabled 
            		horizontal
            		showsHorizontalScrollIndicator = {false}
            		onScroll = {changeDotImage}
            	>
            		{
            			images.map(( image, index ) =>(
            				<Image
            					key = {index}
            					source = {{ uri: image.uri }}
            					resizeMode = 'cover'
            				/>
            			))
            		}
            	</Slider>
            	<DotContainer>
            		{
            			images.map((i,k) =>(
            				<Text 
            					key = {k} 
            					color = {activeImage === k ? "#fff": "#888"} 
            					margin = "3px"
            				>
                                ⬤
            				</Text>
            			))
            		}
            	</DotContainer>
            </ContainerSlider>
			} 
			<ContainerProductInfo>
				{product &&
                <ProductInfo>
                	<HeaderProduct>
                		<Text style = {{flex: 1}} color = "#0070E4" medium heavy>{product.name}</Text>
                		<Text color = "#137C02" medium heavy>R$ {product.price.toFixed(2)}</Text>
                	</HeaderProduct>
                	<BodyProduct>
                		<Text margin = "10px 0 10px 0">
                			{product.description}
                		</Text>
                		{product.whatsapp && product.whatsapp !== "undefined" &&
                        <WhatsappButton onPress = {() => Linking.openURL(`whatsapp://send?text=Olá gostaria de saber mais sobre o *${product.type} - ${product.name}*, poderia me informar?&phone=+55${product.whatsapp}`)}>
                        	<FontAwesome5 name="whatsapp" size={18} color="#137C02" style = {{marginRight: 5}}/>
                        	<Text color = "#137C02" >Contato</Text>
                        </WhatsappButton>}
                	</BodyProduct>
                </ProductInfo>
				}
				{user &&
                <UserInfo onPress = {() => user.id !== auth.userId && navigation.navigate("Perfil", {
                	perfilId: user.id
                })}>
                	<ImageAvatar source = {{ uri: user.avatar_img }}/>
                	<UserDetails>
                		<Text color = "#fff" medium heavy>{user.name}</Text>
                		<Text justify color = "#fff" small>
                			{user.description} 
                		</Text>
                	</UserDetails>
                </UserInfo>
				}    
				{product &&
                <CardContact>
                	{product.whatsapp && product.whatsapp !== "undefined" &&
                    <BoxContact>
                    	<Feather name="phone" size={24} color="black" style = {{marginRight: 10}}/>
                    	<BoxText>
                    		<TouchableOpacity onPress = {() => Linking.openURL(`tel:+55${product.whatsapp}`)}>
                    			<Text color = "#000" >{product.whatsapp}</Text>
                    		</TouchableOpacity>
                    	</BoxText>
                    </BoxContact>
                	}
                	{product.link && product.link !== "undefined" &&
                    <BoxContact>
                    	<Feather name="link" size={24} color="black" style = {{marginRight: 10}}/>
                    	<BoxText>
                    		<TouchableOpacity onPress = {() => Linking.openURL(product.link)}>
                    			<Text color = "#000" >{product.link}</Text>
                    		</TouchableOpacity>
                    	</BoxText>
                    </BoxContact>
                	}
                	<BoxContact>
                		<Feather name="mail" size={24} color="black" style = {{marginRight: 10}}/>
                		<BoxText>
                			{product &&<TouchableOpacity onPress = {() => Linking.openURL(`mailto: ${user.email}`)}>
                				{user && <Text color = "#000" >{user.email}</Text>}
                			</TouchableOpacity>}
                		</BoxText>
                	</BoxContact>
                	{address && <BoxContact>
                		<Feather name="map-pin" size={24} color="black" style = {{marginRight: 10}}/>
                		<BoxText>
                			{address.fachada_img && <ImageMap source = {{uri: address.fachada_img}}/>}
                			<Text color = "#000" >{address.logradouro}</Text>
                			<Text color = "#000" >{address.bairro}</Text>
                			<Text color = "#000" >{address.cidade} - {address.uf}</Text>
                			<TouchableOpacity onPress = {() => Linking.openURL(`http://www.google.com/maps/dir/?api=1&destination=${address.latitude},${address.longitude}`)}>
                				<Text color = "#0070E4" underline margin = "5px 0 0 0" >Ver Rotas</Text>
                			</TouchableOpacity>
                		</BoxText>
                        
                	</BoxContact>}
                </CardContact>
				}    
			</ContainerProductInfo>
		</Container>
	);
};

const Container = styled.ScrollView`
    flex: 1;
`;

const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 30px;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    width: 40px;
    height: 40px;
    border-radius: 20px;
    z-index: 2;
    justify-content: center;
    align-items: center;
`;

const ContainerSlider = styled.View`
    width: ${width}px;
    height: ${height}px;
`;

const Slider = styled.ScrollView`
`;

const Image = styled.Image`
    width: ${width}px;
    height: ${height}px;
`;

const DotContainer = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 40px; 
    align-self: center;
`;

const ContainerProductInfo = styled.View`
    margin-top: -30px;
    background-color: #fff;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    
`;

const ProductInfo = styled.View`
    padding: 20px;
`;

const HeaderProduct = styled.View`
    flex-direction: row;
    justify-content: space-between;

`;

const BodyProduct = styled.View`
`;

const WhatsappButton = styled.TouchableOpacity`
    flex-direction: row;
    border: #137C02 1px solid;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    align-self: center;
    height: 40px;
    width: 115px;
    margin-top: 5px;
`;

const UserInfo = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #0070E4;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    margin-right: 5px;
`;

const ImageAvatar = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 35px;
`;

const UserDetails = styled.View`
    padding: 0px 10px;
    flex: 1;
`;

const CardContact = styled.View`
    margin: 20px;  
    width: ${width - 40}px;
    border-radius: 0px;
    shadow-color: #888;
    shadow-opacity: 0.25;
    shadow-offset: 0px 2px;
    background-color: #fff;
    shadow-radius: 5px;
    elevation: 5;
    padding: 20px;
`;

const BoxContact = styled.View`
    flex-direction: row;
    margin: 10px 0;
`;

const BoxText = styled.View`
`;

const ImageMap = styled.Image`
    width: ${width - 115}px;
    height: ${height * 0.5}px;
    border-radius: 5px;
    margin-bottom: 5px;
`;

export default ProductScreen;
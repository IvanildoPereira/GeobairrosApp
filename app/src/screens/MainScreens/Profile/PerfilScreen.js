import React, { useState, useContext, useCallback } from "react";
import config from "../../../../config";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import Text from "../../../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const PerfilScreen = () => {
	const auth = useContext(AuthContext);
	const navigation = useNavigation();
	const [perfil, setPerfil] = useState();
	const [isFollowing, setIsFollowing] = useState();
	const route = useRoute();
	const { perfilId } = route.params;

	const { isLoading, sendRequest } = useFetch();

	useFocusEffect(
		useCallback(() => {
			const fetchPerfil = async()=>{
				const { response } = await sendRequest(`${config.API_URL}/perfil/one/${perfilId}`, "GET", null,{
					Authorization: "Bearer " + auth.token,
				});
                
				setPerfil(response.perfil);
				setIsFollowing(response.perfil.isFollowing);
			};
			fetchPerfil();
		}, [auth.token, perfilId])
	);

	const onFollow = async() =>{
		const { status } = await sendRequest(`${config.API_URL}/perfil/follow/${perfilId}`, "POST", null,{
			Authorization: "Bearer " + auth.token,
		});

		if(status){
			setIsFollowing(!isFollowing);
			setPerfil((prevPerfil) => {
				let updatePerfil = {
					...prevPerfil,
					numberOfFollowers: isFollowing ? prevPerfil.numberOfFollowers - 1 :  prevPerfil.numberOfFollowers + 1
				};
				return updatePerfil;
			});
		}
        
	};

	return (
		<ScrollViewContainer>
			<Container>

            
				<LinearGradient
					colors={["#0070E4", "#007AE7", "#0084E9", "#49525B"]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					locations={[0, 0.1866, 0.3936, 0.9592]}
					style= {{borderBottomLeftRadius: 5,borderBottomRightRadius: 5, paddingVertical: 50}}
                   
				>
                
					<UserAvatarContainer>

						<UserAvatar>
							<ShimmerPlaceholder visible = {!isLoading || perfil } shimmerStyle = {{width: 120, height: 120, borderRadius: 60}}>
								<UserAvatarImg source = {{ uri: perfil?.avatar_img}}/>
							</ShimmerPlaceholder>
						</UserAvatar>

						<ShimmerPlaceholder visible = {!isLoading || perfil } shimmerStyle = {{borderRadius: 3, marginVertical: 10, height: 25}} >
							<Text heavy center large margin = "10px 30px" color = "#fff">{perfil?.name}</Text>
						</ShimmerPlaceholder>

						{perfil && <FollowButton onPress = {onFollow}>
							<Text color = "#000;" heavy>{isFollowing ? "- Seguindo" : "+ Seguir"}</Text>
						</FollowButton>}

					</UserAvatarContainer>

                
				</LinearGradient>

				<NumberInfoContainer>
					<InfoNumber>
						{isLoading && !perfil && 
                        <>
                        	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, width: 40, height: 25}} />
                        	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, marginTop: 5, width: 50}} />   
                        </>
						}
						{perfil &&
                        <>
                        	<Text large>{perfil?.numberOfProducts}</Text>
                        	<Text heavy>Produtos</Text></>}
                        
					</InfoNumber>
					<Border/>
					<InfoNumber>
						{isLoading && !perfil && 
                            <>
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, width: 40, height: 25}} />
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, marginTop: 5, width: 50}} />   
                            </>
						}
						{perfil &&
                            <>
                            	<Text large>{perfil?.numberOfServices}</Text>
                            	<Text heavy>Serviços</Text>
                            </>
						}
                        
					</InfoNumber>
					<Border/>
					<InfoNumber>
						{isLoading && !perfil &&
                            <>
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, width: 40, height: 25}} />
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, marginTop: 5, width: 50}} />   
                            </>
						}
						{perfil &&
                            <>
                            	<Text large>{perfil?.numberOfFollowers}</Text>
                            	<Text heavy>Seguidores</Text>
                            </>
						}
                        
					</InfoNumber>
				</NumberInfoContainer>

				<Description>
					<Text heavy medium>Sobre:</Text>
					{isLoading && !perfil &&
                    <>
                    	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: "100%", height: 20}}/>
                    	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: "100%", height: 20}}/>
                    	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: "100%", height: 20}}/>
                    </>
					}
					{perfil && <Text small  margin = "5px 0 ">{perfil?.description}</Text>}
				</Description>

				{isLoading && !perfil &&
              <>
              	<ProductServicesContainer>
              		<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: 120, height: 20}}/>
              		<ImagesContainer>
              			<ShimmerPlaceholder shimmerStyle = {{borderRadius: 5, marginTop: 5, width: 75, height: 75, marginRight: 5}}/>
              			<ShimmerPlaceholder shimmerStyle = {{borderRadius: 5, marginTop: 5, width: 75, height: 75, marginRight: 5}}/>
              		</ImagesContainer>
              	</ProductServicesContainer>
              	<ProductServicesContainer>
              		<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: 120, height: 20}}/>
              		<ImagesContainer>
              			<ShimmerPlaceholder shimmerStyle = {{borderRadius: 5, marginTop: 5, width: 75, height: 75, marginRight: 5}}/>
              			<ShimmerPlaceholder shimmerStyle = {{borderRadius: 5, marginTop: 5, width: 75, height: 75, marginRight: 5}}/>
              		</ImagesContainer>
              	</ProductServicesContainer>
              </>         
          
				}

				{perfil && perfil.products.length > 0 && <ProductServicesContainer>
					<Text heavy medium>Produtos Oferecidos:</Text>
					<ImagesContainer>
						{perfil.products.map(product =>(
							<TouchableWithoutFeedback key = {product.id} onPress = {() => navigation.navigate("Details", {
								productId: product.id
							})}>
								<ImageBox key = {product.id}>
									<ImageIllustration  source = {{uri: config.API_URL + "/" + product.images[0].path}}/>
								</ImageBox>
							</TouchableWithoutFeedback>
						))}
                    
					</ImagesContainer>
					<SeeMoreButton onPress = {() => navigation.navigate("Produtos Oferecidos", {
						userId: perfil.id,
						type: "Produto"
					})}>
						<Text center underline medium margin = "20px 0 0 0" color = "#0070E4;">Ver Todos os Produtos</Text>
					</SeeMoreButton>
                
				</ProductServicesContainer>}

				{perfil && perfil.services.length > 0 &&<ProductServicesContainer>
					<Text heavy medium>Serviços Oferecidos:</Text>
					<ImagesContainer>
						{perfil.services.map(service =>(
							<TouchableWithoutFeedback key = {service.id} onPress = {() => navigation.navigate("Details", {
								productId: service.id
							})}>
								<ImageBox>
									<ImageIllustration  source = {{uri: config.API_URL + "/" + service.images[0].path}}/>
								</ImageBox>
							</TouchableWithoutFeedback>
						))}
                    
					</ImagesContainer>

					<SeeMoreButton onPress = {() => navigation.navigate("Produtos Oferecidos", {
						userId: perfil.id,
						type: "Serviço"
					})}>
						<Text center underline medium margin = "20px 0 0 0" color = "#0070E4;">Ver Todos os Serviços</Text>
					</SeeMoreButton>
                
				</ProductServicesContainer>}
			</Container>
		</ScrollViewContainer>
	);
};

const { width } = Dimensions.get("window");

const ScrollViewContainer = styled.ScrollView`
`;

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    padding:0 0 50px 0;
`;

//const UserHeader = styled.View``;

const UserAvatarContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

const UserAvatar = styled.TouchableOpacity`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
`;

const UserAvatarImg = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
`;

const FollowButton = styled.TouchableOpacity`
    background-color: #fff;
    padding: 5px 20px;
    margin: 10px 0 20px 0;
    border-radius: 10px;
`;


const NumberInfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    background-color: #fff;
    padding: 15px;
    width: ${width - 40}px;
    height: 80px;
    margin: -45px 20px 20px 20px;
    border-radius: 5px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 9px;
    elevation: 9;
`;

const InfoNumber = styled.View`
    align-items: center;
    justify-content: center;
    
    
`;

const Border = styled.View`
    border-right-width: 1px;
    border-color: #9FA2A5;
`;

const Description = styled.View`
    margin: 20px 30px 10px 30px;
`;

const ProductServicesContainer = styled.View`
     margin: 10px 30px;
`;


const ImagesContainer = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;

const ImageBox = styled.View`
    margin-right: 15px;
    margin-bottom: 5px;
    border-radius: 5px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 2px;
    elevation: 2;
`;

const ImageIllustration = styled.Image`
    width: 75px;
    height: 75px;
`;

const SeeMoreButton = styled.TouchableOpacity``;

export default PerfilScreen;






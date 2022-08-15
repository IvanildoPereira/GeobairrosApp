import React, { useState, useContext, useCallback } from "react";
import config from "../../../../config";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import Text from "../../../components/Text";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ProfileScreen = () => {
	const auth = useContext(AuthContext);
	const navigation = useNavigation();
	const [user, setUser] = useState();

	const { isLoading, sendRequest } = useFetch();
	useFocusEffect(
		useCallback(() => {
			const fetchUser = async()=>{
				const { response } = await sendRequest(`${config.API_URL}/perfil/one/${auth.userId}`, "GET", null,{
					Authorization: "Bearer " + auth.token,
				});
				setUser(response.perfil);
			};
			fetchUser();
		}, [auth.token])
	);

	const onLogout = () =>{
		auth.logout();
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
							<ShimmerPlaceholder visible = {!isLoading || user} shimmerStyle = {{width: 120, height: 120, borderRadius: 60}}>
								<UserAvatarImg source = {{ uri: user?.avatar_img}}/>
							</ShimmerPlaceholder>
                        
						</UserAvatar>
						<ShimmerPlaceholder visible = {!isLoading || user} shimmerStyle = {{borderRadius: 3, marginVertical: 10, height: 25}} >
							<Text heavy center large margin = "10px 30px" color = "#fff">{user?.name}</Text>
						</ShimmerPlaceholder>
						{user && <LogoutButton onPress = {onLogout}>
							<Text color = "#000;" heavy>Sair</Text>
						</LogoutButton>}
                    
					</UserAvatarContainer>

                
				</LinearGradient>

				<NumberInfoContainer>
					<InfoNumber>
						{isLoading && !user && 
                        <>
                        	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, width: 40, height: 25}} />
                        	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, marginTop: 5, width: 50}} />   
                        </>
						}
						{user &&
                        <>
                        	<Text large>{user?.numberOfProducts}</Text>
                        	<Text heavy>Produtos</Text></>}
                        
					</InfoNumber>
					<Border/>
					<InfoNumber>
						{isLoading && !user && 
                            <>
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, width: 40, height: 25}} />
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, marginTop: 5, width: 50}} />   
                            </>
						}
						{user &&
                            <>
                            	<Text large>{user?.numberOfServices}</Text>
                            	<Text heavy>Serviços</Text>
                            </>
						}
                        
					</InfoNumber>
					<Border/>
					<InfoNumber>
						{isLoading && !user &&
                            <>
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, width: 40, height: 25}} />
                            	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 3, marginTop: 5, width: 50}} />   
                            </>
						}
						{user &&
                            <>
                            	<Text large>{user?.numberOfFollowers}</Text>
                            	<Text heavy>Seguidores</Text>
                            </>
						}
                        
					</InfoNumber>
				</NumberInfoContainer>

				<Description>
					<Text heavy medium>Sobre:</Text>
					{isLoading && !user &&
                    <>
                    	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: "100%", height: 20}}/>
                    	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: "100%", height: 20}}/>
                    	<ShimmerPlaceholder shimmerStyle = {{borderRadius: 4, marginTop: 5, width: "100%", height: 20}}/>
                    </>
					}
					{user && <Text small  margin = "5px 0 ">{user?.description}</Text>}
				</Description>

				{user && <EditProfileButton onPress = {() => navigation.navigate("Atualizar Perfil")}>
					<Text color = "#A0A3A6">Editar Perfil</Text>
				</EditProfileButton>}

				{isLoading && !user &&
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

				{user && user.products.length > 0 && 
            <ProductServicesContainer>
            	<Text heavy medium>Produtos Oferecidos:</Text>
            	<ImagesContainer>
            		{user.products.map(product =>(
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
            		userId: user.id,
            		type: "Produto"
            	})}>
            		<Text center underline medium margin = "20px 0 0 0" color = "#0070E4;">Ver Todos os Produtos</Text>
            	</SeeMoreButton>
                
            </ProductServicesContainer>}

				{user && user.services.length > 0 && <ProductServicesContainer>
					<Text heavy medium>Serviços Oferecidos:</Text>
					<ImagesContainer>
						{user.services.map(service =>(
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
						userId: user.id,
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
    background-color: #0070E4;
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

const LogoutButton = styled.TouchableOpacity`
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

const EditProfileButton = styled.TouchableOpacity`
    border: #A0A3A6 solid 1px;
    align-self: center;
    padding: 10px 40px;
    border-radius: 20px;
    margin-bottom: 10px;
`;

const ImagesContainer = styled.View`
    flex-direction: row;
    margin-top: 10px;
`;

const ImageBox = styled.View`
    margin-right: 15px;
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

export default ProfileScreen;






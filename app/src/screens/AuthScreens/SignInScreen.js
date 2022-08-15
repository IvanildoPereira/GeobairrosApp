import React, { useContext } from "react";
//import { Alert } from "react-native";
import config from "../../../config";
import { AuthContext } from "../../context/auth-context";
import useFetch from "../../hooks/useFetch";
import SignInForm from "./components/SignInForm";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HeaderCircle from "./components/HeaderCircle";
import { Text, FormContainer } from "../../components/index";

const SignInScreen = ({ navigation }) => {
	const auth = useContext(AuthContext);    
	const { isLoading, sendRequest, error, clearError } = useFetch();
      
	const handleLogin = async(values) =>{
		clearError();
		try {    
			const { response } = await sendRequest(
				`${config.API_URL}/users/login`,
				"POST",
				JSON.stringify({
					email: values.email,
					password: values.password
				}),
				{
					"Content-Type": "application/json",
				}
			);
          
			auth.login(response.id, response.token);

		} catch(err){
			// eslint-disable-next-line no-undef
			console.log("");
		}
	};

	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
			<Container>

				<Main>
					<Text title bold center color = "#fff">
                        GeoBairros
					</Text>
				</Main>

				<Auth>
					<FormContainer>
						<Slogan>
							<Text medium heavy center color = "#000">
                                Divulgue Sonhos
							</Text> 
							<Text medium heavy center color = "#000">
                                Busque Soluções!
							</Text>
						</Slogan>  

						<Text small heavy justify color = "#9FA2A5" margin = "0 0 10px 0">
                                Encontre os produtos e serviços que são vendidos em seu bairro.
						</Text>

						{error && <Text color = "red" small bold center>{error}</Text>}

						<SignInForm 
							isLoading = {isLoading}
							handleLogin = {handleLogin}  
						/>
                        
					</FormContainer>

					<SignUp onPress = {() => navigation.navigate("SignUp")}>
						<Text  center color = "#9FA2A5">Não tem uma conta? 
							<Text underline> Registrar agora</Text></Text>
					</SignUp>
				</Auth>

				<HeaderCircle/>
                
			</Container>
		</KeyboardAwareScrollView>
	);
};

const Container = styled.View`
    flex: 1;
`;

const Main = styled.View`
    margin-top: 20%;
`;

const Auth = styled.View`
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
`;

const Slogan = styled.View`
    margin: 10px 0;
`;

const SignUp = styled.TouchableOpacity`
    margin: 30px 0;
`;

export default SignInScreen;

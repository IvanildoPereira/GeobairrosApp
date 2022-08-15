import React from "react";
import { Alert } from "react-native";
import config from "../../../config";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";
import HeaderCircle from "./components/HeaderCircle";
import SignUpForm from "./components/SignUpForm";
import { Text, FormContainer } from "../../components/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = ({ navigation }) => {
	const { isLoading, sendRequest, error, clearError } = useFetch();

	const handleSignUp = async(values) =>{
		clearError();
		try {       
			const { status } = await sendRequest(
				`${config.API_URL}/users/register`,
				"POST",
				JSON.stringify({
					name: values.nome,
					email: values.email,
					password: values.password
				}),
				{
					"Content-Type": "application/json",
				}
			);
            
			if(status){
				Alert.alert("Registrado", "Usuario Criado com Sucesso", [
					{text: "Logar", onPress: () => navigation.navigate("SignIn")}
				]);
			}

		} catch(err){
			Alert.alert("Error", err, [
				{text: "ok", onPress: () => null}
			]);
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
                
						<Text small heavy justify color = "#9FA2A5" margin = "0 0 10px 0">
                                Registre-se agora e tenha acesso aos produtos e serviços de sua comunidade!
						</Text>

						{error && <Text color = "red" small bold center>{error}</Text>}

						<SignUpForm
							isLoading = {isLoading}
							handleSignUp = {handleSignUp}
						/>

					</FormContainer>
                    
					<SignIn onPress = {() => navigation.navigate("SignIn")}>
						<Text  center color = "#9FA2A5">Já tem uma conta? 
							<Text> Login</Text></Text>
					</SignIn>
				</Auth>
                
				<HeaderCircle />

			</Container>
		</KeyboardAwareScrollView>
       
	);
};

const Container = styled.View`
    flex: 1;
`;

const Main = styled.View`
    margin-top: 10%;
`;

const Auth = styled.View`
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
`;

const SignIn = styled.TouchableOpacity`
    margin: 30px 0;
`;

export default SignUpScreen;









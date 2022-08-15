import React, { useState, useEffect, useRef, useContext} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import styled from "styled-components";
import Text from "../../../components/Text";
import { Keyboard, Alert } from "react-native";


const AddressUpdateForm = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { isLoading, sendRequest, error, clearError } = useFetch();
	const auth = useContext(AuthContext);
	const { addressId } = route.params;
	const [ address, setAddress ] = useState(null);
	const localRef = useRef(null);
	const bairroRef = useRef(null);
	const cidadeRef = useRef(null);
	const ufRef = useRef(null);


	const FormSchema = Yup.object().shape({
		local: Yup.string().required("Campo obrigatório!"),
		bairro: Yup.string().required("Campo obrigatório!"),
		cidade: Yup.string().required("Campo obrigatório!"),
		uf: Yup.string().required("Campo obrigatório!"),
	});

    
	useEffect(() =>{
		const fetchAddress = async() => {
			try {
				const { response } = await sendRequest(`${config.API_URL}/address/${addressId}`, "GET", null, {
					Authorization: "bearer " + auth.token
				});

				setAddress(response[0]);

			} catch (err) {
				Alert.alert("Error", err, [
					{text: "ok", onPress: () => clearError()}
				]);
			}
		};
		fetchAddress();
	},[route.params]);

	const submitUpdate = async (values) =>{
		try {
           
			const { status } = await sendRequest(
				`${config.API_URL}/address/update/${addressId}`,
				"POST",
				JSON.stringify({
					logradouro: values.local,
					bairro: values.bairro,
					cidade: values.cidade,
					uf: values.uf
				}),
				{
					"Content-Type": "application/json",
					Authorization: "bearer " + auth.token
				}
			);
            
			if(status){
				Alert.alert("Atualizado", "Atualizado com Sucesso", [
					{text: "Entendi", onPress: () => navigation.goBack()}
				]);
			}
            
            
		} catch (err) {
			Alert.alert("Error", err, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};
    
    
    

    
    
	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
			<Container>
				{error && <Text>{error}</Text>}
				{address &&<Formik
					initialValues={{
						local: address.logradouro,
						bairro: address.bairro,
						cidade: address.cidade,
						uf: address.uf
					}}

					onSubmit={values => {
						Keyboard.dismiss();
						submitUpdate(values);
					}}
					validationSchema={FormSchema}>
					{({
						values,
						handleChange,
						handleSubmit,
						errors,
						touched,
						setFieldTouched,
					}) => (
						<AddressFormContainer>
               
							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Endereço:</Text>

							<AddressField
								ref = {localRef}
								autoCapitalize = "none"
								autoCorrect = {false}
								autoFocus = {false}
								value={values.local}
								onChangeText={handleChange("local")}
								onBlur={() => setFieldTouched("local", true)}
							/>      
                
							{errors.local && touched.local && (
								<Text color = "red" small bold>{errors.local}</Text>
							)}

							<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">Bairro:</Text>
                
							<AddressField
								ref = {bairroRef}
								autoCapitalize = "none"
								autoCorrect = {false}
								autoFocus = {false}
								value={values.bairro}
								onChangeText={handleChange("bairro")}
								onBlur={() => setFieldTouched("bairro", true)}
							/>  
                
							{errors.bairro && touched.bairro && (
								<Text color = "red" small bold>{errors.bairro}</Text>
							)}

							<RowContainer>
								<RowBig>
									<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">Cidade:</Text>

									<AddressField
										ref = {cidadeRef}
										autoCapitalize = "none"
										autoCorrect = {false}
										autoFocus = {false}
										value={values.cidade}
										onChangeText={handleChange("cidade")}
										onBlur={() => setFieldTouched("cidade", true)}
									/>   
                
									{errors.cidade && touched.cidade && (
										<Text color = "red" small bold>{errors.cidade}</Text>
									)}

								</RowBig>
								<RowSmall>
									<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">UF:</Text>

									<AddressField
										ref = {ufRef}
										autoCapitalize = "characters"
										autoCorrect = {false}
										autoFocus = {false}
										maxLength={2}
										value={values.uf}
										onChangeText={handleChange("uf")}
										onBlur={() => setFieldTouched("uf", true)} />   
									{errors.uf && touched.uf && (
										<Text color = "red" small bold>{errors.uf}</Text>
									)}
								</RowSmall>
							</RowContainer>

							<ButtonNext onPress = {handleSubmit}>
								{isLoading ? (
									<Loading />
								) : (
									<Text bold center color = "#fff">Atualizar</Text>
								)}
							</ButtonNext>

						</AddressFormContainer>
					)}
				</Formik>
				}
			</Container>
		</KeyboardAwareScrollView>
	);
};

const Container = styled.View`
    flex: 1;
`;



const AddressFormContainer = styled.View`
    margin: 20px;
`;

const AddressField = styled.TextInput`
    height: 50px;
    margin-bottom: 5px;
    border: solid 1px #9FA2A5;
    border-radius: 4px;
    padding: 10px;
    color: #9FA2A5;
`;

const RowContainer = styled.View`
    flex-direction: row;
`;

const RowBig = styled.View`
    width: 70%;
    margin-right: 5%;
`;

const RowSmall = styled.View`
    width: 25%;
`;

const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#ffffff",
	size: "small"
}))``;

const ButtonNext = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    align-items: center;
    justify-content: center; 
    align-self: center;
    background-color: #0070E4;
    border-radius: 4px;
    margin: 20px;
`;

export default AddressUpdateForm;

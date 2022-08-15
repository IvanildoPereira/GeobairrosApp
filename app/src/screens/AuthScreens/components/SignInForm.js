import React, { useRef } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components";
import {Formik} from "formik";
import * as Yup from "yup";
import { Text, TextInput, PasswordInput, Button } from "../../../components/index";

const SignInForm = ({isLoading, handleLogin}) =>{
	const email = useRef(null);
	const password = useRef(null);

	const FormSchema = Yup.object().shape({
		email: Yup.string().required("Campo obrigatório!").email("Email invalido!"),
		password: Yup.string()
			.required("Campo obrigatório!")
			.min(8, "Digite pelo menos 8 caracteres!"),
	});

	return(
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={values => {
				Keyboard.dismiss();
				handleLogin(values);
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
				<AuthForm>
					<Text medium heavy justify color = "#000" margin = "0px 0 10px 0"> 
                        Email:
					</Text>

					<TextInput
						ref={email}
						autoCapitalize = "none"
						autoCompleteType = "email"
						autoCorrect = {false}
						autoFocus = {false}
						keyboardType = "email-address"
						value={values.email}
						onChangeText={handleChange("email")}
						nBlur={() => setFieldTouched("email", true)}
						error = {errors.email}
						touched={touched.email}
						onSubmitEditing={() => password.current?.focus()} 
					/>
                                    
					<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                        Senha:
					</Text>
                                
					<PasswordInput
						ref={password}
						value={values.password}
						onChangeText={handleChange("password")}
						onBlur={() => setFieldTouched("password", true)}
						onSubmitEditing={() => handleSubmit()}
						error = {errors.password}
						touched = {touched.password}
					/>                           
                        
					<Button
						title = "Entrar"
						backgroundColor = "#0070E4"
						color = "#ffffff"
						isLoading = {isLoading}
						onPress = {handleSubmit}     
					/>           
                                   
					{/*<Text  center color = "#9FA2A5" underline>Esqueci a senha</Text>*/}
				</AuthForm>
			)}
		</Formik>
	);
};

const AuthForm = styled.View`
`;

export default SignInForm;

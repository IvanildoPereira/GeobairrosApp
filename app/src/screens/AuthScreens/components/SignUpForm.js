import React, { useRef } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components";
import {Formik} from "formik";
import * as Yup from "yup";
import { Text, TextInput, PasswordInput, Button } from "../../../components/index";

const SignUpForm = ({isLoading, handleSignUp}) =>{
	const nome = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const matchPassword = useRef(null);

	const FormSchema = Yup.object().shape({
		nome: Yup.string().required("Campo obrigatório!")
			.min(8, "Digite pelo menos 8 caracteres!"),
		email: Yup.string().required("Campo obrigatório!").email("Email invalido!"),
		password: Yup.string()
			.required("Campo obrigatório!")
			.min(8, "Digite pelo menos 8 caracteres!"),
		matchPassword: Yup.string().required("Campo obrigatório!")
			.oneOf([Yup.ref("password"), null], "Repita a mesma senha!")
	});

	return(
		<Formik
			initialValues={{
				nome: "",
				email: "",
				password: "",
				matchPassword:""
			}}
			onSubmit={values => {
				Keyboard.dismiss();
				handleSignUp(values);
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
                        Nome:
					</Text>

					<TextInput
						ref = {nome}
						autoCapitalize = "words"
						autoCorrect = {false}
						autoFocus = {false}
						value={values.nome}
						onChangeText={handleChange("nome")}
						onBlur={() => setFieldTouched("nome", true)}
						error = {errors.nome}
						touched = {touched.nome}
					/>

					<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                    Email:
					</Text>

					<TextInput
						ref = {email}
						autoCapitalize = "none"
						autoCompleteType = "email"
						autoCorrect = {false}
						keyboardType = "email-address"
						value={values.email}
						onChangeText={handleChange("email")}
						onBlur={() => setFieldTouched("email", true)}
						error = {errors.email}
						touched = {touched.email}
					/>

					<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                    Senha:
					</Text>

					<PasswordInput
						ref={password}
						value={values.password}
						onChangeText={handleChange("password")}
						onBlur={() => setFieldTouched("password", true)}
						error = {errors.password}
						touched = {touched.password}
					/>

					<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                    Repetir Senha:
					</Text>
                
					<PasswordInput
						ref = {matchPassword}
						value={values.matchPassword}
						onChangeText={handleChange("matchPassword")}
						onBlur={() => setFieldTouched("matchPassword", true)}
						error = {errors.matchPassword}
						touched = {touched.matchPassword}
					/>

					<Button
						title = "Salvar"
						backgroundColor = "#0070E4"
						color = "#ffffff"
						isLoading = {isLoading}
						onPress = {handleSubmit}
					/>
  
				</AuthForm>
			)}
                       
		</Formik>
	);
};

const AuthForm = styled.View``;

export default SignUpForm;
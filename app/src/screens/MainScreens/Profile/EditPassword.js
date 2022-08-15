import React, { useRef, useContext } from "react";
import { Keyboard, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Formik} from "formik";
import * as Yup from "yup";
import config from "../../../../config";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { Text, PasswordInput, Button } from "../../../components/";
import styled from "styled-components";

const EditPassword = () => {
	const navigation = useNavigation();
	const { isLoading, sendRequest, clearError } = useFetch();
	const auth = useContext(AuthContext);

	const actualPassword = useRef(null);
	const newPassword = useRef(null);
	const matchNewPassword = useRef(null);

	const FormSchema = Yup.object().shape({
		actualPassword: Yup.string().required("Campo obrigatório!").min(8, "Digite pelo menos 8 caracteres!"),
		newPassword: Yup.string().required("Campo obrigatório!").min(8, "Digite pelo menos 8 caracteres!"),
		matchNewPassword: Yup.string().required("Campo obrigatório!").oneOf([Yup.ref("newPassword"), null], "Repita a mesma senha!")
	});

	const submitPassword = async(values) =>{
		try {
			const { status } = await sendRequest(
				`${config.API_URL}/users/password/update`,
				"POST",
				JSON.stringify({
					oldPassword: values.actualPassword,
					newPassword: values.newPassword
				}),
				{
					"Content-Type": "application/json",
					Authorization: "bearer " + auth.token
				}
			);
            
			if(status){
				Alert.alert("Registrado", "Usuario Criado com Sucesso", [
					{text: "Logar", onPress: () => navigation.navigate("Meu Perfil")}
				]);
			}
            
		} catch (err) {
			Alert.alert(err, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};

	return (
		<Container>
			<Formik
				initialValues={{
					actualPassword: "",
					newPassword: "",
					matchNewPassword:""
				}}
				onSubmit={values => {
					Keyboard.dismiss();
					submitPassword(values);
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
					<PasswordForm>
                            

						<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                                Senha Atual:
						</Text>

						<PasswordInput
							ref = {actualPassword}
							value={values.actualPassword}
							onChangeText={handleChange("actualPassword")}
							onBlur={() => setFieldTouched("actualPassword", true)}
							error = {errors.actualPassword}
							touched = {touched.actualPassword}
						/>

                           

						<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                                Nova Senha:
						</Text>

						<PasswordInput
							ref = {newPassword}
							value={values.newPassword}
							onChangeText={handleChange("newPassword")}
							onBlur={() => setFieldTouched("newPassword", true)}
							error = {errors.newPassword}
							touched = {touched.newPassword}
						/>

                            
						<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                                Repetir Nova Senha:
						</Text>

						<PasswordInput
							ref = {matchNewPassword}
							value={values.matchNewPassword}
							onChangeText={handleChange("matchNewPassword")}
							onBlur={() => setFieldTouched("matchNewPassword", true)}
							error = {errors.matchNewPassword}
							touched = {touched.matchNewPassword}
						/>

                                       

						<Button
							title = "Atualizar Senha"
							backgroundColor = "#0070E4"
							color = "#ffffff"
							isLoading = {isLoading}
							onPress = {handleSubmit}
						/>
                        
					</PasswordForm>
				)}
			</Formik>
		</Container>
	);
};


const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;


const PasswordForm = styled.View`
    margin: 10px 20px;
`;

export default EditPassword;




import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import config from "../../../../config";
import { Platform, Alert, Dimensions, Keyboard } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; 
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {Formik} from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/auth-context";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";
import Text from "../../../components/Text";



const EditProfileScreen = () => {
	const auth = useContext(AuthContext);
	const [ user, setUser ] = useState(null);
	const [image, setImage] = useState(null);
	const nome = useRef(null);
	const email = useRef(null);
	const description = useRef(null);
	const navigation = useNavigation();
	const { isLoading, sendRequest, error, clearError } = useFetch();

    
	useEffect(()=>{
		const fetchUser = async()=>{
			const { response } = await sendRequest(`${config.API_URL}/users/`, "GET", null,{
				Authorization: "Bearer " + auth.token,
			});
            
			setUser(response.info);
			setImage({uri: response.info.avatar_img, path: response.info.avatar_img});
		};
		fetchUser();
	},[]);
  
   
	const FormSchema = Yup.object().shape({
		name: Yup.string().required("Campo obrigatório!")
			.min(8, "Digite pelo menos 8 caracteres!"),
		email: Yup.string().required("Campo obrigatório!").email("Email invalido!"),
		description: Yup.string().required("Campo obrigatório!"),
	});

	const submitUser = async(values) =>{
		// eslint-disable-next-line no-undef
		const formData = new FormData();
		if(!image.path){
			formData.append("avatar_img", {uri: image.uri, name: "image.jpg", type: "image/jpeg"});
		}

        
		formData.append("name", values.name);
		formData.append("email", values.email);
		formData.append("description", values.description);
       
        
		const { status } = await sendRequest(`${config.API_URL}/users/update/`, "POST", formData,{
			Authorization: "Bearer " + auth.token,
		});
       
		if(status){
			navigation.navigate("Meu Perfil");
		}
       
	};

	const handleDelete = async() =>{
		try {
			const { status } = await sendRequest(`${config.API_URL}/users/delete/`, "DELETE", null, {
				Authorization: "bearer " + auth.token
			});   
			if(status){
				auth.logout();
			}        
		} catch (err) {
			Alert.alert(error, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};

	const alertDelete = () =>{
		Alert.alert("Excluir Conta", "Você tem certeza que quer apagar a sua conta?",[
			{text: "Sim", onPress: () => handleDelete()},
			{text: "Não", onPress: () => {return;}}
		],
		{ cancelable: false }
		);
	};


	const getPermission = async () => {
		if(Platform.OS !== "web"){
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			return status;
		}
	};

	const pickImage = async () => {
		try{
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.5,
			});
              
			if (!result.cancelled) {
				setImage({uri: result.uri});
			}
		} catch (err){
			Alert.alert(err, [
				{text: "ok", onPress: () => clearError()}
			]);
		}
	};

	const addProfilePhoto = async () => {
		const status = await getPermission();
		if(status !== "granted"){
			Alert.alert("Precisamos da permissão para acessar a galeria de imagens");
			return;
		}
		pickImage();
	};

    
    
	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
			<Container>

				<LinearGradient
					colors={["#0070E4", "#007AE7", "#0084E9", "#49525B"]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					locations={[0, 0.1866, 0.3936, 0.9592]}
					style= {{borderBottomLeftRadius: 5,borderBottomRightRadius: 5, paddingVertical: 60}}
                   
				>
					<UserAvatarContainer>
						{image && <UserAvatar>
							<UserAvatarImg source = {{ uri: image.uri }}/>
						</UserAvatar>}
                    
					</UserAvatarContainer>
					<ChangeImage onPress = {addProfilePhoto} disable = {isLoading ? true : false}>
						<AntDesign name="camerao" size={30} color="#fff" />
					</ChangeImage>
				</LinearGradient>

				<EditProfileContainer>
					{isLoading && <Loading/>}
					{error && <Text>{error}</Text>}
					{user && <Formik
						initialValues={{
							name: user.name,
							email: user.email,
							description: user.description
						}}
						onSubmit={values => {
							Keyboard.dismiss();
							submitUser(values);
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
							<UserForm>
								{error && <Text color = "red" small bold center>{error}</Text>}
								<Text medium heavy justify color = "#000" margin = "0px 0 10px 0"> 
                                    Nome:
								</Text>

								<UserField
									ref = {nome}
									autoCapitalize = "words"
									autoCorrect = {false}
									autoFocus = {false}
									value={values.name}
									onChangeText={handleChange("name")}
									onBlur={() => setFieldTouched("aome", true)}

								/>

								{errors.name && touched.name && (
									<Text color = "red" small bold>{errors.name}</Text>
								)}

								<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                                Email:
								</Text>
								<UserField
									ref = {email}
									autoCapitalize = "none"
									autoCompleteType = "email"
									autoCorrect = {false}
									keyboardType = "email-address"
									value={values.email}
									onChangeText={handleChange("email")}
									onBlur={() => setFieldTouched("email", true)}
								/>

								<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">
                                Descrição:
								</Text>
								<UserField
									ref = {description}
									autoCapitalize = "sentences"
									autoCorrect = {false}
									value={values.description}
									multiline
									style = {{textAlignVertical: "top", height: 150}}
									onChangeText={handleChange("description")}
									onBlur={() => setFieldTouched("description", true)}
								/>

								{errors.description && touched.description && (
									<Text color = "red" small bold>{errors.description}</Text>
								)}

                            
								<UpdateButton onPress = {handleSubmit}>
									{isLoading ? (
										<Loading />
									) : (
										<Text bold center color = "#fff">
                                        Atualizar
										</Text>
									)}
								</UpdateButton>
                        
							</UserForm>
						)}
					</Formik>
					}
				</EditProfileContainer>

				<PasswordButtonAction onPress = {()=> navigation.navigate("Atualizar Senha")}>
					<AntDesign name="lock" size={24} color="black" style = {{marginRight: 10}}/>
					<Text>Atualizar Senha</Text>
				</PasswordButtonAction>

				<DeleteButtonAction onPress = {alertDelete}>
					<FontAwesome name="trash-o" size={24} color="#fff" style = {{marginRight: 10}}/>
					<Text color = "#fff">Deletar Conta</Text>
				</DeleteButtonAction>
                
            
			</Container>
		</KeyboardAwareScrollView>
	);
};

const { width } = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;


const UserAvatarContainer = styled.View`
    align-items: center;
    justify-content: center;
    z-index: 0;
`;

const UserAvatar = styled.TouchableOpacity`
    width: 140px;
    height: 140px;
    border-radius: 70px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
`;

const UserAvatarImg = styled.Image`
    width: 140px;
    height: 140px;
    border-radius: 70px;
`;

const ChangeImage = styled.TouchableOpacity`
    background-color: #49525B;
    height: 50px;
    width: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    margin: -35px 0px 0 80px;
    z-index: 1;
    align-self: center;
`;

const EditProfileContainer = styled.View`
    width: ${width - 40}px;
    
    padding: 20px;
    margin: -30px 20px 20px 20px;
    background-color: #fff;
    border-radius: 5px;
    shadow-color: #000;
    shadow-offset: 4px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 9px;
    elevation: 9; 
`;

const UserForm = styled.View`
`;

const UserField = styled.TextInput`
    height: 50px;
    margin-bottom: 0px;
    border: solid 1px #9FA2A5;
    border-radius: 4px;
    padding: 10px;
    color: #9FA2A5;
`;

const UpdateButton = styled.TouchableOpacity`
    height: 50px;
    align-items: center;
    justify-content: center; 
    background-color: #0070E4;
    border-radius: 4px;
    margin: 20px 0;
`;

const ButtonAction = styled(UpdateButton)`
    flex-direction: row;
    border-radius: 5px;
    shadow-color: #000;
    shadow-offset: 4px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 3px;
    elevation: 3; 
    margin: 10px 20px;
`;

const PasswordButtonAction = styled(ButtonAction)`  
    background-color: #fff;
`;

const DeleteButtonAction = styled(ButtonAction)`
    background-color: #DA0D0D;
    margin-bottom: 30px;
`;
const Loading = styled.ActivityIndicator.attrs(() => ({
	color: "#0070E4",
	size: "small"
}))``;

export default EditProfileScreen;






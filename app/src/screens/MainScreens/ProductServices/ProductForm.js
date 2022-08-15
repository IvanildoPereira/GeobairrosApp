import React, { useRef, useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; 
import styled from "styled-components";
import {Formik} from "formik";
import * as Yup from "yup";
import Text from "../../../components/Text";


const ProductForm = () => {
	const nameRef = useRef(null);
	const priceRef = useRef(null);
	const descriptionRef = useRef(null);
	const whatsappRef = useRef(null);
	const linkRef = useRef(null);
	const [images, setImages ] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [loading, setLoandig] = useState();
	const navigation = useNavigation();
	const route = useRoute();

	let typeProduct = route.params.typeProduct; 

	useEffect(() => {
		navigation.setOptions({
			title: typeProduct === "Produto" ? "Cadastrar Produto" : "Cadastrar Serviço" 
		});
	}, [route.params]);

	const FormSchema = Yup.object().shape({
		name: Yup.string().required("Campo obrigatório!"),
		price: Yup.number("Digite um preço valido!").required("Campo obrigatório!"),
		description: Yup.string().required("Campo obrigatório!"),
		whatsapp: Yup.number(),
		link: Yup.string()
	});

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
				quality: 1,
			});
              
			if (!result.cancelled) {
				const imageupload = {
					uri: result.uri,
					name: result.uri,
					type: "image/jpeg"
				};
               
				setImages(prevImages => [...prevImages, imageupload]);
			}
		} catch (error){
			Alert.alert("Erro ao selecionar a imagem!");
		}
	};

	const addImageProduct = async () => {
		const status = await getPermission();
		if(status !== "granted"){
			Alert.alert("Precisamos da permissão para acessar a galeria de imagens");
			return;
		}
		pickImage();
	};

	const handleDelete = (indexDeleted) => {
		const newImages = images.filter((image, index) => index !== indexDeleted);
		setImages(newImages);
	};

	const nextStep = (values) =>{
		navigation.navigate("Selecionar Endereço", {
			images,
			name: values.name,
			price: values.price,
			description: values.description,
			whatsapp: values.whatsapp == "" ? null : values.whatsapp,
			link: values.link == "" ? null : values.link,
			typeProduct
		});
	};

	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
			<Container>
				<Formik
					initialValues={{
						name: "",
						price: "",
						description: ""
					}}

					onSubmit={values => {
						Keyboard.dismiss();
						nextStep(values);
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
						<ProductFormContainer>
							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Images:</Text>
							<ImagesContainer>
								{ images && images.map((image, index) =>(
									<ImageBox  key = {index}>
										<ImageDelete onPress = {() => handleDelete(index)}>
											<FontAwesome name="remove" size={16} color="white" />
										</ImageDelete>
										<ImagePreview source = {{uri: image.uri}}
                                
										/>
									</ImageBox>
								))
								}
								<AddImageButton onPress = {addImageProduct}>
									<AntDesign name="plus" size={24} color="black" />
								</AddImageButton>
							</ImagesContainer>
							<Text medium heavy justify color = "#000" margin = "10px 0 10px 0">Nome:</Text>
							<ProductField
								ref = {nameRef}
								autoCapitalize = "words"
								autoCorrect = {false}
								autoFocus = {false}
								value={values.name}
								onChangeText={handleChange("name")}
								onBlur={() => setFieldTouched("name", true)}
							/>   
							{errors.name && touched.name && (
								<Text color = "red" small bold>{errors.name}</Text>
							)}
                    
							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Preço:</Text>
							<ProductField
								ref = {priceRef}
								autoCapitalize = "none"
								autoCorrect = {false}
								autoFocus = {false}
								keyboardType = "numeric"
								value={values.price}
								onChangeText={handleChange("price")}
								onBlur={() => setFieldTouched("price", true)}
							/>  
							{errors.price && touched.price && (
								<Text color = "red" small bold>{errors.price}</Text>
							)}

							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Descrição:</Text>
							<ProductTextFieldArea
								ref = {descriptionRef}
								autoCapitalize = "sentences"
								autoCorrect = {false}
								autoFocus = {false}
								value={values.description}
								multiline={true}
								style = {{textAlignVertical: "top"}}
								onChangeText={handleChange("description")}
								onBlur={() => setFieldTouched("description", true)}
							/>  
                    
							{errors.description && touched.description && (
								<Text color = "red" small bold>{errors.description}</Text>
							)}

							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Whatsapp: (Opcional)</Text>
                
							<ProductField
								ref = {whatsappRef}
								value={values.whatsapp}
								autoCorrect = {false}
								autoFocus = {false}
								keyboardType = "numeric"
								onChangeText={handleChange("whatsapp")}
								onBlur={() => setFieldTouched("whatsapp", true)}
							/>  
        
                    
							{errors.whatsapp && touched.whatsapp && (
								<Text color = "red" small bold>{errors.whatsapp}</Text>
							)}

							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Site / Link: (Opcional)</Text>
							<ProductField
								ref = {linkRef}
								autoCorrect = {false}
								autoFocus = {false}
								value={values.link}
								onChangeText={handleChange("link")}
								onBlur={() => setFieldTouched("link", true)}
							/> 
                    
							{errors.link && touched.link && (
								<Text color = "red" small bold>{errors.link}</Text>
							)}

							<ButtonNext onPress = {handleSubmit}>
								{loading ? (
									<Loading />
								) : (
									<Text bold center color = "#fff">Proxima Etapa</Text>
								)}
							</ButtonNext>
						</ProductFormContainer>
					)}
				</Formik>
			</Container>
		</KeyboardAwareScrollView>
	);
};

const Container = styled.View`
    flex: 1;
`;

const ProductFormContainer = styled.View`
    margin: 20px;
`;

const ImagesContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const ImageBox = styled.View`
    position: relative;
`;

const ImageDelete = styled.TouchableOpacity`
    position: absolute;
    background-color: red;
    border-radius: 10px;
    height: 20px;
    width: 20px;
    z-index: 1;
    right: 5px;
    top: -10px;
    align-items: center;
    justify-content: center;
`;

const ImagePreview = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 5px;

`;


const AddImageButton = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    background-color: #c4c4c4;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`; 

const ProductField = styled.TextInput`
    height: 50px;
    margin-bottom: 5px;
    border: solid 1px #9FA2A5;
    border-radius: 4px;
    padding: 10px;
    color: #9FA2A5;
`;

const ProductTextFieldArea = styled.TextInput`
    margin-bottom: 5px;
    border: solid 1px #9FA2A5;
    min-height: 150px;
    border-radius: 4px;
    padding: 10px;
    color: #9FA2A5;
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

export default ProductForm;

import React, { useState, useEffect, useRef} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import * as Location from "expo-location";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components";
import Text from "../../../components/Text";
import { Alert, Keyboard, Platform } from "react-native";


const AddressForm = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const [ location, setLocation ] = useState("");
	const [ cep, setCep ] = useState("");
	const [ local, setLocal ] = useState("");
	const localRef = useRef(null);
	const [ bairro, setBairro ] = useState("");
	const bairroRef = useRef(null);
	const [ cidade, setCidade ] = useState("");
	const cidadeRef = useRef(null);
	const [ uf, setUf ] = useState("");
	const ufRef = useRef(null);
	const [ image, setImage ] = useState(null);
	const [ loadingCep, setLoadingCep ] = useState(false);
	const [ loadingMap, setLoadingMap ] = useState(false);

	const FormSchema = Yup.object().shape({
		local: Yup.string().required("Campo obrigatório!"),
		bairro: Yup.string().required("Campo obrigatório!"),
		cidade: Yup.string().required("Campo obrigatório!"),
		uf: Yup.string().required("Campo obrigatório!"),
	});

    
	useEffect(() =>{
		if(route.params.type === "Minha Localização"){
			(async () => {
				let { status } = await Location.requestPermissionsAsync();
				if (status !== "granted") {
					Alert.alert("Precisamos da permissão para ter acesso a sua localização e continuar o processo!");
				}
				let userCoordinates = await Location.getCurrentPositionAsync({});
				setLocation(userCoordinates.coords);
				// eslint-disable-next-line no-undef
				const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userCoordinates.coords.latitude}&lon=${userCoordinates.coords.longitude}&addressdetails=1&polygon_geojson=1&limit=1`);
				const address = await response.json();
                
				setLocal(address.address.road);
				setBairro(address.address.residential);
				setCidade(address.address.city);
			})();
		}
	},[route]);

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
               
				setImage(imageupload);
			}
		} catch (err){
			Alert.alert(err, [
				{text: "ok", onPress: () => null}
			]);
		}
	};

	const addFachada = async () => {
		const status = await getPermission();
		if(status !== "granted"){
			Alert.alert("Precisamos da permissão para acessar a galeria de imagens");
			return;
		}
		pickImage();
	};
    
    
	const findCep = async () =>{
		Keyboard.dismiss();
		try{
			setLoadingCep(true);
			// eslint-disable-next-line no-undef
			const address = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
			if(address.status === 400){
				setLoadingCep(false);
				return Alert.alert("Cep Invalido!");
			}
			const addressData = await address.json();
			setLocal(addressData.logradouro);
			setBairro(addressData.bairro);   
			setCidade(addressData.localidade);
			setUf(addressData.uf);
			setLoadingCep(false);
		} catch (err){
			Alert.alert(err, [
				{text: "ok", onPress: () => null}
			]);
		}
	};

	const findMapa = async(values) =>{
		Keyboard.dismiss();
		try{
			setLoadingMap(true);
			if(route.params.type === "Procurar Endereço"){
				// eslint-disable-next-line no-undef
				const address = await fetch(`https://nominatim.openstreetmap.org/search/${values.local}%20${values.bairro}%20${values.cidade}%20${values.uf}%20brazil?format=json&addressdetails=1&polygon_geojson=1&limit=1`);
				const addressData = await address.json();
				setLoadingMap(false);
				if(addressData){
					navigation.navigate("Selecionar Local", {
						lat: addressData[0].lat, 
						long: addressData[0].lon, 
						fachada_img: image,
						local: values.local,
						cidade: values.cidade, 
						bairro: values.bairro,
						uf: values.uf,
						type: route.params.type,
						geojson: addressData[0].geojson.coordinates,
						geojsonType: addressData[0].geojson.type,
						screenRoot: route.params.screenRoot
					} );
                  
				}else{
					setLoadingMap(false);
					Alert.alert("Não foi possivel encontra o local no mapa pelo nosso Banco!");
				}
			} else{
				setLoadingMap(false);
				navigation.navigate("Selecionar Local", {
					lat: location.latitude, 
					long: location.longitude, 
					type: route.params.type,
					fachada_img: image,
					local: values.local,
					cidade: values.cidade, 
					bairro: values.bairro,
					uf: values.uf,
					screenRoot: route.params.screenRoot
				} );
			}
           

            
     
		} catch (err){
			setLoadingMap(false);
			Alert.alert("Não foi possivel encontra o local no mapa pelo nosso Banco!");
		}
	};
    
	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
			<Container>
				<Formik
					initialValues={{
						local: local,
						bairro: bairro,
						cidade: cidade,
						uf: uf
					}}

					enableReinitialize = {true}

					onSubmit={values => {
						Keyboard.dismiss();
						findMapa(values);
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
							{route.params.type === "Procurar Endereço" &&
                <RowContainer>
                	<RowBig>
                		<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Cep:</Text>

                		<AddressField
                			autoCapitalize = "none"
                			autoCorrect = {false}
                			keyboardType = "numeric"
                			autoFocus = {false}
                			maxLength={8}
                			onChangeText = {cep => setCep(cep.trim())}
                			value = {cep} /> 
                	</RowBig>
                	<RowSmall>
                		<Text medium heavy justify color = "#000" margin = "0px 0 10px 0"></Text>
                		<SearchCep onPress ={findCep} disabled={cep.length < 8 ? true : false}>
                			{loadingCep ? (
                				<Loading />
                			) : (
                				<Ionicons name = "ios-search" size = {20} color = "#fff"/>
                			)}
                           
                		</SearchCep>
                	</RowSmall>
                </RowContainer>}
							{route.params.type === "Minha Localização" && 
                    <Text justify small color = "#9FA2A5" margin = "5px 0">Para podermos oferecer o serviço gratuitamente, precisamos usar fontes de dados publicos como  <Text small heavy>OpenStreet</Text>, e nem sempre
                        é possivel preencher todos os dados automaticamente, então se há dados abaixo faltando ou com informações erradas, pedimos desculpas pelo incoveniente
                        e agradeceriamos se você puder ajudar preenchendo os dados corretamente.
                    </Text>
							}
							<BorderLine/>

							<Text medium heavy justify color = "#000" margin = "0px 0 10px 0">Fachada: (opcional)</Text>
							<ImagesContainer>                     
								{image && 
                    <ImageBox>
                    	<ImageDelete onPress = {() => setImage(null)}>
                    		<FontAwesome name="remove" size={16} color="white" />
                    	</ImageDelete>
                    	<ImagePreview source = {{uri: image.uri}}/>
                    </ImageBox>}
                     
								{!image && 
                    <AddImageButton onPress = {addFachada}>
                    	<AntDesign name="plus" size={24} color="black" />
                    </AddImageButton>}
							</ImagesContainer>

							<Text medium heavy justify color = "#000" margin = "20px 0 10px 0">Endereço:</Text>

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
								{loadingMap ? (
									<Loading />
								) : (
									<Text bold center color = "#fff">Proxima Etapa</Text>
								)}
							</ButtonNext>

						</AddressFormContainer>
					)}
				</Formik>
			</Container>
		</KeyboardAwareScrollView>
	);
};

const Container = styled.View`
    flex: 1;
`;

const BorderLine = styled.View`
    border: dotted 0.5px #C4C4C4;
    align-self: center;
    margin-bottom: 15px;
    width: 80%;
`;

const AddressFormContainer = styled.View`
    margin: 20px;
`;

const SearchCep = styled.TouchableOpacity`
     height: 50px;
    align-items: center;
    justify-content: center; 
    background-color: #0070E4;
    border-radius: 4px;
    margin-bottom: 20px;
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

export default AddressForm;


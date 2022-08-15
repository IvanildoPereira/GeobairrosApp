import React from "react";
import { View, Text, Image } from "react-native";

const CalloutView = ({place, apiUrl}) => {
	return (
		<View style = {{backgroundColor: "#fff", borderRadius: 5, width: 200}}>              
			{place.address?.fachada_img && <Text style = {{minHeight: 140, maxWidth: 200, marginTop: -45}}>
				<Image style = {{width: 200, height: 100}}
					source={{ uri: apiUrl + "/" + place.address?.fachada_img }}
					resizeMode = "cover"
				/>
			</Text>}
			<View style = {{padding: 5, flex: 1}}>
				<Text small heavy>{place.address.logradouro}</Text>
				<Text tiny>{place.address.bairro}</Text>
			</View>
		</View>
	);
};

export default CalloutView;



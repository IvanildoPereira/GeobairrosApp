import React, { forwardRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components";
import Text from "./Text";

// eslint-disable-next-line react/display-name
const PasswordInput = forwardRef(({ error, touched, ...otherProps }, ref) => {
	const [isPasswordHide, setPasswordHide ] = useState(true);
	return (
		<>
			<PasswordView>
				<FieldInput
					ref={ref}
					autoCapitalize = "none"
					autoCompleteType = "password"
					secureTextEntry = {isPasswordHide}
					autoCorrect = {false}
					{...otherProps}
				/>
				<SeePasswordButton onPress = {() => setPasswordHide(!isPasswordHide)}>
					{isPasswordHide ? (
						<FontAwesome5 name="eye-slash" size={18} color="#9FA2A5" />
					):(
						<FontAwesome5 name="eye" size={18} color="#9FA2A5" />
					)}
				</SeePasswordButton>       
			</PasswordView>
			{error && touched && (
				<Text color = "red" small bold>{error}</Text>
			)}
		</>
	);
});

const PasswordView = styled.View` height: 50px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border: solid 1px #9FA2A5;
    border-radius: 4px;
    padding: 10px;  
`;

const FieldInput = styled.TextInput`
    width: 90%;
    color: #9FA2A5;
`;

const SeePasswordButton = styled.TouchableOpacity`
`;

export default PasswordInput;
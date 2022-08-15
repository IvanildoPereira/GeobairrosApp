import React from "react";
import styled from "styled-components/native";

const FormContainer = ({...props}) =>{
	return(
		<Form>
			{props.children}
		</Form>
	);
};

const Form = styled.View`
    background: ${props => props.backgroundColor ?? "#ffffff"};
    margin: ${props => props.margin ?? 0};
    padding: ${props => props.padding ?? "20px"};
    border-radius: 5px;
    shadow-color: #000;
    shadow-offset: 4px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 9px;
    elevation: 10;    
`;

export default FormContainer;


import React, { forwardRef } from "react";
import styled from "styled-components";
import Text from "./Text";


// eslint-disable-next-line react/display-name
const TextInput = forwardRef(({ error, touched, ...otherProps }, ref) => {
	return (
		<>
			<FieldInput
				ref={ref}
				{...otherProps}
			/>
			{error && touched && (
				<Text color = "red" small bold>{error}</Text>
			)}
		</>
	);
});

const FieldInput = styled.TextInput`
    height: 50px;
    margin-bottom: 5px;
    border: solid 1px #9FA2A5;
    border-radius: 4px;
    padding: 10px;
    color: #9FA2A5;
`;

export default TextInput;
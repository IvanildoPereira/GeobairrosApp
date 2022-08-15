import React from "react";
import styled from "styled-components";

const HeaderCircle = () =>{
	return(
		<HeaderGraphic>
			<Circle />
		</HeaderGraphic>
	);
};

const HeaderGraphic = styled.View`
    position: absolute;
    width: 100%;
    top: -50px;
    z-index: -100;

`;

const Circle = styled.View`
    background-color: #0070E4;
    position: absolute;
    width: 750px;
    height: 750px; 
    border-radius: 375px;
    left: -300px;
    top: -210px;
`;

export default HeaderCircle;
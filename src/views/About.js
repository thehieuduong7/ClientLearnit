import styled from "@emotion/styled";
import React from "react";
import { Button, Container, Row } from "react-bootstrap";
const About = () => {
	return (
		<>
			<BoxAnimation />
			<div className="d-flex w-100 justify-content-center mt-5 ">
				<Button
					variant="secondary"
					href="https://www.facebook.com/thehieu.duong.7/"
					target="_blank"
				>
					Contact me later
				</Button>
			</div>
		</>
	);
};

const BoxAnimation = styled.div`
	width: 100px;
	height: 100px;
	background-color: red;
	position: relative;
	animation-name: example;
	animation-duration: 4s;
	animation-iteration-count: infinite;
	@keyframes example {
		0% {
			background-color: red;
			left: 0px;
			top: 0px;
		}
		25% {
			background-color: yellow;
			left: 200px;
			top: 0px;
		}
		50% {
			background-color: blue;
			left: 200px;
			top: 200px;
		}
		75% {
			background-color: green;
			left: 0px;
			top: 200px;
		}
		100% {
			background-color: red;
			left: 0px;
			top: 0px;
		}
	}
`;

export default About;

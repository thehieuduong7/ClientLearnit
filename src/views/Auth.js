import React, { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import styled from "@emotion/styled";
import { AuthContext } from "../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);
	if (authLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" variant="info"></Spinner>;
			</div>
		);
	}
	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}
	const body = authRoute === "login" ? <LoginForm /> : <RegisterForm />;
	return <Wrapper className="container-fluid">{body}</Wrapper>;
};
const Wrapper = styled.div`
	background-color: hsl(218, 41%, 15%);
	background-image: radial-gradient(
			650px circle at 0% 0%,
			hsl(218, 41%, 35%) 15%,
			hsl(218, 41%, 30%) 35%,
			hsl(218, 41%, 20%) 75%,
			hsl(218, 41%, 19%) 80%,
			transparent 100%
		),
		radial-gradient(
			1250px circle at 100% 100%,
			hsl(218, 41%, 45%) 15%,
			hsl(218, 41%, 30%) 35%,
			hsl(218, 41%, 20%) 75%,
			hsl(218, 41%, 19%) 80%,
			transparent 100%
		);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	opacity: 0.8;
`;
export default Auth;

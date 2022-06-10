import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ children }) => {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	let body;
	if (authLoading)
		body = (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" variant="info"></Spinner>;
			</div>
		);
	else {
		if (isAuthenticated) {
			body = children;
		} else {
			body = <Navigate to="/login" reqplace />;
		}
	}
	return (
		<>
			{isAuthenticated ? <NavbarMenu /> : null}
			{body}
		</>
	);
};

export default ProtectedRoute;

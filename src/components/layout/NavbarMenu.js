import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const NavbarMenu = () => {
	const navigate = useNavigate();
	const {
		authState: { user },
		logout,
	} = useContext(AuthContext);

	return (
		<Navbar expand="lg" bg="dark" variant="dark">
			<Container fluid>
				<Navbar.Brand>MERN LEARNIT</Navbar.Brand>
				<Navbar.Toggle />

				<Navbar.Collapse>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/dashboard">
							Dashboard
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link className="me-2" disabled>
							Welcome {user.username}
						</Nav.Link>
						<Button variant="secondary" onClick={logout}>
							<span>
								<i className="fa fa-sign-out" aria-hidden="true"></i>
							</span>
							Logout
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarMenu;

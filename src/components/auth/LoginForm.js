import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMsg from "../layout/AlertMsg";
const LoginForm = () => {
	const navigate = useNavigate();
	const { loginUser } = useContext(AuthContext);
	const [stateForm, setStateForm] = useState({
		username: "",
		password: "",
	});
	const onChangeForm = (e) => {
		setStateForm((pre) => {
			return {
				...pre,
				[e.target.name]: e.target.value,
			};
		});
	};

	const [alert, setAlert] = useState(null);
	useEffect(() => {
		if (alert) {
			let out = setTimeout(() => setAlert(null), 3000);
			console.log("tao");
			return () => {
				console.log("clear");
				clearTimeout(out);
			};
		}
	}, [alert]);
	const onClickSubmit = async (e) => {
		const loginData = await loginUser(stateForm);
		if (loginData.success) {
			navigate("/dashboard", { replace: true });
			console.log("dashboard");
		} else {
			setAlert({ type: "danger", message: loginData.message });
		}
	};

	return (
		<div className="container-fluid row">
			<div className="col-sm-6 p-5">
				<Header className="text-white"> Best ideas</Header>
				<Header className="text-info"> for best team</Header>
				<Paragram>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus,
					expedita iusto veniam atque, magni tempora mollitia dolorum
					consequatur nulla, neque debitis eos reprehenderit quasi ab ipsum nisi
					dolorem modi. Quos?
				</Paragram>
			</div>
			<div
				className="col-sm-6 flex-column d-flex bg-white p-5"
				style={{ gap: "20px", minHeight: "600px" }}
			>
				<div className="d-flex justify-content-center">
					<Header>SIGN IN</Header>
				</div>
				<div>
					{alert && (
						<AlertMsg info={{ type: alert.type, message: alert.message }} />
					)}
				</div>
				<div className="form mt-2">
					<div className="form-floating mt-3 ">
						<input
							type="text"
							className="form-control"
							id="inputUsr"
							placeholder="Username"
							name="username"
							value={stateForm.username}
							onChange={onChangeForm}
						/>
						<label htmlFor="inputUsr">Username</label>
					</div>
					<div className="form-floating mt-3 ">
						<input
							type="password"
							className="form-control"
							id="inputPwd"
							placeholder="Password"
							name="password"
							value={stateForm.password}
							onChange={onChangeForm}
						/>
						<label htmlFor="inputPwd">Password</label>
					</div>
				</div>
				<div className="d-flex w-100 justify-content-between">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id="checkRemember"
						/>
						<label className="form-check-label" htmlFor="checkRemember">
							Remember
						</label>
					</div>
					<div>
						<Link to={"/register"}>Create account?</Link>
					</div>
				</div>
				<div className="mb-3 text-center ">
					<button
						className="btn btn-primary w-100 rounded"
						style={{ height: "50px" }}
						onClick={onClickSubmit}
					>
						<span>
							<i className="fa fa-sign-in me-2" />
						</span>
						SIGN IN
					</button>
				</div>
			</div>
		</div>
	);
};

const Header = styled.h2`
	font-weight: 700;
	font-size: 45px;
	margin-top: 5px;
`;
const Paragram = styled.p`
	margin-top: 56px;
	margin-bottom: 56px;

	margin-right: 50px;
	color: hsl(218, 81%, 85%);
	text-align: justify;
`;
const WrapperToast = styled.div`
	z-index: 1;
	position: absolute;
	right: 0;
	top: 0;
`;

export default LoginForm;

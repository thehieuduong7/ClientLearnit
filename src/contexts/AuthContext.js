import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import axios from "axios";
import { SET_AUTH } from "./constants";
import {
	apiLogin,
	apiRegister,
	apiVerify,
	LOCAL_STORAGE_TOKEN_NAME,
} from "./constants";
import { setAuthToken } from "../components/ultis/setAuthToken";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true, //check loading
		isAuthenticated: false,
		user: null,
	});
	// authenticate user
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}
		try {
			const response = await axios.get(`${apiVerify}`);
			if (response.data.success) {
				dispatch({
					type: SET_AUTH,
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					},
				});
			} else {
				throw Error();
			}
		} catch (err) {
			console.log("err");
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken();
			dispatch({
				type: SET_AUTH,
				payload: { isAuthenticated: false, user: null },
			});
		}
	};
	//login
	const loginUser = async (userForm) => {
		try {
			const res = await axios.post(`${apiLogin}`, userForm);
			if (res.data.success)
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
			await loadUser();
			return res.data;
		} catch (err) {
			if (err.response.data) return { message: err.response.data.message };
			else return { message: err };
		}
	};
	//registerUser
	const registerUser = async (userForm) => {
		if (userForm.password !== userForm.confirmPassword) {
			return { success: false, message: "confirm password not matching!" };
		}
		try {
			const res = await axios.post(`${apiRegister}`, userForm);
			return res.data;
		} catch (err) {
			if (err.response.data) return { message: err.response.data.message };
			else return { message: err };
		}
	};

	//logout
	const logout = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		setAuthToken();
		dispatch({
			type: SET_AUTH,
			payload: { isAuthenticated: false, user: null },
		});
	};

	useEffect(() => {
		loadUser();
	}, []);

	const authContextData = { loginUser, authState, registerUser, logout };
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthContextProvider;

export const apiUrl =
	process.env.NODE_ENV !== "production" ? "http://localhost:5000/api" : "url";
//post login
export const apiLogin = apiUrl + "/auth/login";
export const apiVerify = apiUrl + "/auth";
export const apiRegister = apiUrl + "/auth/register";
export const apiPost = apiUrl + "/posts"; //get post || delete + :/id
export const LOCAL_STORAGE_TOKEN_NAME = "token_learnit_mern";

export const LOADED_SUCCESS = "LOADED_SUCCESS";
export const LOADED_FAIL = "LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const SET_AUTH = "SET_AUTH";

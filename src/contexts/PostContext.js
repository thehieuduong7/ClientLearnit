import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/PostReducer";
import axios from "axios";
import React from "react";
import { apiPost } from "./constants";
import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
} from "../contexts/constants";
export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const [postState, dispatch] = useReducer(postReducer, {
		posts: [],
		postsLoading: true,
	});
	const [addState, setAddState] = useState({
		show: false,
	});
	const [updateState, setUpdateState] = useState({
		show: false,
		post: {
			_id: "",
			title: "",
			description: "",
			url: "",
			status: "",
		},
	});

	const [showToast, setShowToast] = useState({
		show: false,
		message: "",
		type: null,
	});

	const loadPosts = async () => {
		try {
			const response = await axios.get(`${apiPost}`);
			if (response.data.success) {
				dispatch({ type: LOADED_SUCCESS, payload: response.data.posts });
			} else {
				throw Error();
			}
		} catch (err) {
			dispatch({ type: LOADED_FAIL, payload: null });
			console.log(err);
		}
	};
	const addPost = async ({ post }) => {
		try {
			const response = await axios.post(`${apiPost}`, post);
			if (response.data.success) {
				dispatch({
					type: ADD_POST,
					payload: response.data.post,
				});
			} else {
				console.log("false");
				throw Error("success fail");
			}
			return response.data;
		} catch (err) {
			console.log(err);
			return err.response.data
				? err.response.data
				: { success: false, message: "err server" };
		}
	};
	const deletePost = async ({ _id }) => {
		try {
			const response = await axios.delete(`${apiPost}/${_id}`);
			if (response.data.success) {
				dispatch({
					type: DELETE_POST,
					payload: _id,
				});
			} else {
				throw Error("success fail");
			}
			return response.data;
		} catch (err) {
			console.log(err);
			return err.response.data
				? err.response.data
				: { success: false, message: "err server" };
		}
	};

	const updatePost = async ({ post }) => {
		try {
			const response = await axios.put(`${apiPost}/${post._id}`, post);
			if (response.data.success) {
				dispatch({
					type: UPDATE_POST,
					payload: response.data.post,
				});
			} else {
				throw Error("success fail");
			}
			return response.data;
		} catch (err) {
			console.log(err);
			return err.response.data
				? err.response.data
				: { success: false, message: "err server" };
		}
	};
	const selectPost = ({ _id }) => {
		const post = postState.posts.find((e) => e._id === _id);
		return post;
	};
	const postContextData = {
		postState,
		loadPosts,
		addState,
		setAddState,
		updateState,
		setUpdateState,
		addPost,
		showToast,
		setShowToast,
		deletePost,
		updatePost,
		selectPost,
	};
	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	);
};

export default PostContextProvider;

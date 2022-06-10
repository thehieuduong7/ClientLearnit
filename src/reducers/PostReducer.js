import {
	LOADED_SUCCESS,
	LOADED_FAIL,
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
} from "../contexts/constants";
export const postReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOADED_SUCCESS:
			return {
				...state,
				posts: payload,
				postsLoading: false,
			};
		case LOADED_FAIL:
			return {
				...state,
				posts: [],
				postsLoading: false,
			};
		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, payload],
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((e) => e._id !== payload),
			};
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((e) => {
					return e._id === payload._id ? payload : e;
				}),
			};

		default:
			return state;
	}
};

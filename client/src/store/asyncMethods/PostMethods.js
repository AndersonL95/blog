import axios from 'axios';
import { dispatch } from 'react-hot-toast';
import { CREATE_ERRORS, REMOVE_ERRORS, SET_LOADER, CLOSE_LOADER, REDIRECT_TRUE, REDIRECT_FALSE, SET_MENSSAGE, REMOVE_MENSSAGE, SET_POSTS} from '../tipos/PostTypes';

export const createAction = (postData) => {
	return async (dispatch, getState) => {
		const {
			AuthReducer: { token },
		} = getState();
		dispatch({ type: SET_LOADER });
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const {
				data: { msg },
			} = await axios.post('/create_post', postData, config);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: REMOVE_ERRORS });
			dispatch({ type: REDIRECT_TRUE });
			dispatch({ type: SET_MENSSAGE, payload: msg });
		} catch (error) {
			console.log(error.response);
			const { errors } = error.response.data;
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: CREATE_ERRORS, payload: errors });
		}
	};
};

export const fetchPost = (id) => {
	return async (dispatch, getState) => {
		const {AuthReducer:{token}} = getState();
		dispatch({type: SET_LOADER})
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const {data: {response},} = await axios.get(`/posts/${id}`, config)
			dispatch({type: CLOSE_LOADER})
			dispatch({type: SET_POSTS, payload: response})
		} catch (error) {
			dispatch({type: CLOSE_LOADER});
		}
	}
}
import axios from 'axios';
import {CREATE_ERRORS, SET_LOADER, CLOSE_LOADER} from '../tipos/PostTypes'
const token = localStorage.getItem('myToken');

export const createAction = (postData) => {
    return async (dispatch) => {
        dispatch({type: SET_LOADER})
        try {
            const config = {
                headers: {
                    Autorization:  `Bearer ${token}`
                }
            }
            const {data} = await axios.post('/create_post', postData, config);
            dispatch({type: CLOSE_LOADER})
        } catch (error) {
            const {errors} = error.response.data
            dispatch({type: CLOSE_LOADER})
            dispatch({type: CLOSE_LOADER})
            dispatch({type: CREATE_ERRORS, payload: errors })
            
        }
    }
};
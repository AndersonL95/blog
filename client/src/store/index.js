import {createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import AuthReducer from './reducers/AuthReducer';
import PostReducer from './reducers/PostReduce'
const rootReducers = combineReducers({
    AuthReducer,
    PostReducer
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));
export default Store;
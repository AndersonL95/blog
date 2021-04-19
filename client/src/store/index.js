import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import AuthReducer from './reducers/AuthReducer';
import { PostReducer, FetchPosts, FetchPost, UpdatePost, updateImage} from './reducers/PostReducer';
const rootReducers = combineReducers({
	AuthReducer,
	PostReducer,
	FetchPosts,
	FetchPost,
	UpdatePost,
	updateImage,

});
const middlewares = [thunkMiddleware];
const Store = createStore(
	rootReducers,
	composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;

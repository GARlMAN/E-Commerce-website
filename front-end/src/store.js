import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import Product from "./component/Home/Product";
import {productReducer, productDetailsReducer} from "./reducers/productReducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import { profileReducer, userReducer } from "./reducers/userReducer.js";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
 
export default store;
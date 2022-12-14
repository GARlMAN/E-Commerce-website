import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Product from "./component/Home/Product";
import {productReducer} from "./reducers/productReducer.js"
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    products: productReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import Product from "./component/Home/Product";
import {productReducer, productDetailsReducer} from "./reducers/productReducer.js"
import { composeWithDevTools } from "redux-devtools-extension";
import { profileReducer, userReducer, forgotPasswordReducer } from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { newOrderReducer } from "./reducers/orderReducer.js";

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,  
    cart: cartReducer,
    newOrder: newOrderReducer,
});

//initial state is loading and after reload it's staying preserved if it's cart or shippnig info
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};


//thunk middle wear
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
 
export default store;
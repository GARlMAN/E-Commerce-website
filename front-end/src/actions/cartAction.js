import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import baseUrl from "../instance";
import axios from "axios";
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}`);
    //details of the product 
    dispatch({
        type: ADD_TO_CART,
        payload: {
          product: data.product._id,  //checking product with id
          name: data.product.name,
          price: data.product.price,
          image: data.product.image[0].url,
          stock: data.product.Stock,
          quantity,
        },
      });


      //this is way to strage on the brower
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO --using the user from the order schema
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
}; 
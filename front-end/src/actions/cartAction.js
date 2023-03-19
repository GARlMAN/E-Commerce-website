import { ADD_TO_CART } from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
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

import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";


//cart reducer
export const cartReducer = (state = { cartItems : [], shippingInfo: {} }, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;

            //checking if it already exists
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            console.log(isItemExist);
            //two cases if it does exits
            if (isItemExist) {
                return {
                  ...state,
                  cartItems: state.cartItems.map((i) =>
                    i.product === isItemExist.product ? item : i
                  ),
                }
            }
            else{
                console.log("hi")
                return {
                    ...state,
                    cartItems : [...state.cartItems, item]

                }
            }
            case REMOVE_CART_ITEM:
                return {
                  ...state,
                  cartItems: state.cartItems.filter((i) => i.product !== action.payload),
                };
            case SAVE_SHIPPING_INFO: //this is to save shipping deatils to the reducer
                return {
                    ...state,
                    shippingInfo: action.payload,
                };
          

        default:
            return state;

    }

}
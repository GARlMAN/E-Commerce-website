import { ADD_TO_CART } from "../constants/cartConstants";


//cart reducer
export const cartReducer = (state = { cartItems : [] }, action) => {
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

        default:
            return state;

    }

}
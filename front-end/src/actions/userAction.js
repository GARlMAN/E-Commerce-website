import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS

} from "../constants/userConstants";


import axios from "axios";


//login action
export const login = (email, password) => async (dispatch) => {
    try {
        //request
        dispatch({ type: LOGIN_REQUEST});

        //sending the config files to axios
        const config = { headers: { "Content-Type": "application/json" } };
        
        //post to get data
        const { data } = await axios.post(
            `/api/v1/login`,
            { email, password },
            config
          )
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
    catch (error) {

        //sending the loging error message
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      }

}


//register action
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      //type of data sending
      const config = { headers: { "Content-Type": "multipart/form-data" } };
     //axios request
      const { data } = await axios.post(`/api/v1/register`, userData, config);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });

    } catch (error) {
     //handling the error
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//Load user
// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {

    //report error
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
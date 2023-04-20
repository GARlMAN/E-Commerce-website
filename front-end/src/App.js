
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WebFont from "webfontloader";
import { Fragment, useEffect, useState } from 'react';

import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.jsx';
import ProductDetails from './component/Product/ProductDetails.jsx';
import Products from "./component/Product/Products.jsx";
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./component/User/Profile.jsx"
import Loader from './component/layout/Loader/Loader';
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx"; 
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment.jsx";
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


function App() {
  //accesing the 
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  //stripe key use state
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  //getting the stripe api key from config
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }



  //use effect
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

      
       dispatch(loadUser());
       getStripeApiKey();
    
  }, [dispatch]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
      <Router>
        <Header />
          {isAuthenticated && <UserOptions user={user} />}
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/product/:id' element={<ProductDetails />} />
            <Route exact path='/products' element={<Products />} />
            <Route exact path='/products/:keyword' element={<Products />} />
            <Route exact path='/search' element={<Search />} />
            <Route exact path = '/login' element={<LoginSignUp />} />
            {user && <Route exact path = '/account' element={<Profile />} />}
            {user && <Route exact path = '/me/update' element={<UpdateProfile />} />}
            {user && <Route exact path = '/password/update' element={<UpdatePassword />} />}
            <Route exact path = '/password/forgot' element={<ForgotPassword />} />
            <Route exact path = '/password/reset/:token' element={<ResetPassword />} />
            <Route exact path = '/cart' element={<Cart />} />
            <Route exact path = '/shipping' element={<Shipping />} />
            <Route exact path = '/order/confirm' element={<ConfirmOrder />} />
              <Route exact path = '/process/payment' element={<Payment key={stripeApiKey}/>} />

            
          </Routes>
        <Footer />
      </Router>
       )
       }
     </Fragment>




  );
}

export default App;

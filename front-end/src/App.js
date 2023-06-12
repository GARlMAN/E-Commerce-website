
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
import PaymentMiddlewear from "./component/Middlewear/PaymentMiddlewear.jsx";
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from "./component/Order/MyOrders.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import NewProduct from "./component/Admin/NewProduct.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList.jsx"; 
import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
import UsersList from "./component/Admin/UsersList.jsx";
import UpdateUser from "./component/Admin/UpdateUser.jsx";
import ProductReviews from "./component/Admin/ProductReviews.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";
import About from "./component/layout/About/About.jsx";
import NotFound from "./component/layout/Not Found/NotFound.jsx";
import axios from 'axios';

const apiBaseUrl = 'https://ecommerece-backend.onrender.com'; // Replace with the correct base URL for your backend API

// Example API request
axios.get(`${apiBaseUrl}/api/data`)
  .then(response => {
    // Handle the API response
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

function App() {
  //accesing the 
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  //stripe key use state
  
  const dispatch = useDispatch();

  //use effect
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

      
       dispatch(loadUser());

    
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
            <Route exact path = '/process/payment' element={<PaymentMiddlewear />} />
            <Route exact path = "/success" element={<OrderSuccess />} />
            {user && <Route exact path = "/orders" element={<MyOrders />} /> }
            <Route exact path = "/order/:id" element={<OrderDetails />} />
            <Route exact path = "/admin/dashboard" element={<Dashboard />} /> 
            <Route exact path = "/admin/products" element={<ProductList />} />  
            <Route exact path = "/admin/product" element={<NewProduct />} />
            <Route exact path = "/admin/product/:id" element={<UpdateProduct />} /> 
            <Route exact path = "/admin/orders" element={<OrderList />} />
            <Route exact path = "/admin/order/:id" element={<ProcessOrder />} />
            <Route exact path = "/admin/users" element={<UsersList />} />
            <Route exact path = "/admin/user/:id" element={<UpdateUser />} />
            <Route exact path = "/admin/reviews" element={<ProductReviews />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        <Footer />
      </Router>
       )
       }
     </Fragment>




  );
}

export default App;

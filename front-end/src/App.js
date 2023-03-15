
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WebFont from "webfontloader";
import { Fragment, useEffect } from 'react';

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

function App() {
  //accesing the 
  
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
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
            
          </Routes>
        <Footer />
      </Router>
       )
       }
     </Fragment>




  );
}

export default App;

import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.jsx"
import "./Home.css"
import MetaData from "../layout/MetaData"
import { getProduct, clearErrors } from '../../actions/productAction.js';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; 
import Loader from "../layout/Loader/Loader.jsx"
import { useAlert } from 'react-alert';
// const product = {
//   name: "Blue shirt",
//   price: "$3000",
//   _id: "asdkjasn",
//   images: [{url: "https://cdn.shopify.com/s/files/1/0752/6435/products/READ-MENSBASICT-SHIRT-OLIVEHERO3_765x.jpg?v=1660739819"}]
// }


function Home() {

  const alert = useAlert()
  const { loading, error, products, productsCount} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() =>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
      dispatch(getProduct());

  }, [dispatch, error])
  

  return (
    <Fragment>
      {loading? <Loader />: 
    (
      <Fragment>
          <MetaData title="Ecommerce" />
            <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href = "#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className='homeHeadings'>Featured Products</h2>
            <div className='container' id = 'container'>
              {products && products.map((product) => <ProductCard product={product} />) }
            </div>
        </Fragment>
    )
    }
    </Fragment>

  )
}

export default Home
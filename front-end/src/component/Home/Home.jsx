import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg";
import Product from "./Product.jsx"
import "./Home.css"
import MetaData from "../layout/MetaData"
const product = {
  name: "Blue shirt",
  price: "$3000",
  _id: "asdkjasn",
  images: [{url: "https://cdn.shopify.com/s/files/1/0752/6435/products/READ-MENSBASICT-SHIRT-OLIVEHERO3_765x.jpg?v=1660739819"}]
}
function Home() {
  return (
    <Fragment>
      <MetaData title="Home Page is Working" />
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
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>

          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>

        </div>


    </Fragment>
  )
}

export default Home
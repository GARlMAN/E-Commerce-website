import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const options = {
    edit: false,
    color: "rbga(20, 20, 20, 0.1)",
    activeColor: "Tomato",
    size: window.innerWidth < 600 ? 10 : 25,
    value: 4.5,
    isHalf: true
}

function Product({product}) {
  return (
    <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /> <span>(265 reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product
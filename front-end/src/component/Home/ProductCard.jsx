import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';



function ProductCard({product}) {
  const options = {
    edit: false,
    color: "rbga(20, 20, 20, 0.1)",
    activeColor: "Tomato",
    size: window.innerWidth < 600 ? 10 : 25,
    value: product.ratings,
    isHalf: true
}



  return (
    <Link className="productCard" to= {`/product/${product._id}`}>
        <img src={product.image[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /> <span>({product.numOfReviews} reviews)</span>
        </div>
        <span>{`$${product.price}`}</span>
    </Link>
  )
}

export default ProductCard
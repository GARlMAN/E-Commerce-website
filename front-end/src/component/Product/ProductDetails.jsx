import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css"
import  Carousel  from 'react-material-ui-carousel';
import { useSelector, useDispatch } from "react-redux";
import {getProductDetails, clearErrors} from "../../actions/productAction"
import {  useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.jsx"
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";





const ProductDetails = () => {

    const { loading, error, product} = useSelector((state) => state.productDetails);
    const dispatch = useDispatch();
    const { id } = useParams()
    const alert = useAlert()
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error,alert])





    const options = {
        edit: false,
        color: "rbga(20, 20, 20, 0.1)",
        activeColor: "Tomato",
        size: window.innerWidth < 600 ? 10 : 25,
        value: product.ratings,
        isHalf: true
    }
    console.log(options)
  return (
    <Fragment>
        {loading ? <Loader /> :
        (
            <Fragment> 
        <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.image &&
                        product.image.map((item, i) => (
                        <div>
                            <img
                                className="CarouselImage"
                                key={i}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        </div>
                        ))}
                </Carousel>
            </div>
            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
                </div>
                    <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input readOnly type="number" value="1" />
                                <button>+</button>
                            </div>{"  "}
                            <button>Add to Cart</button>
                    </div>
                    <p>
                        Status: {" "}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                </p>
                </div>
                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                </div>
                <button className="submitReview">
                    Submit Review
                </button>
            </div>
       </div>
       <h3 className="reviewsHeading">REVIEWS</h3>

       {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </Fragment>
        )}
    </Fragment>
  )
}

export default ProductDetails
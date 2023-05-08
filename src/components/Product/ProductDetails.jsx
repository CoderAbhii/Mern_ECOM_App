import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { toast } from 'react-toastify'
import Carousel from 'react-material-ui-carousel'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
import ReviewCard from './RivewCard'
import Loader from '../layout/Loader/Loader'

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(state => state.productDetails);
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => { }

    const decreaseQuantity = () => { }

    const addToCartHandler = () => { }

    const submitReviewToggle = () => { }

    const reviewSubmitHandler = () => { }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div className="product-details">
                        <div>
                            <Carousel>
                                {
                                    product.images && product.images.map((item, i) => (
                                        <img className="carousel-image" key={item.url} src={item.url} alt={`${i} Slide`} />
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>

                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                </>
            }
        </>
    )
}

export default ProductDetails
import React, { useEffect, useState } from 'react'
import './Products.css'

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { Link, useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@mui/material';
import { toast } from 'react-toastify';


const Products = () => {
    const categories = [
        "Laptop",
        "Mobile",
        "Camera",
        "Books",
        "Pots",
        "TV"
    ];

    const { keyword } = useParams();

    const dispatch = useDispatch();

    const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price, category, ratings));

    }, [dispatch, keyword, currentPage, price, category, ratings]);

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        <h2 className="productsHeading">Products</h2>
                        <div className="login-cart-search">
                            <div className="child">
                                <div className="search">
                                    <Link className='btn' to="/search">Search</Link>
                                </div>
                            </div>
                            <div className="child">
                                <div className="search">
                                    <Link className='btn' to="/login">Login</Link>
                                </div>
                            </div>
                            <div className="child">
                                <div className="search">
                                    <Link className='btn' to="/cart">Cart</Link>
                                </div>
                            </div>
                        </div>

                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={10000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>

                        </div>

                        {
                            resultPerPage <= filteredProductsCount && (<div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={7}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>)
                        }
                    </>
            }
        </>
    )
}

export default Products
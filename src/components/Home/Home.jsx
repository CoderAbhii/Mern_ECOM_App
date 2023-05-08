import React, { useEffect } from 'react'
import './Home.css'
import ProductCard from './ProductCard'
import { getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { toast } from 'react-toastify'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Home = () => {

    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(getProducts());
    }, [dispatch, error])

    return (
        <>
            <HelmetProvider>
            <Helmet>
            <title>MERN - HOME</title>
          </Helmet>

                {
                    loading ? <Loader /> : <>
                        <div className="banner">
                            <p>Welcome To Mern Application</p>
                            <h1>FInd your all need of products</h1>

                            <a href="#container">
                                <button>
                                    Scroll
                                </button>
                            </a>
                        </div>

                        <h2 className="homeHeading">Featured Products</h2>


                        <div className="container" id="container">
                            {
                                products && products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </>
                }
            </HelmetProvider>
        </>
    )
}

export default Home
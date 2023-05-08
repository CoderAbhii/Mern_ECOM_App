import React, { useEffect } from 'react'
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import WebFont from "webfontloader";
import Alert from './components/CustomAlert/Alert'
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import Notfound from './components/Notfound/Notfound';

const App = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Comfortaa", "Roboto", "Comfortaa"],
      },
    });
  }, []);

  return (
    <>
      <HelmetProvider>
        <Router>
          <Helmet>
            <title>MERN - APP</title>
          </Helmet>

          <Alert />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/products' element={<Products/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path="/products/:keyword" element={<Products/>} />
            <Route path='*' element={<Notfound/>}/>
          </Routes>
          <Footer />
        </Router>
      </HelmetProvider>
    </>
  )
}

export default App
import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import ProductPage from "../views/ProductPage";
import CartPage from "../views/CartPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

const Main = () => {
  return (
    <main className='py-3'>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart'>
            <Route path='' element={<CartPage />} />
            <Route path=':id' element={<CartPage />} />
          </Route>
        </Routes>
      </Container>
    </main>
  );
};

export default Main;

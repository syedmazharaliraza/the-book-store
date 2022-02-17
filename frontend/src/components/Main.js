import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import ProductPage from "../views/ProductPage";

const Main = () => {
  return (
    <main className='py-3'>
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>
      </Container>
    </main>
  );
};

export default Main;

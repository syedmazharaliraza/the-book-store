import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import ProductPage from "../views/ProductPage";
import CartPage from "../views/CartPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import ProfilePage from "../views/ProfilePage";
import ShippingPage from "../views/ShippingPage";
import PaymentPage from "../views/PaymentPage";
import PlaceOrderPage from "../views/PlaceOrderPage";
import OrderPage from "../views/OrderPage";
import UserListPage from "../views/UserListPage";
import EditUserPage from "../views/EditUserPage";
import ProductListPage from "../views/ProductListPage";
import ProductEditPage from "../views/ProductEditPage";
import OrderListPage from "../views/OrderListPage";

const Main = () => {
  return (
    <main className='py-3'>
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart'>
            <Route path='' element={<CartPage />} />
            <Route path=':id' element={<CartPage />} />
          </Route>
          <Route path='/shipping' element={<ShippingPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/placeorder' element={<PlaceOrderPage />} />
          <Route path='/order/:id' element={<OrderPage />} />
          <Route path='/admin'>
            <Route path='userlist' element={<UserListPage />} />
            <Route path='user/:id/edit' element={<EditUserPage />} />
            <Route path='productList' element={<ProductListPage />} />
            <Route path='product/:id/edit' element={<ProductEditPage />} />
            <Route path='OrderList' element={<OrderListPage />} />
          </Route>
        </Routes>
      </Container>
    </main>
  );
};

export default Main;

import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "./Product";
import { listProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Message from "../ui/Message";
import Loader from "../ui/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h2 className='text-center'>Top selling books</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Products;

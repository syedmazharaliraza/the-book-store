import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomeSection.css";

const HomeSection = () => {
  return (
    <Col className='my-4 home d-flex flex-column justify-content-center'>
      <Row>
        <h1 className='text-center'>
          Explore the collection and shop for books online
        </h1>
      </Row>
      <Row className='account-btns justify-content-center'>
        <Link className='btn btn-primary me-4' to='/login'>
          Sign in
        </Link>
        <Link className='btn btn-outline-primary' to='/signup'>
          Sign up
        </Link>
      </Row>
    </Col>
  );
};

export default HomeSection;

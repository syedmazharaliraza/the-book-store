import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    address: null,
    city: null,
    state: null,
    pincode: null,
    phoneNumber: null,
    landmark: null,
  });
  const [message, setMessage] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  useEffect(() => {
    if (userInfo) {
      return navigate(`/${redirect}`);
    }
  }, [userInfo, redirect, navigate]);

  function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesn't match");
    } else {
      setMessage(null);
      dispatch(register({ name, email, password, billingAddress }));
    }
  }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>Name *</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>Email Address *</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col sm={12} md={6}>
            <Form.Group controlId='password'>
              <Form.Label style={{ fontWeight: 500 }}>Password *</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group controlId='confirmPassword'>
              <Form.Label style={{ fontWeight: 500 }}>
                Confirm password *
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>Billing Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={billingAddress.address}
            onChange={(e) => {
              setBillingAddress({
                ...billingAddress,
                address: e.target.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col sm={12} md={6}>
            <Form.Group controlId='city'>
              <Form.Label style={{ fontWeight: 500 }}>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city name'
                value={billingAddress.city}
                onChange={(e) => {
                  setBillingAddress({
                    ...billingAddress,
                    city: e.target.value,
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group controlId='state'>
              <Form.Label style={{ fontWeight: 500 }}>State</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter state name'
                value={billingAddress.state}
                onChange={(e) => {
                  setBillingAddress({
                    ...billingAddress,
                    state: e.target.value,
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId='landmark' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>Landmark</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter landmark'
            value={billingAddress.landmark}
            onChange={(e) => {
              setBillingAddress({
                ...billingAddress,
                landmark: e.target.value,
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col sm={12} md={7}>
            <Form.Group controlId='phoneNumber' className='my-3'>
              <Form.Label style={{ fontWeight: 500 }}>Phone Number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter phone number'
                value={billingAddress.phoneNumber}
                onChange={(e) => {
                  setBillingAddress({
                    ...billingAddress,
                    phoneNumber: e.target.value,
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={5}>
            <Form.Group controlId='pincode' className='my-3'>
              <Form.Label style={{ fontWeight: 500 }}>Pin Code</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter pincode'
                value={billingAddress.pincode}
                onChange={(e) => {
                  setBillingAddress({
                    ...billingAddress,
                    pincode: e.target.value,
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type='submit' variant='primary' className='my-3'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;

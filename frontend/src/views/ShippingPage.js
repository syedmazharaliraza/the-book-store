import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const ShippingPage = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [pincode, setPincode] = useState(shippingAddress.pincode);
  const [landmark, setLandmark] = useState(shippingAddress.landmark);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate(`/login`);
    }
  }, [navigate, userInfo]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        pincode,
        landmark,
        phoneNumber,
      })
    );
    navigate("/payment");
  }
  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h2>Shipping</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address' className='my-3'>
            <Form.Label style={{ fontWeight: 500 }}>
              Billing Address *
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group controlId='city' className='my-3'>
                <Form.Label style={{ fontWeight: 500 }}>City *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter city name'
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group controlId='state' className='my-3'>
                <Form.Label style={{ fontWeight: 500 }}>State *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter state name'
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId='landmark' className='my-3'>
            <Form.Label style={{ fontWeight: 500 }}>Landmark</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter landmark'
              value={landmark}
              onChange={(e) => {
                setLandmark(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col sm={12} md={7}>
              <Form.Group controlId='phoneNumber' className='my-3'>
                <Form.Label style={{ fontWeight: 500 }}>
                  Phone Number *
                </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter phone number'
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12} md={5}>
              <Form.Group controlId='pincode' className='my-3'>
                <Form.Label style={{ fontWeight: 500 }}>Pin Code *</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter pincode'
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type='submit' variant='primary' className='my-3'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingPage;

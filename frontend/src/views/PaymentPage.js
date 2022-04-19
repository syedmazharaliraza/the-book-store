import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentPage = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  console.log(paymentMethod);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h2>Payment Method</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label className='my-3' as='legend'>
              Select Method
            </Form.Label>
            <Col>
              <Form.Check
                className='my-3'
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === "PayPal"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <Form.Check
                className='my-3'
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                checked={paymentMethod === "Stripe"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentPage;

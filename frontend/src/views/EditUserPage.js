import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { updateUser, getUserDetails } from "../actions/userActions";
import Loader from "../components/ui/Loader";
import Message from "../components/ui/Message";
import {
  USER_DETAILS_RESET,
  USER_UPDATE_RESET,
} from "../constants/userConstant";

const EditUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    address: null,
    city: null,
    state: null,
    pincode: null,
    phoneNumber: null,
    landmark: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const updatedUser = useSelector((state) => state.updateUser);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updatedUser;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      return navigate(`/login`);
    }
    if (successUpdate) {
      navigate("/admin/userList/");
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
    } else {
      if (!user || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setBillingAddress(user.billingAddress);
      }
    }
  }, [id, navigate, user, dispatch, successUpdate, userInfo]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      updateUser(id, {
        name,
        email,
        isAdmin,
        billingAddress,
      })
    );
  }
  return (
    <>
      <Link to='/admin/userList/' className='btn btn-light my-3'>
        &lt; Go Back
      </Link>
      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
              <Form.Label style={{ fontWeight: 500 }}>Name </Form.Label>
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
              <Form.Label style={{ fontWeight: 500 }}>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='address' className='my-3'>
              <Form.Label style={{ fontWeight: 500 }}>
                Billing Address
              </Form.Label>
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
                  <Form.Label style={{ fontWeight: 500 }}>
                    Phone Number
                  </Form.Label>
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
            <Form.Group controlId='isadmin' className='my-3'>
              <Form.Check
                type='checkbox'
                label='is Admin'
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUserPage;

import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../actions/userActions";
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";

const Profile = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      return navigate(`/login`);
    } else {
      if (!user) {
        dispatch(getUserProfile(userInfo._id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setBillingAddress(user.billingAddress);
      }
    }
  }, [dispatch, user, userInfo, navigate]);

  function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesn't match");
    } else {
      setMessage(null);
      dispatch(
        updateUserProfile(userInfo._id, {
          name,
          email,
          password,
          billingAddress,
        })
      );
    }
  }
  return (
    <>
      <h2>User Profile</h2>
      {loading && <Loader />}
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <Message variant='success'>Profile updated successfully</Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>Name</Form.Label>
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
        <Form.Group controlId='password' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>New password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label style={{ fontWeight: 500 }}>
            Confirm new password
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
        <Form.Group controlId='city' className='my-3'>
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
        <Form.Group controlId='state' className='my-3'>
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
        <Button type='submit' variant='primary' className='my-3'>
          Update
        </Button>
      </Form>
    </>
  );
};

export default Profile;

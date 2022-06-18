import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/products/Rating";
import { listProduct, addReviewToProduct } from "../actions/productActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ADD_REVIEW_RESET } from "../constants/productConstants";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const { userInfo } = useSelector((state) => state.userLogin);

  const productAddReview = useSelector((state) => state.productAddReview);
  const {
    loading: loadingAddReview,
    success: successAddReview,
    error: errorAddReview,
  } = productAddReview;

  useEffect(() => {
    if (successAddReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_ADD_REVIEW_RESET });
    }
    dispatch(listProduct(id));
  }, [dispatch, id, successAddReview]);

  const [isReadingmore, setIsReadingmore] = useState(false);
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [descriptionStyle, setDescriptionStyle] = useState({
    height: "75px",
    overflow: "hidden",
  });

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addReviewToProduct(id, {
        rating,
        comment,
      })
    );
  };

  const addtoCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const readMoreHandler = (event) => {
    event.preventDefault();
    if (!isReadingmore) {
      setDescriptionStyle({
        height: "fit-content",
      });
    } else {
      setDescriptionStyle({
        height: "75px",
        overflow: "hidden",
      });
    }
    setIsReadingmore((prevValue) => !prevValue);
  };

  return (
    <>
      <Link className='btn btn-light my-4' to='/'>
        &lt; Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='my-4'>
            <Col md={4} lg={3}>
              <Image
                className='p-2 mx-auto d-inline-block'
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={5} lg={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  <small className='mb-1 d-inline-block'>
                    By {product.author}
                  </small>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numberOfRatings={product.numOfRatings}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: &#8377; {product.sku[0].price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div style={descriptionStyle}>
                    Description: {product.description}
                  </div>
                  <Link onClick={readMoreHandler} to='#'>
                    {`Read ${isReadingmore ? "less" : "more"}`}
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>&#8377;{product.sku[0].price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.sku[0].quantity > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.sku[0].quantity > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.sku[0].quantity).keys()].map(
                              (value) => (
                                <option key={value}>{value + 1}</option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addtoCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.sku[0].quantity === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h5>Write a Customer Review</h5>
                  {loadingAddReview ? (
                    <Loader />
                  ) : (
                    errorAddReview && (
                      <Message variant='danger'>{errorAddReview}</Message>
                    )
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' className='my-3'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
                {product.reviews.length === 0 ? (
                  <Message>No Reviews</Message>
                ) : (
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;

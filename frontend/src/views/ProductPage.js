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
import { listProduct } from "../actions/productActions";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(listProduct(id));
  }, [dispatch, id]);

  const [isReadingmore, setIsReadingmore] = useState(false);
  const [qty, setQty] = useState(1);

  const [descriptionStyle, setDescriptionStyle] = useState({
    height: "75px",
    overflow: "hidden",
  });

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
      )}
    </>
  );
};

export default ProductPage;

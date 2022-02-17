import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((product) => product._id === id);
  console.log(product);
  const [isReadingmore, setIsReadingmore] = useState(false);

  const [descriptionStyle, setDescriptionStyle] = useState({
    height: "75px",
    overflow: "hidden",
  });

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
      <Row className='my-4'>
        <Col md={4} lg={3}>
          <Image className='p-2' src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={5} lg={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
              <small className='mb-1 d-inline-block'>By {product.author}</small>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numberOfRatings={`${product.numOfRatings}`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: &#8377;{product.price}</ListGroup.Item>
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
                    <strong>&#8377;{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;

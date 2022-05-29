import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/ui/Message";
import Loader from "../components/ui/Loader";
import FormContainer from "../components/FormContainer";
import { listProduct, updateProduct } from "../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstants";
import axios from "axios";

const ProductEditPage = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [sku, setSku] = useState({});
  const [skuList, setSkuList] = useState([]);
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    product: updatedProduct,
  } = productUpdate;

  useEffect(() => {
    if (!product.name || product._id !== id || updatedProduct) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(listProduct(id));
    } else {
      setName(product.name);
      setImage(product.image);
      setAuthor(product.author);
      setGenre(product.genre);
      setDescription(product.description);
      setSkuList(product.sku);
    }
  }, [dispatch, id, product]);

  const addSkuHandler = (e) => {
    e.preventDefault();
    if (sku.feature && sku.price && sku.quantity) {
      setMessage("");
      setSku({ feature: "", price: 0, quantity: 0 });
      setSkuList([...skuList, sku]);
    } else {
      setMessage("All fields are mandatory!");
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const editHandler = (index) => {
    setSku(skuList[index]);
    const updatedSkuList = skuList.filter((value, i) => i !== index);
    setSkuList(updatedSkuList);
  };

  const deleteHandler = (index) => {
    const updatedSkuList = skuList.filter((value, i) => i !== index);
    setSkuList(updatedSkuList);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(id, {
        name,
        image,
        sku: skuList,
        author,
        genre,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate ? (
          <Loader />
        ) : errorUpdate ? (
          <Message variant='danger'>{errorUpdate}</Message>
        ) : (
          updatedProduct && (
            <Message variant='success'>Product updated successfully</Message>
          )
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-3' controlId='name'>
              <Form.Label style={{ fontWeight: 500 }}>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='image'>
              <Form.Label style={{ fontWeight: 500 }}>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                label='Choose File'
                custom='true'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className='my-3' controlId='description'>
              <Form.Label style={{ fontWeight: 500 }}>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='5'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='author'>
              <Form.Label style={{ fontWeight: 500 }}>Author</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='genre'>
              <Form.Label style={{ fontWeight: 500 }}>Genre</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter genre'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <hr className='my-4' />
            {message && <Message variant='danger'>{message}</Message>}

            <Form.Group className='my-3' controlId='feature'>
              <Form.Label style={{ fontWeight: 500 }}>Feature</Form.Label>
              <Form.Control
                type='text'
                placeholder='Eg: Soft cover, hard cover..'
                value={sku.feature}
                onChange={(e) => {
                  setSku({
                    ...sku,
                    feature: e.target.value,
                  });
                }}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Col sm={12} md={6}>
                <Form.Group controlId='price'>
                  <Form.Label style={{ fontWeight: 500 }}>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={sku.price}
                    onChange={(e) => {
                      setSku({
                        ...sku,
                        price: e.target.value,
                      });
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group controlId='quantity'>
                  <Form.Label style={{ fontWeight: 500 }}>Quantity</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter quantity'
                    value={sku.quantity}
                    onChange={(e) => {
                      setSku({
                        ...sku,
                        quantity: e.target.value,
                      });
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Col className='d-flex flex-wrap'>
              <Button
                variant='outline-primary'
                className='me-3 mt-3 flex-shrink-0'
                onClick={addSkuHandler}
              >
                Add SKU
              </Button>
              {skuList.map((sku, index) => (
                <>
                  <span
                    key={sku._id}
                    className='me-3 mt-3 d-inline-block bg-primary text-white py-2 px-3 rounded flex-shrink-0'
                  >
                    {sku.feature.trim().length > 10
                      ? sku.feature.trim().substring(0, 10) + "..."
                      : sku.feature.trim()}
                    <i
                      onClick={() => editHandler(index)}
                      style={{ cursor: "pointer" }}
                      className='fa-solid fa-pencil mx-3'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Edit'
                    ></i>
                    <i
                      onClick={() => deleteHandler(index)}
                      style={{ cursor: "pointer" }}
                      className='fa-solid fa-xmark'
                      data-bs-toggle='tooltip'
                      data-bs-placement='top'
                      title='Remove'
                    ></i>
                  </span>
                </>
              ))}
            </Col>

            <hr className='my-4' />

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;

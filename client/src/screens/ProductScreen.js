import React, { Fragment, useState, useEffect } from 'react';

// Bootstrap imports
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

// routing imports
import { Link } from 'react-router-dom';

// redux import
// import { useDispatch, useSelector } from 'react-redux';

// action imports
// import {
//   getSingleProduct,
//   createProductReview,
// } from '../actions/productAction';

// components imports
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

// type imports
// import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productTypes';

// import test products
import products from '../products';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [type, setType] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const product = products.find((p) => p._id === match.params.id);

  // const dispatch = useDispatch();

  // const productDetails = useSelector((state) => state.productDetails);
  // const { product, error, loading } = productDetails;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const productReviewCreate = useSelector((state) => state.productReviewCreate);
  // const {
  //   success: successProductReview,
  //   error: errorProductReview,
  // } = productReviewCreate;

  // useEffect(() => {
  //   // if (successProductReview) {
  //   //   alert('Review Submitted!');
  //   //   setRating(0);
  //   //   setComment('');
  //   //   dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
  //   // }
  //   // dispatch(getSingleProduct(match.params.id));
  // }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    // e.preventDefault();
    // dispatch(
    //   createProductReview(match.params.id, {
    //     rating,
    //     comment,
    //   })
    // );
  };

  const userInfo = () => {};

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Fragment>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>File Price: ${product.priceFile}</ListGroup.Item>
              <ListGroup.Item>
                Product Price: ${product.priceProduct}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Choose one:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        style={{ width: 'unset' }}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value=''></option>
                        <option value='file'>File</option>
                        <option value='product'>Product</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      {type === 'file'
                        ? '$ ' + product.priceFile
                        : '$ ' + product.priceProduct}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {type === 'product' ? (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          style={{ width: 'unset' }}
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          <option value=''></option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ) : null}

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          style={{ width: 'unset' }}
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.CardcountInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {errorProductReview && (
                  <Message variant='danger'>{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select....</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Great</option>
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
                    <Button type='submit' variant='primary'>
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in </Link> to write a review{' '}
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row> */}
      </Fragment>
    </Fragment>
  );
};

export default ProductScreen;
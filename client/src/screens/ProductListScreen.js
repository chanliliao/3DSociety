import React, { Fragment, useEffect } from 'react';

// router import
import { LinkContainer } from 'react-router-bootstrap';

// bootstrap import
import { Table, Button, Row, Col } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// component import
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

// actions import
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';

// constants import
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productTypes';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  // redux
  const dispatch = useDispatch();

  const productStates = useSelector((state) => state.productStates);
  const {
    product,
    productLoading,
    productError,
    productList,
    productDeleted,
    productCreated,
    productUpdated,
    page,
    pages,
  } = productStates;

  const userStates = useSelector((state) => state.userStates);
  const { userCurrent } = userStates;

  useEffect(() => {
    if (productCreated) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (productDeleted) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    if (!userCurrent || !userCurrent.isAdmin) {
      history.push(`/login`);
    }
    if (productCreated) {
      history.push(`/admin/product/${product._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    productDeleted,
    productCreated,
    productUpdated,
    product,
    userCurrent,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Please Confirm You Are Deleting A Product')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Fragment>
      <Meta title='List Of Products' />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'> CREATE PRODUCT</i>
          </Button>
        </Col>
      </Row>
      {productDeleted && <Loader />}
      {productError && <Message variant='danger'>{productError}</Message>}
      {productCreated && <Loader />}
      {productError && <Message variant='danger'>{productError}</Message>}
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <Message variant='danger'>{productError}</Message>
      ) : (
        <Fragment>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                {/* <th>FILE PRICE</th> */}
                <th>PRODUCT PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  {/* <td>${product.priceFile}</td> */}
                  <td>${product.priceProduct}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductListScreen;

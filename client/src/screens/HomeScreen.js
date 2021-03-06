import React, { Fragment, useEffect } from 'react';

// router
import { Link } from 'react-router-dom';

// components
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

// bootstrap
import { Row, Col } from 'react-bootstrap';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  // grab data
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  // redux
  const dispatch = useDispatch();
  const productStates = useSelector((state) => state.productStates);
  const { productList, productLoading, productError, page, pages } =
    productStates;

  // list all products
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta title='Home' />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Creations</h1>
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <Message variant='danger'>{productError}</Message>
      ) : (
        <Fragment>
          <Row>
            {productList.map((product) => (
              <Col
                className='align-items-stretch d-flex'
                key={product._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ''}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;

import React, { Fragment, useEffect } from 'react';

// router import
import { LinkContainer } from 'react-router-bootstrap';

// boostrap import
import { Table, Button, Row, Col } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// component import
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

// actions import
import { listOrders } from '../actions/orderActions';

// constants import
import { ORDER_REQUEST } from '../constants/orderTypes';

const OrderListScreen = ({ history }) => {
  // redux
  const dispatch = useDispatch();

  const orderStates = useSelector((state) => state.orderStates);
  const { orderLoading, orderError, orderList } = orderStates;

  const userStates = useSelector((state) => state.userStates);
  const { userCurrent } = userStates;

  useEffect(() => {
    if (userCurrent && userCurrent.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push(`/login`);
    }
  }, [dispatch, history, userCurrent]);

  const onClick = () => {
    dispatch({ type: ORDER_REQUEST });
  };

  return (
    <Fragment>
      <Meta title='List Of Orders' />
      <Row className='align-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {orderLoading ? (
        <Loader />
      ) : orderError ? (
        <Message variant='danger'>{orderError}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  $
                  {order.totalPrice
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={onClick}
                    >
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default OrderListScreen;

import React, { useState, useEffect } from 'react';

// bootstrap import
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// component import
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

// action import
import { updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { ORDER_REQUEST } from '../constants/orderTypes';
import { USER_UPDATE_RESET } from '../constants/userTypes';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userStates = useSelector((state) => state.userStates);
  const { userLoading, userError, userUpdated, userCurrent } = userStates;

  const orderStates = useSelector((state) => state.orderStates);
  const { orderList, orderLoading, orderError } = orderStates;

  useEffect(() => {
    if (!userCurrent) {
      history.push('/login');
    } else {
      dispatch(listMyOrders());
      if (!userCurrent.name || userUpdated) {
        // dispatch(getUserDetails('profile'));
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(listMyOrders());
      } else {
        setName(userCurrent.name);
        setEmail(userCurrent.email);
      }
    }
  }, [dispatch, history, userCurrent, userUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({ id: userCurrent._id, name, email, password })
      );
    }
  };

  const onClick = (e) => {
    dispatch({ type: ORDER_REQUEST });
  };

  return (
    <Row>
      <Meta title='Profile' />
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {userError && <Message variant='danger'>{userError}</Message>}
        {userUpdated && <Message variant='success'>Profile Updated</Message>}
        {userLoading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group ControlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group ControlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group ControlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group ControlId='comfrimPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {orderLoading ? (
          <Loader />
        ) : orderError ? (
          <Message variant='danger'>{orderError}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>MORE INFO</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
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
                        className='btn-sm'
                        variant='light'
                        onClick={onClick}
                      >
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;

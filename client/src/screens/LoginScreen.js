import React, { useState, useEffect } from 'react';

// router import
import { Link } from 'react-router-dom';

// bootstrap import
import { Row, Col, Form, Button } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// component import
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

// action import
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // redux
  const dispatch = useDispatch();
  const userStates = useSelector((state) => state.userStates);
  const { userLoading, userError, userCurrent } = userStates;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userCurrent) {
      history.push(redirect);
    }
  }, [history, userCurrent, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Meta title='Login' />
      <h1>Sign In</h1>
      {userError && <Message variant='danger'>{userError}</Message>}
      {userLoading && <Loader />}
      {/* login */}
      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      {/* register */}
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect-${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

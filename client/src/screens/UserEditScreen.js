import React, { Fragment, useState, useEffect } from 'react';

// router import
import { Link } from 'react-router-dom';

// bootstrap import
import { Form, Button } from 'react-bootstrap';

// redux import
import { useDispatch, useSelector } from 'react-redux';

// component import
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

// actions import
import { getUserDetails, updateUser } from '../actions/userActions';

// constant import
import { USER_UPDATE_RESET } from '../constants/userTypes';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // redux
  const dispatch = useDispatch();

  const userStates = useSelector((state) => state.userStates);
  const { userLoading, userError, user, userCurrent, userUpdated } = userStates;

  useEffect(() => {
    if (userCurrent && userCurrent.isAdmin) {
      if (userUpdated) {
        dispatch({ type: USER_UPDATE_RESET });
        history.push('/admin/userlist');
      } else {
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
      }
    } else {
      history.push(`/login`);
    }
  }, [dispatch, userId, user, history, userCurrent, userUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <Fragment>
      <Meta title='Edit User' />
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>EDIT USER</h1>
        {userLoading && <Loader />}
        {userError && <Message variant='danger'>{userError}</Message>}

        {userLoading ? (
          <Loader />
        ) : userError ? (
          <Message variant='danger'>{userError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;

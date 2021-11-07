import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';
import Banner from '../../banner/banner.component';

import {
  userSignInSuccess,
  userSignInFailure,
} from '../../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async e => {
    const { email, password } = this.state;
    const { userSignInSuccess, userSignInFailure } = this.props;
    e.preventDefault();

    try {
      const config = {
        'Centent-Type': 'application/json',
      };

      const body = {
        email,
        password,
      };

      const res = await axios.get('/api/user/sign-in', config, body);
      const userObj = res.data;
      console.log('user', userObj);

      const cookieObj = await axios.get('/api/user/checkCookie');
      console.log('cookie:', cookieObj.data);

      userSignInSuccess(userObj);
    } catch (err) {
      alert('Sign in has failed');
      console.error('ERROR UPON SIGN-IN:', err);
      userSignInFailure();
    }

    this.setState({
      email: '',
      password: '',
    });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, password } = this.state;
    return (
      <div className='sign-in-page'>
        <Banner>Welcome back, please sign in!</Banner>
        <form onSubmit={handleSubmit}>
          <div className='sign-in-input-container'>
            <InputBox
              label='Email'
              type='text'
              name='email'
              value={email}
              onChange={handleChange}
              required
            />
            <InputBox
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <CustomButton type='submit' locatedIn='btn-in-sign-in-page'>
            Sign In
          </CustomButton>
        </form>
        <Link
          linkStyle='inline-link'
          linkName='You are not registered yet? Sign up here!'
          urlToGo='/sign-up'
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userSignInSuccess: userObj => dispatch(userSignInSuccess(userObj)),
  userSignInFailure: () => dispatch(userSignInFailure()),
});

export default connect(null, mapDispatchToProps)(SignInPage);

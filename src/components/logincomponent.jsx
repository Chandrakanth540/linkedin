import { useState } from 'react';
import '../css/logincomponent.scss';
import { LineWave, Vortex } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import { LoginAPI } from '../api/loginapi';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { GoogleLoginAPI } from '../api/loginapi';
import Homecomponent from './homecomponent';
import Homepage from '../homepage';
const LoginComponent = ({ request }) => {
  console.log(request);
  const naviagate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [emaillength, setemaillength] = useState(0);
  const [passwordlength, setpasswordlength] = useState(0);
  const [showpass, setShowpass] = useState(false);
  const [Loading, setLoading] = useState(false);
  const input_pass = document.querySelector('.input-password');

  const showPassFun = () => {
    if (!showpass) {
      input_pass.type = 'text';
    } else {
      input_pass.type = 'password';
    }
    setShowpass(!showpass);
  };
  const checkLoginCredentials = async () => {
    setLoading(true);
    try {
      let resp = await LoginAPI(credentials.email, credentials.password);
      setLoading(false);
      toast.success('logged success');
      naviagate('/homecomponent');
    } catch (e) {
      setLoading(false);
      toast.error('check your internet connection');
    }
  };
  console.log(credentials.password);

  const SignwithGoogle = async () => {
    try {
      let response = await GoogleLoginAPI();
      console.log(response);
      toast.success('signed in successfully');
      naviagate('/homecomponent');
    } catch (err) {
      toast.error('Check your internet connection');
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="title-content">
          <p>Sign in</p>
          <h5> stay updated on your professional world</h5>
        </div>
        {emaillength > 0 ? <span className="span-email">Email</span> : ''}
        <label htmlFor="email">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              className="input-email"
              placeholder="Email"
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
                setemaillength(e.target.value.length);
              }}
            />
          </div>
        </label>
        {passwordlength > 0 ? <span className="span-pass">Password</span> : ''}
        <div className="input-pass-login">
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="input-password"
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
                setpasswordlength(e.target.value.length);
              }}
            />
          </label>
          <button
            className="pass-show-btn"
            type="button"
            onClick={() => showPassFun()}
          >
            {showpass ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div>
          <label>
            <a href="#">Forgot Password?</a>
          </label>
        </div>
        <button className="formal-btn" onClick={() => checkLoginCredentials()}>
          {Loading ? (
            <Vortex
              visible={true}
              height="40"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                outline: 'none',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'orange', 'orange', 'red']}
            />
          ) : (
            'Sign in'
          )}
        </button>
        <div className="line-or">
          <div className="line1"></div>
          <span>or</span>
          <div className="line2"></div>
        </div>

        <div className="googlebutton">
          <button
            className="formal-btn google-btn"
            onClick={() => SignwithGoogle()}
          >
            <img
              src="../src/assets/images/google.png"
              alt=""
              className="google-icon"
            />
            <span>Continue with google</span>
          </button>
        </div>
      </div>
      <div>
        <p className="join-now">
          New to Enlace Hub ? <NavLink to="/register">Join now</NavLink>
        </p>
      </div>
      {/* <MainFooter/> */}
    </>
  );
};
export default LoginComponent;

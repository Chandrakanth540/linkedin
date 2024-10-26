import { useState } from 'react';
import '../css/logincomponent.scss';
import { Bars, ColorRing, LineWave, Watch } from 'react-loader-spinner';
import MainFooter from '../footer';
import { GoogleLoginAPI, RegisterAPI } from '../api/loginapi';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    secondpassword: '',
  });
  const [emaillength, setemaillength] = useState(0);
  const [passwordlength, setpasswordlength] = useState(0);
  const [secondpasswordlength, setsecondpasswordlength] = useState(0);
  const [showpass, setShowpass] = useState(false);
  const [showsecondpass, setSecondShowpass] = useState(false);
  const input_pass = document.querySelector('.input-password');
  const input_secondpass = document.querySelector('.input-secondpassword');
  const [isLoading, setisLoading] = useState(false);
  const showSecondPassFun = () => {
    if (!showsecondpass) {
      input_secondpass.type = 'text';
    } else {
      input_secondpass.type = 'password';
    }
    setSecondShowpass(!showsecondpass);
  };

  const showPassFun = () => {
    if (!showpass) {
      input_pass.type = 'text';
    } else {
      input_pass.type = 'password';
    }
    setShowpass(!showpass);
  };
  const checkRegisterCredentials = async () => {
    setisLoading(true);

    try {
      let resp = await RegisterAPI(
        credentials.email,
        credentials.password,
        credentials.secondpassword,
      );
      if (resp == 'passwordError') {
        setisLoading(false);
        toast.error('Check agin password');
      } else {
        setisLoading(false);
        toast.success('Registered Successfully');
      }
    } catch (e) {
      setisLoading(false);
      toast.error('Failed to register');
    }
  };

  const SignwithGoogle = async () => {
    try {
      let response = await GoogleLoginAPI();
      console.log(response);

      toast.success('signed in successfully');
      navigate('/homecomponent');
    } catch (err) {
      toast.error('error signin');
    }
  };

  return (
    <>
      <div></div>
      <div className="login-wrapper">
        <div className="title-content">
          <p>Sign up</p>
          <h4> Make the most of your professional life</h4>
        </div>

        {emaillength > 0 ? <span className="span-email">Email</span> : ''}
        <div>
          <label htmlFor="email">
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
          </label>
        </div>
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
          {/* ---------------- */}

          {secondpasswordlength > 0 ? (
            <span className="span-secondpass">Re-TypePassword</span>
          ) : (
            ''
          )}
          <div className="input-pass-login">
            <label htmlFor="password">
              <input
                type="password"
                id="password1"
                name="password"
                placeholder="Re-TypePassword"
                className="input-secondpassword"
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    secondpassword: e.target.value,
                  });
                  setsecondpasswordlength(e.target.value.length);
                }}
              />
            </label>
            <button
              className="pass-show-btn"
              type="button"
              onClick={() => showSecondPassFun()}
            >
              {showsecondpass ? (
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

          {/* ---------------- */}
        </div>
        <button
          className="formal-btn"
          onClick={() => checkRegisterCredentials()}
        >
          {isLoading ? (
            // https://mhnpd.github.io/react-loader-spinner/docs/components/watch

            <Watch
              height="25"
              width="80"
              radius="48"
              color="white"
              ariaLabel="watch-loading"
              wrapperStyle={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                outline: 'none',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            'Join now'
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
          Already on Enlace Hub ? <NavLink to="/login">Sign in</NavLink>
        </p>
      </div>
      {/* <MainFooter/> */}
    </>
  );
};
export default RegisterComponent;

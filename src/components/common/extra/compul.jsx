import { useState } from 'react';
import './loginscss.scss';
import { LineWave, Vortex, Watch } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

import { LoginAPI, RegisterAPI } from '../../../api/loginapi';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { GoogleLoginAPI } from '../../../api/loginapi';
import Homecomponent from '../../homecomponent';
import Homepage from '../../../homepage';
import React from 'react';
import { Avatar, Button, Checkbox, Form, Input } from 'antd';
import { TiUserAddOutline, TiUserOutline } from 'react-icons/ti';
import { MdLockOutline, MdOutlineDone } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import { BiUserPlus } from 'react-icons/bi';
import { HiUserPlus } from 'react-icons/hi2';
const RegisterComponent = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const checkRegisterCredentials = async (e) => {
    console.log(e);

    setisLoading(true);

    try {
      let resp = await RegisterAPI(e.email, e.password, e.username);
      if (!resp == false) {
        toast.success('registered');
        setisLoading(false);
        setIsRegistered(true);
      } else {
        setisLoading(false);
        toast.error('failed to register');
      }

      //   navigate('/login');
    } catch (e) {
      setisLoading(false);
      toast.error('Failed to register');
    }
  };
  function onFinishFailed() {
    console.log('failed');
  }

  return (
    <div className="register-form">
      <Form
        onFinish={checkRegisterCredentials}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <p>Sign up</p>
        </div>
        <Form.Item name="username" rules={[{ required: true, message: '' }]}>
          <Input
            style={{ height: 55, width: 400 }}
            prefix={<TiUserOutline size={12} />}
            // size="large"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: '' }]}>
          <Input
            style={{ height: 55, width: 400 }}
            prefix={<TfiEmail size={12} />}
            // size="large"
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '' }]}>
          <Input.Password
            prefix={<MdLockOutline />}
            placeholder="Password"
            // size="large"
            style={{ height: 55, width: 400 }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-submit-btn">
            {isLoading ? (
              <Watch
                height="30"
                width="60"
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
              <>
                {!isRegistered ? (
                  <div>
                    <HiUserPlus />
                    <span>Register</span>
                  </div>
                ) : (
                  <div>
                    <MdOutlineDone />
                    <span>Registered</span>
                  </div>
                )}
              </>
            )}
          </Button>
        </Form.Item>
        <div className="line-after-submit">
          <div className="line1"></div>
          <span>or</span>
          <div className="line2"></div>
        </div>
        <div className="googlesignin-div">
          <button onClick={() => SignwithGoogle()}>
            <Avatar
              shape="square"
              size={20}
              src="../src/assets/images/google.png"
            />
            <span>Continue with google</span>
          </button>
        </div>
      </Form>
    </div>
  );
};
export default RegisterComponent;

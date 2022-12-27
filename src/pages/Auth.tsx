import React, { useState, useContext } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Auth.module.scss'
import { useNavigate } from 'react-router-dom';
import axios from '../api/index';

const LOGIN_URL = '/auth';
const AuthPage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle button click of login form
  const HandleLogin = async (values: { username: any; password: any; }) => {
    await axios.post(LOGIN_URL, { username: values.username, password: values.password }).then(response => {
      setLoading(false);
      const token = response?.data?.responseData?.token;
      const user = response?.data?.responseData?.username
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    }).catch(error => {
      setLoading(false);
      console.log(error);
      if (error?.code === 'ERR_NETWORK') setError(error.message);
      else setError(null);
    });
  }

  return (
    <div className={styles.loginWrapper}>
      <Form className={styles.loginForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={HandleLogin}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="username"
          rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
        >
          <Input prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Tên đăng nhập' />
        </Form.Item>

        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
        >
          <Input.Password prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Mật khẩu' />
        </Form.Item>

        <p style={{'paddingBottom': '1rem'}}>{error}</p>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit"
            className={styles.submitForm}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AuthPage
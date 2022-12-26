import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // handle button click of login form
    const handleLogin = (values) => {
        setError(null);
        setLoading(true);
        console.log(values);
        axios.post('http://10.10.100.21:8762/auth', { username: values.username, password: values.password }).then(response => {
            setLoading(false);
            console.log(response);
            sessionStorage.setItem('token', response.data.responseData.token);
            sessionStorage.setItem('user', JSON.stringify(response.data.responseData.username));
            navigate('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.loginWrapper}>
            <Form className={styles.loginForm}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label=""
                    name="username"
                    rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
                >
                    <Input prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Tên đăng nhập'/>
                </Form.Item>

                <Form.Item
                    label=""
                    name="password"
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                >
                    <Input.Password prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Mật khẩu'/>
                </Form.Item>

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

export default Login
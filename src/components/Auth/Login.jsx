import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Icon from '@ant-design/icons';
import axios from 'axios';
import styles from './Login.module.scss'
import { setUserSession } from '../../Utils/Common';
import { useNavigate } from 'react-router-dom';

const useFormInput = initialValues => {
    const [value, setValue] = useState(initialValues);
    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value, onchange: handleChange
    }
}

const Login = (props) => {
    const username = useFormInput('')
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // handle button click of login form
    const handleLogin = (values) => {
        console.log(25);
        setError(null);
        setLoading(true);
        console.log(values);
        axios.post('http://10.10.100.21:8762/auth', { username: values.username, password: values.password }).then(response => {
            setLoading(false);
            console.log(response);
            setUserSession(response.data.responseData.token, response.data.responseData.username);
            navigate('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

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
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                </Form.Item>

                <Form.Item
                    label=""
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                </Form.Item>

                {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

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
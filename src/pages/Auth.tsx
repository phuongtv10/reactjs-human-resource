import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Auth.module.scss'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/auth.api';
import { ACCESS_TOKEN, STATUS_CODE } from '../core/constants';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/features/auth.slice';
import {useCookies} from 'react-cookie'
const AuthPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [_,setCookie] = useCookies()

  const dispatch = useDispatch()


  const [login] = useLoginMutation()

  const navigate = useNavigate()


  const handleLogin = async (values: {username: string,password: string}) => {

   try {
    setIsLoading(true)
    const result = await login(values).unwrap()
    
    if(result.responseCode !== STATUS_CODE.SUCCESS) {
      setTimeout(() => {
        setIsLoading(false)
        setError(result.responseMessage)
      },1500)

      return
    }

    setCookie(ACCESS_TOKEN,result.responseData.token)

    dispatch(loginAction({
      data: result.responseData.employeeInfo,
    }))
    navigate('/dashboard')
   } catch (error) {
      console.log(error)
   }

  }

  return (
    <div className={styles.loginWrapper}>
      <Form className={styles.loginForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
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
            loading={isLoading}
            className={styles.submitForm}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AuthPage

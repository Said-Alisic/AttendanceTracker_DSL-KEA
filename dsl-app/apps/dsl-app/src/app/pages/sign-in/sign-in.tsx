import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { getUserByEmail } from '../users/users.service';
import './sign-in.module.css';

/* eslint-disable-next-line */
export interface SignInProps {}

function SignIn(props: SignInProps) {

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 8 },
  };
   
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const handleSubmit = (values) => {
      getUserByEmail(values.email)
      .then(res => {
        if(res.data.password === values.password) {
          window.location.replace('/attendances')
          localStorage.setItem('user', JSON.stringify(res.data))
        }
        else {
          setInvalidPassword(true)
        }
      })
      .catch(err => {
        console.log(err);
        setInvalidEmail(true)
      })

    }
  
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignIn;


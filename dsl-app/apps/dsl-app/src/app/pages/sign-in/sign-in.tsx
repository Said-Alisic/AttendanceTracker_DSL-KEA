import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { signInUser } from './sign-in.service';
import './sign-in.module.css';

function SignIn() {

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
    signInUser(values)
    .then(res => {
      localStorage.setItem('authUser', JSON.stringify(res.data))
      setInvalidPassword(true)
      if(res.data.user.role === 'TEACHER') { 
        window.location.replace('/attendances') 
      } else if (res.data.user.role === 'STUDENT') {
        window.location.replace('/submit-attendance') 
      } else if (res.data.user.role === 'ADMIN') {
        window.location.replace('/classes') 
      }     
    })
    .catch(err => {
      setInvalidEmail(true)
      setInvalidPassword(true)
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


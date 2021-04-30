import { useState } from 'react';
import { Modal, Form, Input, Button, Select   } from 'antd';
import { User } from '@dsl-app/api-interfaces';

import './user-modal.module.css';
import { postUser } from '../users.service';

/* eslint-disable-next-line */
export interface UserModalrops {}

export function UserModal(props: UserModalrops) {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { Option } = Select;

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 8 },
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (values) => {
    setIsModalVisible(false);
    const newUser: User = values;
    postUser(newUser)
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <>
      <Button className="modalBtn" type="primary" onClick={showModal}>
        Add User
      </Button>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={[null]} closable={false}>
          <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => handleSubmit(values)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input a first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please input a last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input a email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input a password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
             <Select
                placeholder="Select a role"
                allowClear
              >
              <Option value="STUDENT">Student</Option>
              <Option value="TEACHER">Teacher</Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UserModal;

import { useState, useEffect } from 'react';
import { Class, ClassTeacher } from '@dsl-app/api-interfaces';
import { Modal, Form, Input, Button, Select } from 'antd';

import './class-modal.module.css';
import { postClass, postClassTeacher } from '../classes.service';
import { getStudents } from '../../users/users.service';
import { getTeachers } from '../../users/users.service';

/* eslint-disable-next-line */
export interface ClassModalProps {}

export function ClassModal(props: ClassModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);

  const { Option } = Select;

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 8 },
  };

  useEffect(() => {
    getTeachers().then(res => {
      setTeachers(res.data)
    })
    .catch(err => console.log(err))
  })

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
    const newClass: Class = {
      name: values.class_name,
    };
    postClass(newClass)
    .then((res) => {
      const teacher : ClassTeacher = {
        teacher_id: values.teacher_id,
        class_id: res.data.id,
      }
      postClassTeacher(teacher)
      .catch((err) => console.log(err))
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Button className="modalBtn" type="primary" onClick={showModal}>
        Add a new class
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
            label="Class Name"
            name="class_name"
            rules={[{ required: true, message: 'Please input a class name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="Teacher"
              name="teacher_id"
              rules={[{ required: true, message: 'Please select a teacher!' }]}
            >
              <Select
                  placeholder="Select a teacher"
                  allowClear
                >
                {teachers.map((teacher, index) => {
                  return (
                    <Option value={teacher.id} key={index}>{teacher.first_name} {teacher.last_name}</Option>
                    )
                })}
              </Select>
            </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Add Class
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ClassModal;

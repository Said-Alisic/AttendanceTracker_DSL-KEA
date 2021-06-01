import { useState } from 'react';
import { User } from '@dsl-app/api-interfaces';
import { Modal, Form, Button, Select } from 'antd';

import './class-modal-add-student.module.css';
import { postClassStudents } from '../classes.service';
import { getPossibleClassStudents } from '../classes.service';

export interface ClassModalAddStudentProps {
  class_id: number;
}

export function ClassModalAddStudent(props: ClassModalAddStudentProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState<User[]>([]);
  const { Option } = Select;

  const options = [];
  students.forEach((student, index) => {
    options.push(<Option value={student.id} key={index}>{student.first_name} {student.last_name}</Option>);
  })

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 8 },
  };

  const showModal = () => {
    getPossibleClassStudents(props.class_id).then(res => {
      setStudents(res.data)
    })
    .catch(err => console.log(err))
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
    postClassStudents(props.class_id, values)
    .then(() => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <Button className="modalBtn" type="primary" onClick={showModal}>
        Add student(s)
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
              label="Students"
              name="student_ids"
              rules={[{ required: true, message: 'Please select a student!' }]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select one or more students."
              >
                {options}
              </Select>
            </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Add student(s)
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ClassModalAddStudent;

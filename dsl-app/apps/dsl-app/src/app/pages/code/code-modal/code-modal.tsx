import { useState, useEffect } from 'react';
import { Modal, Form, Button, Select } from 'antd';
import { Code, Class } from '@dsl-app/api-interfaces';

import './code-modal.module.css';
import { postCode } from '../code.service';
import { getClasses } from '../../classes/classes.service';
import { postAttendances } from '../../attendance/attendance.service';

/* eslint-disable-next-line */
export interface CodeModalProps {}

function CodeModal(props: CodeModalProps) {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const [classes, setClasses] = useState<Class[]>([])
  const [codeString, setCodeString] = useState<string>("")

  const [teacherLat, setTeacherLat] = useState("0")
  const [teacherLon, setTeacherLon]= useState("0")

  const { Option } = Select;

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 8 },
  };

  useEffect(() => {
    getClasses().then(res => {
      setClasses(res.data)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserCoords);
      }
    })
    .catch(err => console.log(err))
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const codeCancel = () => {
    setIsCodeVisible(false);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getUserCoords = (coords) => {
    setTeacherLat(coords.coords.latitude)
    setTeacherLon(coords.coords.longitude)
  }

  const generateCode = (length): string => {
    const result           = [];
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
      charactersLength)));
    }
    return result.join('');
  };

  const createCode = (values) : Code => {
    setIsModalVisible(false);

    const code = generateCode(8);
    setCodeString(code)

    const newCode: Code = { 
      class_id: values.class_id, 
      code_string: code,
      coord_lat: teacherLat,
      coord_lon: teacherLon,
      timeslot: values.timeslot,
    };
    return newCode;
  }

  const handleSubmit = (values) => {
    const newCode: Code = createCode(values)

    postCode(newCode)
    .then(res => {
      postAttendances(res.data.id, res.data.class_id);
      setIsCodeVisible(true);
    })
    .catch(err => {
      console.log(err);
      setIsCodeVisible(false);
    });
  }
  if (navigator.geolocation) {
    return (
      <>
        <Button 
        size="large" 
        className="modalBtn" 
        type="primary" 
        onClick={showModal}>
          Generate Attendance Code
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
              label="Class"
              name="class_id"
              rules={[{ required: true, message: 'Please select a class!' }]}
            >
              <Select
                  placeholder="Select a class"
                  allowClear
                >
                {classes.map((classItem, index) => {
                  return (
                    <Option value={classItem.id} key={index}>{classItem.name}</Option>
                    )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Time slot"
              name="timeslot"
              rules={[{ required: true, message: 'Please select a time slot!' }]}
            >
              <Select
                  placeholder="Select a time slot"
                  allowClear
                >
                <Option value="8:30:00">08:30 - 09:15</Option>
                <Option value="9:15:00">9:15 - 10:00</Option>
                <Option value="10:00:00">10:00 - 10:45</Option>
                <Option value="10:45:00">10:45 - 11:30</Option>
                <Option value="11:30:00">11:30 - 12:15</Option>
                <Option value="12:15:00">12:15 - 13:00</Option>
                <Option value="13:00:00">13:00 - 13:45</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Generate code
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="Please check your attendance by submitting the code below" 
                
                visible={isCodeVisible}
                closable={false} 
                maskClosable={false}
                footer={[
                  <Button key="okBtn" type="primary" onClick={codeCancel}>
                    Close
                  </Button>
                ]}>
          <h2>{codeString}</h2>
        </Modal>
      </>
    );
  } else {
    return (
      <div>
        <h2>Location service must be enabled</h2>
      </div>
    )
  }
}

export default CodeModal;
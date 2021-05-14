import { useState, useEffect } from 'react';
import { Attendance, Class } from '@dsl-app/api-interfaces';
import { Table, Button, Form, Select } from 'antd';

import './attendance.module.css';
import { getAttendancesByClass } from './attendance.service';
import { getClasses } from '../classes/classes.service';

/* eslint-disable-next-line */
export interface AttendancesProps {}

function Attendances(props: AttendancesProps) {
  const { Column } = Table;

  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  
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
    })
    .catch(err => console.error(err))
  }, [])

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (values) => {
    getAttendancesByClass(values.class_id)
    .then(res => {
      setAttendances(res.data)  
    })
  }

  return (
    <>
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Check Attendance
            </Button>
          </Form.Item>
        </Form>
      <Table dataSource={attendances} rowKey="id" pagination={{defaultPageSize: 10, hideOnSinglePage: true}} >
      <Column title="Class Name" dataIndex="name" key="name" />
      <Column title="Student Email" dataIndex="email" key="email" />
      <Column title="First Name" dataIndex="first_name" key="first_name" />
      <Column title="Last Name" dataIndex="last_name" key="last_name" />
      <Column title="Present" dataIndex="present" key="present" />
      <Column title="Attendance Note" dataIndex="description" key="description" />
      <Column title="Date" dataIndex="date" key="date" />
      <Column title="Time Slot" dataIndex="timeslot" key="timeslot" />
    </Table>
  </>
  );
}

export default Attendances;

import { useState, useEffect } from 'react';
import { Attendance, Class, UserClassAttendance } from '@dsl-app/api-interfaces';
import { Button, Form, Select, Radio } from 'antd';
import 'antd/dist/antd.css';

import './attendance.module.css';
import { getAttendancesByClass, getAttendanceStatsByClass } from './attendance.service';
import { getClasses } from '../classes/classes.service';
import AttendancesTable from './attendances-table/attendances-table';
import AttendanceStatsTable from './attendance-stats-table/attendance-stats-table';

function Attendances() {

  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [userClassAttendances, SetUserClassAttendances] = useState<UserClassAttendance[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [checked, setChecked] = useState<boolean>(false);
  
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
    if(checked) {
      getAttendanceStatsByClass(values.class_id)
      .then(res => {
        SetUserClassAttendances(res.data)  
      })
    } else {
      getAttendancesByClass(values.class_id)
      .then(res => {
        setAttendances(res.data)  
      })
    }
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
        <Radio.Group 
        onChange={({ target: { value } }) => {
          setChecked(value);
        }}
      >
        <Radio value={false}>Show class user attendance</Radio>
        <Radio value={true}>Show class user attendance by percentage</Radio>
      </Radio.Group>
        { checked
        ? <AttendanceStatsTable userClassAttendances={userClassAttendances}/>
        : <AttendancesTable attendances={attendances}/>
      }
  </>
  );
}

export default Attendances;

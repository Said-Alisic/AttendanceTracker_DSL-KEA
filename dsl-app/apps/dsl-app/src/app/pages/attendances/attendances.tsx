import { useState, useEffect} from 'react';
import { Attendance } from '@dsl-app/api-interfaces';
import { Table, Button, Space } from 'antd';

import './attendances.module.css';
import { getAttendancesByClass } from './attendances.service';

/* eslint-disable-next-line */
export interface AttendancesProps {}

function Attendances(props: AttendancesProps) {
  const { Column } = Table;

  const [attendances, setAttendances] = useState<Attendance[]>([])
  
  useEffect(() => {
    getAttendancesByClass(1).then(res => {
      setAttendances(res.data)  

      
      
    })
  }, [])

  return (
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
  );
}

export default Attendances;

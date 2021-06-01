import { Attendance } from '@dsl-app/api-interfaces';
import { Table } from 'antd';

import './attendances-table.module.css';

/* eslint-disable-next-line */
export interface AttendancesTableProps {
  attendances: Attendance[];
}

export function AttendancesTable(props: AttendancesTableProps) {
  const { Column } = Table;

  return (
    <Table dataSource={props.attendances} rowKey="id" pagination={{defaultPageSize: 10, hideOnSinglePage: true}} >
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

export default AttendancesTable;

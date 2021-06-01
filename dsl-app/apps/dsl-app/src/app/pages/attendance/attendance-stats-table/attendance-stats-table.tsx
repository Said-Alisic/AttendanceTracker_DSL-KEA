import { UserClassAttendance } from '@dsl-app/api-interfaces';
import { Table } from 'antd';

import './attendance-stats-table.module.css';

export interface AttendanceStatsTableProps {
  userClassAttendances: UserClassAttendance[];
}

export function AttendanceStatsTable(props: AttendanceStatsTableProps) {
  const { Column } = Table;

  return (
    <Table dataSource={props.userClassAttendances} rowKey="id" pagination={{defaultPageSize: 10, hideOnSinglePage: true}} >
      <Column title="Class Name" dataIndex="name" key="name" />
      <Column title="Student Email" dataIndex="email" key="email" />
      <Column title="First Name" dataIndex="first_name" key="first_name" />
      <Column title="Last Name" dataIndex="last_name" key="last_name" />
      <Column title="Percentage Present" dataIndex="percentage_present" key="percentage_present" />
      <Column title="Percentage Not Present" dataIndex="percentage_not_present" key="percentage_not_present" />
    </Table>
  );
}

export default AttendanceStatsTable;

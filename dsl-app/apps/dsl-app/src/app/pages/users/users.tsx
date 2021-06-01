import { User } from '@dsl-app/api-interfaces';
import { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';

import './users.module.css';
import { getUsers } from './users.service';
import UserModal from './user-modal/user-modal'

export function Users() {
  const { Column } = Table;

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers().then(res => {
      setUsers(res.data)
    })
    .catch (err => console.log(err))
  }, [])

  return (
    <>
      <UserModal/>
      <Table dataSource={users} rowKey="id" pagination={{defaultPageSize: 10, hideOnSinglePage: true}} >
      <Column title="First Name" dataIndex="first_name" key="first_name" />
      <Column title="Last Name" dataIndex="last_name" key="last_name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Role" dataIndex="role" key="role" />
      <Column
        title="Action"
        key="action"
        render={() => (
          <Space size="middle">
            <Button type="primary">Update</Button>
            <Button type="primary" danger>Delete</Button>
          </Space>
        )}
      />
    </Table>
  </>
  );
}

export default Users;

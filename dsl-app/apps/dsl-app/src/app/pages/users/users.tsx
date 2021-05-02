import { User } from '@dsl-app/api-interfaces';
import { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';

import './users.module.css';
import { getUsers } from './users.service';
import UserModal from './user-modal/user-modal'

/* eslint-disable-next-line */
export interface UsersProps {}

export function Users(props: UsersProps) {

  const { Column } = Table;

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers().then(res => {
      setUsers(res.data)
      
    })
  }, [])

  return (
    <>
      <UserModal>Create User</UserModal>
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
            <Button>Update</Button>
            <Button>Delete</Button>
          </Space>
        )}
      />
    </Table>
  </>
  );
}

export default Users;
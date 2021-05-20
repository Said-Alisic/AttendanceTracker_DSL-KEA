import { useState, useEffect} from 'react';
import { Class } from '@dsl-app/api-interfaces';
import { Table, Button, Space } from 'antd';
import ClassModal from './class-modal/class-modal';

import './classes.module.css';
import { getClasses } from './classes.service';

/* eslint-disable-next-line */
export interface ClassesProps {}

export function Classes(props: ClassesProps) {

  const { Column } = Table;

  const [classes, setClasses] = useState<Class[]>([])
  
  useEffect(() => {
    getClasses().then(res => {
      setClasses(res.data)  
    })
    .catch(err => console.log(err))
  }, [])

  // map() item instead of class, because 'class' is a reserved keyword
  return (
    <>
      <ClassModal/>
      <Table dataSource={classes} rowKey="id" pagination={{defaultPageSize: 10, hideOnSinglePage: true}} >
      <Column title="Class Name" dataIndex="name" key="name" />
      <Column title="Class Teacher (ID for now as filler)" dataIndex="id" key="id" />
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

export default Classes;

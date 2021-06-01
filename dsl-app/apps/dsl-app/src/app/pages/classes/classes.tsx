import { useState, useEffect} from 'react';
import { Class } from '@dsl-app/api-interfaces';
import { Table, Space } from 'antd';
import ClassModal from './class-modal/class-modal';
import ClassModalAddStudent from './class-modal-add-student/class-modal-add-student';
import ClassModalRemoveStudent from './class-modal-remove-student/class-modal-remove-student';

import './classes.module.css';
import { getAllClasses } from './classes.service';

export function Classes() {

  const { Column } = Table;

  const [classes, setClasses] = useState<Class[]>([])
  
  useEffect(() => {
    getAllClasses().then(res => {
      setClasses(res.data)  
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ClassModal/>
      <Table dataSource={classes} rowKey={record =>record.id}  pagination={{defaultPageSize: 10, hideOnSinglePage: true}} >
      <Column title="Class Name" dataIndex="name" key="name" />
      <Column title="Class Teacher (ID for now as filler)" dataIndex="id" key="teacher" />
      <Column
        title="Action"
        key="id"
        dataIndex="id"
        render={(id) => (
          <Space size="middle">
            <ClassModalAddStudent class_id={id}/>
            <ClassModalRemoveStudent class_id={id}/>
          </Space>
        )}
      />
    </Table>
  </>

  );
}

export default Classes;

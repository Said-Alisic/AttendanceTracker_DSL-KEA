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

  
}

export default Attendances;

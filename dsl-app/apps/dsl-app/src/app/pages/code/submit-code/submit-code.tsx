import { Input, message } from 'antd';

import './submit-code.module.css';
import { getCodeByString } from '../code.service';
import { updateAttendance } from '../../attendance/attendance.service';
import { Attendance, Code } from '@dsl-app/api-interfaces';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface SubmitCodeProps {}

function SubmitCode(props: SubmitCodeProps) {
  const { Search } = Input;
  const [userLat, setUserLat] = useState(0.0)
  const [userLon, setUserLon]= useState(0.0)

  const successMsg = (msg) => {
    message.success(msg);
  };
  
  const warningMsg = (msg) => {
    message.warning(msg);
  };

  const errorMsg = (msg) => {
    message.error(msg);
  };

  const getUserCoords = (coords) => {
    setUserLat(coords.coords.latitude)
    setUserLon(coords.coords.longitude)
  }

  const validateUserCoords = (code: Code) => {
    if (((parseFloat(code.coord_lat) + 1) > userLat && (parseFloat(code.coord_lat) - 1) < userLat) && 
        ((parseFloat(code.coord_lon) + 1) > userLon && (parseFloat(code.coord_lon) - 1) < userLon)) {
      return true
    } else {
      warningMsg('According to your current device coordinates, you are not physically present in the class and cannot submit the code.')
      return false
    }  
  }

  const validateCode = (values) => {
    getCodeByString(values)
      .then(res => {
        if(validateUserCoords(res.data)) {
          if(values === res.data.code_string) {
            const attendance: Attendance = {
              code_id: res.data.id,
              student_id: JSON.parse(localStorage.getItem('user')).id,
              present: true,
              description: 'Student submitted attendance through code.'
            }
            updateAttendance(attendance)
              .then(() => {
                successMsg('Attendance has been successfully recorded!')
              })
              .catch(() => {
                warningMsg('The code you have provided has expired.')
              }) 
          } else {
            warningMsg('The code you have provided does not exist.')
          }
        }
      })
      .catch(err => {
        console.log(err);
        errorMsg('An unexpected error occurred, please try again.')
      })
  }
  
  const handleSubmit = (values) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getUserCoords);
      validateCode(values)
    } else { 
      errorMsg('Location tracking must be enabled in order to validate a code!')
    }

    
  };

  return (
      <Search
      placeholder="Input code string in correct format"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={handleSubmit}
    />
  );
}

export default SubmitCode;

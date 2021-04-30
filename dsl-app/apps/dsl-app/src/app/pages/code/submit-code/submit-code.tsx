import { Input, message } from 'antd';

import './submit-code.module.css';
import { getCodeByString } from '../code.service';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface SubmitCodeProps {}

function SubmitCode(props: SubmitCodeProps) {
  const { Search } = Input;

  const successMsg = () => {
    message.success('Attendance has been successfully recorded!');
  };
  
  const warningMsg = () => {
    message.warning('The code you have provided has either expired or does not exist');
  };

  const errorMsg = () => {
    message.error('An unexpected error occurred, please try again.');
  };
  
  const handleSubmit = (value) => {
    getCodeByString(value)
      .then(res => {
        if(value === res.data.code_string) {
          successMsg()
        } else {
          warningMsg()
        }
      })
      .catch(err => {
        console.log(err);
        errorMsg()
      })
  };

  return (
      <Search
      placeholder="Input code screen in correct format"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={handleSubmit}
    />
  );
}

export default SubmitCode;

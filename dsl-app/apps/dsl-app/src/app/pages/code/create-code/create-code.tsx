import React from 'react';
import CodeModal from '../code-modal/code-modal'

import './create-code.module.css';

/* eslint-disable-next-line */
export interface CreateCodeProps {}

function CreateCode(props: CreateCodeProps) {
  return (
    <>
      <h1>Welcome to lesson attendance code creator</h1>
      <CodeModal/>
    </>
  );
}

export default CreateCode;

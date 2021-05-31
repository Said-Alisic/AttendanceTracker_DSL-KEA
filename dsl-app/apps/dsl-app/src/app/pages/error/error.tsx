import React from 'react';

import './error.module.css';

/* eslint-disable-next-line */
export interface ErrorProps {}

function Error(props: ErrorProps) {
  return (
    <div>
      <h1>Page doesn't exist! Seems like you took a wrong turn...!</h1>
    </div>
  );
}

export default Error;

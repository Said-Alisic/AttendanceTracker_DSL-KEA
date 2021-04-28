import React from 'react';
import { } from '@dsl-app/api-interfaces';
import Layout from './components/layout/layout'
import Router from './router/router';

export const App = () => {

  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <Router/>
      </div>
    </Layout>
    
  );
};

export default App;

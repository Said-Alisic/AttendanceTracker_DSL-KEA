import * as express from 'express';
import { } from '@dsl-app/api-interfaces';

const app = express();

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);

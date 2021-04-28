import * as express from 'express';
import router from './app/routes/router'
import * as cors from 'cors';

const app = express();

const PORT = process.env.port || 3333;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router)

const server = app.listen(PORT, () => {
  console.log('Listening at http://localhost:' + PORT + '/api');
});

app.get('/api', (req, res) => {
  res.send('http://localhost::' + PORT + ' API is running...');
});

server.on('error', console.error);

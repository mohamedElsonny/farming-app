import express from 'express';
import processRouter from './routes/process.routes';
import 'dotenv/config';
import { connectRabbitMQ } from './queues';
import cookieParser from 'cookie-parser';
import { ENV } from './config';
import './custom-request';

const app = express();
const port = ENV.PORT || 4002;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', processRouter);

app.listen(port, async () => {
  await connectRabbitMQ();
  console.log(`Server running at http://localhost:${port}`);
});

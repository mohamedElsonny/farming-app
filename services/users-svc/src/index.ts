import express from 'express';
import authRouter from './routes/auth';
import 'dotenv/config';
import { connectRabbitMQ } from './queues';
import { ENV } from './config';
import './custom-request';
import cookieParser from 'cookie-parser';

const app = express();
const port = ENV.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.listen(port, async () => {
  await connectRabbitMQ();
  console.log(`Server running at http://localhost:${port}`);
});

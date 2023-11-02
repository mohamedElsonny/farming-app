import express from 'express';
import 'dotenv/config';
import { connectRabbitMQ } from './queues/rabbitmq';
import { ENV } from './config';
import cookieParser from 'cookie-parser';

const app = express();
const port = ENV.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, async () => {
  await connectRabbitMQ();
  console.log(`Server running at http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import proxy from 'express-http-proxy';
import path from 'path';

const app = express();
const port = process.env.PORT || 4000;
const userSvc = proxy('http://localhost:4001');
const processSvc = proxy('http://localhost:4002');
const offerSvc = proxy('http://localhost:4003');

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api/user', userSvc);
app.use('/api/process', processSvc);
app.use('/api/offer', offerSvc);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import cors from 'cors';
import authRouter from './routes/auth';
import contactsRouter from './routes/contacts';
import todoRouter from './routes/todo';
import { handleError } from './middlewares';

const app = express();

// app.get('/', (req, res) => {
//   const { name } = req.query;
//   res.send({ success: true, message: `Hello ${name ?? 'Anonymous user'}` });
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(multer().none());

app.use(morgan('tiny'));

app.use('/auth', authRouter);

app.use('/contacts', contactsRouter);

app.use('/todo', todoRouter);

// app.use((req, res, next) => {
//   // check something
//   const { name } = req.query;
//   if (name?.toLowerCase() === 'ivan') {
//     res.status(403).json('Forbidden for Ivans');
//     return;
//   }
//   next();
// });
// app.get('/req2', (req, res) => {
//   res.json('This is req2');
// });

app.use(handleError);

export default app;

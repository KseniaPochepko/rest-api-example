import { Router } from 'express';
import wrap from 'express-async-wrap';
import { login, register } from '@core/controllers/auth';
import { LoginBody, RegisterBody } from '@core/validation/auth';
import { getUser } from '@core/controllers/user';
import { authenticate, validate } from '../middlewares';

const authRouter = new Router();

authRouter.post(
  '/login',
  validate(LoginBody),
  wrap(async (req, res) => {
    const response = await login(req.body);
    res.json(response);
  })
);

/**
const users = [
  {
    id: 19,
    email: 'ksenia.po@gmail.com',
    firstName: 'Ksenia',
    lastName: 'P',
    password: 'test123',
    messages: [{ from: 18, text: 'Hi, send me $100' }],
  },
];

// authRouter.get('/login', (req, res) => {
//   res.json({ message: 'This is login function' });
// });

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    res.status(401).json({ code: 'auth.invalid.credentials', message: 'Invalid email/password' });
    return;
  }

  const accessToken = jwt.sign({ userId: user.id }, config.auth.secret);
  res.json({ accessToken });
}); */

authRouter.post(
  '/register',
  validate(RegisterBody),
  wrap(async (req, res) => {
    const response = await register(req.body);
    res.json(response);
  })
);

authRouter.post('/password', (req, res) => {
  res.json({ message: 'This is a password function' });
});

authRouter.patch('/password', (req, res) => {
  res.json({ message: 'This is a real password change function' });
});

authRouter.get(
  '/me',
  authenticate,
  wrap(async (req, res) => {
    const { userId } = req.user;
    const user = await getUser(userId);
    res.json({ user });
  })
);

export default authRouter;

// add to Postman what needed

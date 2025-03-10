import { object, string } from 'yup';

export const LoginBody = object().shape({
  email: string().email().required(),
  password: string().required(),
});

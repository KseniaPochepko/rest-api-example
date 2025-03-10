import { object, string } from 'yup';

export const RegisterBody = object().shape({
  email: string().email().required(),
  password: string()
    .min(8)
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[+\-_?!@#$%^&*]/, 'Password must contain at least one special symbol')
    .required(),
  firstName: string().required(),
  lastName: string(),
});

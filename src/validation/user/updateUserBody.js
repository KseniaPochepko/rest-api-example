import { object, string } from 'yup';

export const UpdateUserBody = object().shape({
  firstName: string(),
  lastName: string(),
});

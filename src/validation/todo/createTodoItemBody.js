import { object, string } from 'yup';

export const CreateTodoItemBody = object().shape({
  text: string().max(200).required(),
});

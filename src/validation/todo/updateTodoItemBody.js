import { boolean, object, string } from 'yup';

export const UpdateTodoItemBody = object().shape({
  text: string().max(200),
  isDone: boolean(),
});

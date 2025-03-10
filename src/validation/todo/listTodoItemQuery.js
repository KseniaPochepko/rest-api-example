import { boolean, object } from 'yup';
import { PaginationSchema } from '@core/validation/common';

export const ListTodoItemQuery = object().concat(PaginationSchema).shape({
  isDone: boolean(),
});

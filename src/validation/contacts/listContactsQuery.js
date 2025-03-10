import { object, string } from 'yup';
import { PaginationSchema } from '@core/validation/common';

export const ListContactsQuery = object().concat(PaginationSchema).shape({
  search: string(), // для частичного поиска по списку контактов
  // может быть, а может и не быть
});

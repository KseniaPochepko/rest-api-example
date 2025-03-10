import { number, object } from 'yup';

export const PaginationSchema = object()
  .shape({
    page: number().integer().positive().default(1),
    perPage: number().integer().positive().default(20),
  })
  .camelCase();

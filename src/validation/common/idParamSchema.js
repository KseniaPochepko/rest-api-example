import { number, object } from 'yup';

export const IdParam = object().shape({ id: number().integer().positive() });

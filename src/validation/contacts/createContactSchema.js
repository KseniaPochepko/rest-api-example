import { date, object, string } from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const CreateContactSchema = object().shape({
  firstName: string().max(30).required(),
  lastName: string().max(30),
  phoneNumber: string()
    .required()
    .test({
      name: 'isPhoneNumber',
      message: 'Not a valid phone number',
      test: (value) => isValidPhoneNumber(value),
    }),
  email: string().email(),
  dateOfBirth: date().typeError('Please enter a valid date').min('1930-12-31', 'Date is too early'),
});

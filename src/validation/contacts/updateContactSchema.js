import { date, object, string } from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const UpdateContactSchema = object().shape({
  firstName: string().max(30),
  lastName: string().max(30),
  phoneNumber: string().test({
    name: 'isPhoneNumber',
    message: 'Not a valid phone number',
    test: (value) => isValidPhoneNumber(value),
  }),
  email: string().email(),
  dateOfBirth: date().typeError('Please enter a valid date').min('1930-12-31', 'Date is too early'),
});

import { Router } from 'express';
import { authenticate, validate } from '@core/middlewares';
import { CreateContactSchema, ListContactsQuery, UpdateContactSchema } from '@core/validation/contacts';
import { createContact, deleteContact, getContact, listContacts, updateContact } from '@core/controllers/contacts';
import wrap from 'express-async-wrap';
import { IdParam } from '@core/validation/common';

const contactsRouter = new Router();

contactsRouter.get(
  '/',
  authenticate,
  validate(null, { query: ListContactsQuery }),
  wrap(async (req, res) => {
    const response = await listContacts(req.user.userId, req.query);
    res.send(response);
  })
);

contactsRouter.get(
  '/:id',
  authenticate,
  validate(null, { params: IdParam }),
  wrap(async (req, res) => {
    const response = await getContact(req.user.userId, req.params.id);
    res.send(response);
  })
);

contactsRouter.post(
  '/',
  authenticate,
  validate(CreateContactSchema),
  wrap(async (req, res) => {
    const response = await createContact(req.body);
    res.send(response);
  })
);

contactsRouter.patch(
  '/:id',
  authenticate,
  validate(UpdateContactSchema, { params: IdParam }),
  wrap(async (req, res) => {
    const response = await updateContact(req.user.userId, req.params.id, req.body);
    res.send(response);
  })
);

contactsRouter.delete(
  '/:id',
  authenticate,
  validate(null, { params: IdParam }),
  wrap(async (req, res) => {
    const response = await deleteContact(req.params.id);
    res.send(response);
  })
);

export default contactsRouter;

/** Предыдущий вариант кода без контролера */

// What is the difference between res send and res JSON?
// res.send(): Sends data and end the request.
// res.json(): Sends data in JSON format and ends the request

/** contactsRouter.get('/', authenticate, (req, res) => {
  res.json({ message: 'These are contacts' });
});

 contactsRouter.get('/:id', authenticate, (req, res) => {
  console.log(`get contact ${req.params.id}`);
  res.json({ message: 'This is a particular contact function' });
});

 contactsRouter.post(
 '/',
 authenticate,
 wrap(async (req, res) => {
    const contact = await createContact(req.body);
    res.send(contact);
  })
 );

 contactsRouter.patch('/:id', authenticate, (req, res) => {
  res.json({ message: 'Particular contact is updated' });
});

 contactsRouter.delete('/:id', authenticate, (req, res) => {
  res.json({ message: 'The contact was deleted' });
}); */

// Если у нас get-запрос на вывод данных таблицы через, то будет req.query
// тогда в адресной строке после домена будет знак ? и дальше данные запроса

// Если у нас get-запрос на вывод конкретного поля из данных таблицы через id,
// то будет req.params.id
// в адресной строке обычно '.../:id'

// Если у нас post-запрос на запись новых данных в таблицу, то будет req.body
// эти данные не будут видны в адресной строке

// Если у нас patch-запрос на изменение данных таблицы по id, то будет req.params.id и req.body

// Если у нас delete-запрос на удаление данных таблицы по id, то будет req.params.id

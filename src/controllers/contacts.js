import { Contact } from '@core/db/models';
import { NotFound } from 'http-errors';

export async function listContacts(options) {
  const { page = 1, order: orderString = '+firstName' } = options;

  // orderStr = '+firstName,-lastName'
  // orderStr.split = ['+firstName', '-lastName']
  // '+firstName' -> ['firstName', 'asc']

  const order = orderString.split(',').map((field) => {
    const [, prefix = '+', fieldName] = field.match(/^([+-])?(\w+)/) ?? [null, '+', field];
    return [fieldName, prefix === '+' ? 'asc' : 'desc'];

    // let ascIfPlusOrNothing = 'asc';
    // if (['+', '-'].includes(field[0])) {
    //   ascIfPlusOrNothing = field[0] === '+' ? 'asc' : 'desc';
    //   field = field.slice(1);
    // }
    // return [field, ascIfPlusOrNothing];
  });
  // [['firstName', 'asc'], ['lastName', 'desc']]

  const items = await Contact.findAll({
    page,
    order,
  });
  return { items: items.map((item) => item.get()) };
}

export async function getContact(id) {
  const item = await Contact.findByPk(id);
  if (!item) {
    throw new NotFound('Contact not found');
  }
  return item.get(); // возвращает чуть меньше данных, чем просто item
  // но и их больше, чем достаточно в этом случае
}

export async function createContact(data) {
  const item = await Contact.create(data);
  return item.get();
}

export async function updateContact(id, changes) {
  const item = await Contact.findByPk(id);
  if (!item) {
    throw new NotFound('Contact not found');
  }
  Object.keys(changes).forEach((key) => {
    item[key] = changes[key];
  });
  await item.save();
  return item.get();
}

export async function deleteContact(id) {
  const item = await Contact.findByPk(id);
  if (!item) {
    throw new NotFound('Contact not found');
  }
  await item.destroy();
  return true;
}

import { Todo } from '@core/db/models';
import { BadRequest, NotFound } from 'http-errors';
import { isNil, omitBy } from 'lodash';

export async function listTodoItems(userId, options) {
  const { page = 1, perPage: limit = 20 } = options;
  const offset = limit * (page - 1);
  const items = await Todo.findAll({
    where: { userId },
    limit,
    offset,
    order: [['id', 'asc']],
  });
  return { items };
}
export async function createTodoItem(userId, data) {
  const item = await Todo.create({ ...data, userId });
  return item.get();
}
export async function updateTodoItem(identity, changes) {
  const { id, userId } = identity;
  if (!id) throw new Error('Id must be in identity argument');
  // const item = await Todo.findOne({ where: { id } });
  const item = await Todo.findOne({ where: omitBy({ id, userId }, isNil) });
  if (!item) throw new NotFound('Todo item not found');
  Object.keys(changes).forEach((key) => {
    item[key] = changes[key];
  });
  await item.save();
  return item.get();
}
export async function deleteTodoItem(identity) {
  const { id, userId } = identity;
  if (!id) throw new BadRequest('Id must be in identity argument');
  const item = await Todo.findOne({ where: omitBy({ id, userId }, isNil) });
  if (!item) throw new NotFound('Todo item not found');
  await item.destroy();
  return true;
}

export async function deleteAllTodo(userId) {
  await Todo.destroy({ where: { userId } });
  return true;
}

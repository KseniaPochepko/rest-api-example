import { Router } from 'express';
import wrap from 'express-async-wrap';
import { createTodoItem, deleteAllTodo, deleteTodoItem, listTodoItems, updateTodoItem } from '@core/controllers/todo';
import { authenticate, validate } from '@core/middlewares';
import { CreateTodoItemBody, ListTodoItemQuery, UpdateTodoItemBody } from '@core/validation/todo';
import { IdParam } from '@core/validation/common';

const todoRouter = new Router();

todoRouter.get(
  '/',
  authenticate,
  validate(null, { query: ListTodoItemQuery }),
  wrap(async (req, res) => {
    const response = await listTodoItems(req.user.userId, req.query);
    res.send(response);
  })
);

todoRouter.post(
  '/',
  authenticate,
  validate(CreateTodoItemBody),
  wrap(async (req, res) => {
    const response = await createTodoItem(req.user.userId, req.body);
    res.send(response);
  })
);

todoRouter.patch(
  '/:id',
  authenticate,
  validate(UpdateTodoItemBody, { params: IdParam }),
  wrap(async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const response = await updateTodoItem({ id, userId }, req.body);
    res.send(response);
  })
);

todoRouter.delete(
  '/:id',
  authenticate,
  validate(null, { params: IdParam }),
  wrap(async (req, res) => {
    const response = await deleteTodoItem({ userId: req.user.userId, id: req.params.id });
    res.send(response);
  })
);

todoRouter.delete(
  '/',
  authenticate,
  wrap(async (req, res) => {
    const response = await deleteAllTodo(req.user.userId);
    res.send(response);
  })
);
export default todoRouter;

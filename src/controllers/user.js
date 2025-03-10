import { User } from '@core/db/models';
import { NotFound } from 'http-errors';

export async function getUser(id) {
  const user = await User.findByPk(id);
  if (!user) throw new NotFound('User not found');
  return user.get();
}

export async function updateUser(id, changes) {
  // 1. Load user
  // 1.a If user not found
  // 2. update all fields from changes
  // 3. return updated user
}

export async function updateUserPassword(id, { oldPassword, password }) {
  // TODO
  // 1. Load user by id
  // 1.a If user not found
  // 1.b verify old password is correct
  // 2. hash password
  // 3. change password hash to new value
}

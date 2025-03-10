import argon2 from 'argon2';
import { BadRequest } from 'http-errors';
import { User } from '@core/db/models';
import jwt from 'jsonwebtoken';
import config from '@core/config';

export async function register(input) {
  const { password, ...data } = input;
  const { email } = data;

  const exists = await User.findOne({
    where: { email },
    attributes: ['id'],
  });

  if (exists) {
    throw new BadRequest('User with this email is already registered');
  }

  const passwordHash = await argon2.hash(password);

  const user = await User.create({
    ...data,
    passwordHash,
  });

  return user.get();
}

export async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new BadRequest('Email or password is invalid');
  }
  const isCorrectPassword = await argon2.verify(user.passwordHash, password);
  if (!isCorrectPassword) {
    throw new BadRequest('Email or password is invalid');
  }

  const accessToken = jwt.sign({ userId: user.id }, config.auth.secret);

  return { accessToken };
}

export function initRestorePassword(email) {
  // TODO Send email with jwt token / another token
  console.log(`restore password for email: ${email}`);
}
export function restorePassword({ restoreToken, password }) {
  console.log(`Restore password for user ID: ${password}`);
  // TODO
  // verify token (expired, invalid)
  // retrieve userId (or email) from token
  // retrieve user from database
  // change user password to new passwordHash
  return { success: true };
}

// export function logout(id) {}

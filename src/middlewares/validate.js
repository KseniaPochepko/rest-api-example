import { isNil, map, omitBy } from 'lodash';
import { BadRequest } from 'http-errors';

export function validate(bodySchema, additionalSchemas = {}) {
  return async (req, res, next) => {
    const validationSchemas = omitBy(
      {
        ...additionalSchemas,
        body: bodySchema,
      },
      isNil
    );

    const validationErrors = [];

    const promises = map(validationSchemas, async (schema, path) => {
      req[path] = await schema.validate(req[path], { stripUnknown: true }).catch((err) => {
        validationErrors.push(err);
        return req[path];
      });
    });
    await Promise.all(promises);

    if (!validationErrors.length) {
      return next();
    }

    const { message, path } = validationErrors[0];
    const error = new BadRequest(message);
    error.path = path;
    return next(error);
  };
}

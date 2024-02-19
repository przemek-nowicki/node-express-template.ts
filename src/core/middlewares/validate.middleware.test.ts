import httpMocks from 'node-mocks-http';
import httpStatus from 'http-status';
import { Response, Request } from 'express';

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';
import AppError from '@core/utils/appError';
import validate from './validate.middleware';

// example validation schema for node request with provided all three options to valid
const validationSchemaWithAllOptions: ValidationSchema = {
  body: Joi.object().keys({
    input: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  params: Joi.object().keys({
    action: Joi.string().valid('update', 'add'),
  }),
  query: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};
const validationSchemaPropertyPollution: ValidationSchema = {
  body: Joi.object().keys({
    input: Joi.object()
      .keys({
        required_field: Joi.string().required(),
        ok_to_be_empty_field: Joi.string().allow(''),
      })
      .unknown(true),
  }),
};

const skip = null;

describe('Validate middleware', () => {
  test('should call next middleware in the stack with no errors if validation passes', () => {
    const next = jest.fn();
    const res: Response = httpMocks.createResponse();
    const req: Request = httpMocks.createRequest({
      method: 'POST',
      url: '/api/user/:action/?id=999',
      body: {
        input: {
          name: 'John Doe',
        },
      },
      params: {
        action: 'update',
      },
    });

    validate(validationSchemaWithAllOptions)(req, res, next);

    // next function is called with zero arguments if request object is valid
    expect(next.mock.calls[0][0]).toBe(undefined);
    expect(next).toHaveBeenCalled();
  });

  test.each`
    body                        | params                     | query                  | validationErr
    ${{ input: {} }}            | ${skip}                    | ${skip}                | ${'"name" is required'}
    ${{ input: { name: 123 } }} | ${skip}                    | ${skip}                | ${'"name" must be a string'}
    ${skip}                     | ${{ action: 'incorrect' }} | ${skip}                | ${'"action" must be one of [update, add]'}
    ${skip}                     | ${skip}                    | ${{ id: 'string-id' }} | ${'"id" must be a number'}
  `(
    'should throw an app error with error message=$validationErr when request body= $body params=$params and query=$query',
    ({ body, params, query, validationErr }) => {
      const next = jest.fn();
      const res: Response = httpMocks.createResponse();
      const req: Request = httpMocks.createRequest({
        method: 'POST',
        url: '/api/user/:action/?id=999',
        body,
        params,
        query,
      });

      validate(validationSchemaWithAllOptions)(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new AppError(httpStatus.BAD_REQUEST, validationErr),
      );
    },
  );

  test('should block prototype pollution attempt', () => {
    const next = jest.fn();
    const res: Response = httpMocks.createResponse();
    const req: Request = httpMocks.createRequest({
      method: 'POST',
      url: '/pollution',
      body: {
        input: {
          required_field: 'The required value',
          __proto__: { ok_to_be_empty_field: 'hacked' },
        },
      },
    });

    validate(validationSchemaPropertyPollution)(req, res, next);

    // check if prototype pollution was successful
    expect(({} as any).ok_to_be_empty_field).toBeUndefined();

    // ensure the next middleware is called without any errors
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.any(AppError));

    // ensure "ok_to_be_empty_field" has not been polluted
    expect(req.body.input.ok_to_be_empty_field).toBeUndefined();
  });
});

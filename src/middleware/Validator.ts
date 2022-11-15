import {Request, Response, NextFunction} from 'express'
import {SchemaOf, ValidationError} from 'yup'
import {ErrorException} from './Error'
import {ApiError} from './Error'
import HttpStatus from '../constant/HttpStatus'

export function Validator(schema: SchemaOf<any>) {
  if (!schema) {
    throw new Error(`Schema is not passed in validator argument`)
  }

  return async function(req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validate(req.body, {abortEarly: false})
      next()
    } catch (err: any) {
      if (err instanceof ValidationError) {
        const errorMessages = err.errors.map((e) => e)

        const error = new ApiError({
          message: errorMessages,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
        })

        return ErrorException(error, req, res)
      }

      return ErrorException(err, req, res)
    }
  }
}

import HttpStatus from '../constant/HttpStatus'
import Message from '../constant/Message'

export class ApiError extends Error {
  private status: any
  constructor({message, status = HttpStatus.INTERNAL_SERVER_ERROR}: any) {
    super(message)
    this.message = message
    this.status = status
  }
}

export const ErrorException = (err: any, req: any, res: any) => {
  const isInternalError = err.status === undefined

  const response = {
    code: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
    message: isInternalError ? Message.INTERNAL_SERVER_ERROR : err.message,
    stack: undefined,
  }

  if (process.env.MODE === 'development') {
    response.stack = err.stack
  }

  res.status(response.code).json(response)
  res.end()
}

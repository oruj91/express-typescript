import express from 'express'
import HttpStatus from '../../constant/HttpStatus'
import Message from '../../constant/Message'
import {ApiError, ErrorException} from '../../middleware/Error'

const router = express.Router()

function NotFound(req: any, res: any) {
  const err = new ApiError({
    status: HttpStatus.NOT_FOUND,
    message: Message.NOT_FOUND
  })

  return ErrorException(err, req, res)
}

router.use(NotFound)

export default router

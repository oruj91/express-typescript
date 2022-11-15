import express from 'express'
import * as controller from '../controller/news'
import {postSchema, putSchema} from '../validation/user'
import {Validator} from '../../middleware/Validator'

const router = express.Router()

router.route('/')
  .get(controller.getList)
  .post(Validator(postSchema), controller.create)

router.route('/:id')
  .get(controller.getOne)
  .put(Validator(putSchema), controller.update)

export default router

import {Request, Response} from 'express'
import News from '../model/news'
import HttpStatus from '../../constant/HttpStatus'
import Message from '../../constant/Message'
import {ErrorException} from '../../middleware/Error'

export const getList = async (req: Request, res: Response) => {
  const data = await News.findList()
  return res.json({data})
}

export const getOne = async (req: Request, res: Response) => {
  const {id} = req.params
  const data = await News.findOne(id)
  return res.json({data})
}

export const create = async (req: Request, res: Response) => {
  try {
    const response = await News.create(req.body)
    return res.status(HttpStatus.CREATED).json({data: response, message: Message.CREATED})
  } catch (e) {
    return ErrorException(e, req, res)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const response = await News.update(req.params.id, req.body)
    return res.status(HttpStatus.OK).json({data: response, message: Message.CREATED})
  } catch (e) {
    return ErrorException(e, req, res)
  }
}

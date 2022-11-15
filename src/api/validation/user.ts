import {object, string, InferType} from 'yup'

export const postSchema = object({
  title: string().required(),
  content: string().required(),
})
export const putSchema = postSchema

export type PostDto = InferType<typeof postSchema>
export type PutDto = InferType<typeof putSchema>

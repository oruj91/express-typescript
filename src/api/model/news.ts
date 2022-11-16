import newsJson from '../../mock/news.json'
import {getNewId, mustBeInArray, newDate, writeJSONFile} from '../../helper/common'
import {PostDto, PutDto} from '../validation/user'

interface News {
  id: number
  title: string
  content: string
  createdAt: string
}

function findList() {
  return new Promise((resolve) => {
    resolve(newsJson)
  })
}

function findOne(id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await mustBeInArray(newsJson, id)
      resolve(news)
    } catch (e) {
      reject(e)
    }
  })
}

function create(data: PostDto) {
  return new Promise((resolve) => {
    const newRow: News = {
      ...data,
      id: getNewId(newsJson),
      createdAt: newDate(),
    }

    const newsArr: News[] = newsJson

    newsArr.push(newRow)
    writeJSONFile('news.json', newsArr)

    resolve(newRow)
  })
}

function update(id: string, data: PutDto) {
  const news: News[] = newsJson

  return new Promise(async (resolve, reject) => {
    try {
      const updatingNews = await mustBeInArray(news, id)

      if (updatingNews) {
        const index = news.findIndex(p => p.id == updatingNews.id)

        const newNews = {
          ...updatingNews,
          ...data,
          updatedAt: newDate(),
        }

        news[index] = newNews
        writeJSONFile('news.json', news)
        resolve(newNews)
      }
    } catch (e) {
      reject(e)
    }
  })
}

function remove(id: number) {}

export default {
  findList,
  findOne,
  create,
  update,
  remove,
}

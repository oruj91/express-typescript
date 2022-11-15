import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import indexRouter from '../api/router/index'
import newsRouter from '../api/router/news'
import {ErrorException} from '../middleware/Error'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use('/news', newsRouter)
app.use('/', indexRouter)

app.use(ErrorException)

export default app

import dotenv from 'dotenv'
import http from 'http'
import app from './config/express'

dotenv.config()

const server = http.createServer(app)

server.listen(process.env.PORT)

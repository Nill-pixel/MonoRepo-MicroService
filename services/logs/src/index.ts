import express from 'express'
import { LogRoutes } from './Routes/log.route'

const app = express()
const route = new LogRoutes()

app.use(express.json())

app.use('/log', route.route)

app.listen(3003, () => {
  console.log('Listening on port 3001')
})
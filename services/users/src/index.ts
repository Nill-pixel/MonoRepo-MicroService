import express from 'express'
import { UserRoutes } from './Routes/users.router'

const app = express()
const routes = new UserRoutes()
app.use(express.json())

app.use('/user', routes.router)

app.listen(3001, () => {
  console.log('Listening on port 3001')
})
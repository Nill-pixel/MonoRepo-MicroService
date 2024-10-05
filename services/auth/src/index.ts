import express from 'express'
import { AuthRoutes } from './Routes/auth.router'

const app = express()
const routes = new AuthRoutes()

app.use(express.json())
app.use('/auth', routes.router)

app.listen(3002, () => {
  console.log('Listening on port 3002')
})
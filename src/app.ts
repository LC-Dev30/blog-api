import express from 'express'
import {routesArticles} from './routes/articles.routes'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors({
    origin:'http://localhost:3001'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routesArticles)

const port = process.env.PORT

app.listen(port,() => {
    console.log('server running on port 3000');
})
import express from 'express'
import { routesArticles } from './routes/articles.routes'
import adminRouter from './routes/admin.routes'
import cors from 'cors'
import dotenv from 'dotenv'
import { db } from './database/db'
import cookieParser from 'cookie-parser'
import swaggerConfig from './util/configSwagger'

async function runApp() {
  try {
    await db.authenticate()
    console.log('conexion exitosa ala base de datos');
    dotenv.config()
    const app = express()

    app.use(cookieParser())

    // Configuración CORS 
    app.use(cors({
      origin: 'http://localhost:3001',
      credentials: true 
    }));

    app.use(swaggerConfig)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/',routesArticles)
    app.use(adminRouter)

    const port = process.env.PORT
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    })
  }
  catch (err) {
    console.log(err)
  }
}

runApp()

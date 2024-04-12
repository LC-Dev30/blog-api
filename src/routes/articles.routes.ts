import {Router} from 'express'
import {articlesAll,postArticle,categoriaArticulos,getArticulosSeach,articlesUnique} from '../controllers/articles.controller.js'
import { validToken } from '../auth/authAdmin.js'
import { articleSchema } from '../validation/validationModels.js'

export const routesArticles = Router()

routesArticles.get('/articles',articlesAll)

routesArticles.get('/article',articlesUnique)

routesArticles.post('/article',articleSchema,validToken,postArticle)

routesArticles.get('/category/:id',categoriaArticulos)

routesArticles.get('/search',getArticulosSeach) 
import {Router} from 'express'
import {articlesAll,postArticle} from '../controllers/articles.controller.js'

export const routesArticles = Router()

routesArticles.get('/articles',articlesAll)

routesArticles.post('/article',postArticle)

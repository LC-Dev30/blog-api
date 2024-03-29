import {Router} from 'express'
import {articlesAll,postArticle,categoriaArticulos,getArticulosSeach} from '../controllers/articles.controller.js'

export const routesArticles = Router()

routesArticles.get('/articles',articlesAll)

routesArticles.post('/article',postArticle)

routesArticles.get('/categorias/:id',categoriaArticulos)

routesArticles.get('/search',getArticulosSeach)
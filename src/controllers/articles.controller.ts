import { Request,Response } from 'express';
import {service_getFirstSectionOfArticle,service_postArticle} from '../services/articlesService.js'
import { article } from '../types/article.js';

export async function articlesAll(req:Request,res:Response){
    const articles = await service_getFirstSectionOfArticle()
    res.json(articles)
}

export async function postArticle(req:Request,res:Response){
  const article:article = req.body
  const resService = await service_postArticle(article)
  res.status(200).send(resService)
}
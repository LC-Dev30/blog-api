import { Request, Response } from 'express';
import { service_getFirstSectionOfArticle, service_postArticle, service_getCategoriaArticulos, service_getArticulosSeach } from '../services/articlesService.js'
import { article } from '../types/article.js';

export async function articlesAll(req: Request, res: Response) {
  const articles = await service_getFirstSectionOfArticle()
  res.json(articles)
}

export async function postArticle(req: Request, res: Response) {
  const article: article = req.body
  const resService = await service_postArticle(article)

  if (!resService)
    return res.status(500).send('ha ocurrido un problema')

  res.status(201).send(resService)
}

export async function categoriaArticulos(req: Request, res: Response) {
  const id = req.params.id

  const service_categorias = await service_getCategoriaArticulos(parseInt(id))

  if (service_categorias == false)
    return res.status(404).send('categoria no encontrada')

  res.json(service_categorias)
}

export async function getArticulosSeach(req: Request, res: Response) {
  const palabraClave = req.query.q?.toString().trim()

  const serviceArtSeach = await service_getArticulosSeach(palabraClave)

  if (serviceArtSeach == false) {
    return res.json({ messaje: `No hay resultados para: ${palabraClave}`, success: false })
  }

  const responseData = {
    result:serviceArtSeach,
    countResult: serviceArtSeach.length
  }

  return res.json(responseData);
}
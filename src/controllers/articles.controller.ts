import { Request, Response } from 'express';
import { service_getFirstSectionOfArticle, service_postArticle, service_getCategoriaArticulos, service_getArticulosSeach, getArticuloUnique } from '../services/articlesService.js'
import { article } from '../types/article.js';
import { IsNumber } from '../validation/validationApp.js';
import { validationResult } from 'express-validator';

export async function articlesAll(req: Request, res: Response) {
  try {
    const articles = await service_getFirstSectionOfArticle()
    res.json(articles)
  } catch {
    res.status(500).send('Ha ocurrido un problema en el servidor')
  }
}

export async function postArticle(req: Request, res: Response) {

  const validSchema = validationResult(req)

  if (!validSchema.isEmpty())
    return res.status(400).json({ errors: validSchema.array() })

  try {
    const article: article = req.body

    const resService = await service_postArticle(article)

    if (!resService.success)
      return res.status(resService.status).send(resService.message)

    res.status(resService.status).send(resService.message)
  } catch {
    res.status(500).send('Ha ocurrido un problema en el servidor')
  }
}

export async function categoriaArticulos(req: Request, res: Response) {
  try {
    const id = req.params.id

    if(id == null)
      return res.status(400).send('paramatro faltante')

    const service_categorias = await service_getCategoriaArticulos(parseInt(id))

    if (!service_categorias.success)
      return res.status(service_categorias.status).send(service_categorias.message)

    res.status(service_categorias.status).json(service_categorias.data)
  } catch {
    res.status(500).send('Ha ocurrido un problema en el servidor')
  }
}

export async function getArticulosSeach(req: Request, res: Response) {
  try {
    if (typeof (req.query.q?.toString()) == 'string' && req.query.q != null) {
      const palabraClave: string = req.query.q?.toString().trim()

      const serviceArtSeach = await service_getArticulosSeach(palabraClave)

      if (!serviceArtSeach.success)
        return res.status(serviceArtSeach.status).json({ messaje: `${serviceArtSeach.message} ${palabraClave}`, success: false })

      return res.json({ result: serviceArtSeach, countResult: serviceArtSeach.data.length });
    }

  } catch (error) {
    res.status(500).send('Ha ocurrido un problema en el servidor')
  }
}

export async function articlesUnique(req: Request, res: Response) {
  try {
    const artId = req.query.art as string

    const validParameter = IsNumber(artId)

    if (!validParameter)
      return res.status(400).send('parametro invalido')

    const artModel = await getArticuloUnique(parseInt(artId));

    if (artModel == false) {
      res.status(404).send('articulo no encontrado')
      return;
    }
    res.json(artModel)
  } catch {
    res.status(500).send('Ha ocurrido un problema en el servidor')
  }
}
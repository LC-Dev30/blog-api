import { articleModel } from "../models/articuloModel.js";
import { categoriaArticulo } from "../models/categoriaArticuloModel.js";
import {article} from '../types/article.js'
import {fechaActual} from '../util/util.js'

export async function service_getFirstSectionOfArticle() {
   const articulos = await articleModel.findAll({
      include: [categoriaArticulo],
      limit: 9,
      order: [['id', 'DESC']] 
   });

   const articulosCentrales = articulos.splice(-2)
   const articulosRecomendados = articulos.splice(-4) 

   return { articulos,articulosCentrales,articulosRecomendados };
}

export async function service_postArticle(article:article){
   article.autor = 'Leo castillo'
   article.fechaCreacion = fechaActual()
   article.likes = 25
   await articleModel.create(article)
   return 'article create!'
}


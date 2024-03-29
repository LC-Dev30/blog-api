import { articleModel } from "../models/articuloModel.js";
import { categoriaArticulo } from "../models/categoriaArticuloModel.js";
import { article } from '../types/article.js'
import { fechaActual } from '../util/util.js'
import { Model, Op } from 'sequelize';

export async function service_getFirstSectionOfArticle() {
   try {
      const articulos = await articleModel.findAll({
         include: [categoriaArticulo],
         limit: 10,
         order: [['id', 'DESC']]
      });

      const articulosCentrales = articulos.splice(-2)
      const articulosRecomendados = articulos.splice(-5)

      return { articulos, articulosCentrales, articulosRecomendados };
   } catch (err) {
      console.log(err);
   }
}


export async function service_postArticle(article: article): Promise<boolean> {
   try {
      article.fechaCreacion = fechaActual();
      const addArticle: Model = await articleModel.create(article);

      if (!(addArticle instanceof articleModel))
         return false;

      return true

   } catch {
      return false;
   }
}

export async function service_getCategoriaArticulos(categoriaId: number) {
   try {
      const categoriasArticulos = await articleModel.findAll({
         include: [categoriaArticulo],
         where: {
            idcategoria: categoriaId
         }
      })

      if (categoriasArticulos.length == 0)
         return false

      return categoriasArticulos;
   } catch {
      return false
   }
}

export async function service_getArticulosSeach(params:any) {
   const listaArticulosCoincidencias = await articleModel.findAll({
      where: {
         titulo: {
            [Op.like]: `%${params}%`
         }
      }
   })

   if (listaArticulosCoincidencias.length == 0)
      return false;

   return listaArticulosCoincidencias
}
import { articleModel } from "../models/articuloModel.js";
import { categoriaArticulo } from "../models/categoriaArticuloModel.js";
import { article } from '../types/article.js'
import { fechaActual, generarObjResponseAPI } from '../util/util.js'
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

      const data = { articulos, articulosCentrales, articulosRecomendados };

      const res = generarObjResponseAPI({ status: 200, data: data })

      return res
   } catch (err: any) {
      return generarObjResponseAPI({ status: 500, message: `ha ocurrido un problema: ${err.message}` })
   }
}


export async function service_postArticle(article: article) {
   try {
      article.fechaCreacion = fechaActual();

      const addArticle: Model = await articleModel.create(article);

      if (!(addArticle instanceof articleModel))
         return generarObjResponseAPI({status:500,message:'no se pudo crear el articulo, vuelva a intertarlo.'});

      return generarObjResponseAPI({status:201,message:'articulo creado'});

   } catch (err: any) {
      return generarObjResponseAPI({ status: 500, message: `ha ocurrido un problema: ${err.message}` })
   }
}

export async function service_getCategoriaArticulos(categoriaId: number) {
   try {
      const categoriasArticulos = await articleModel.findAll({
         include: [categoriaArticulo],
         where: {
            idCategoria: categoriaId
         }
      })

      if (categoriasArticulos.length == 0)
         return generarObjResponseAPI({ status: 404, message: 'Categoria no encontrada', success: false })

      const {categoriaarticulo}:any = categoriasArticulos[0]
      const nameCategory:string = categoriaarticulo.nombreCategoria

      return generarObjResponseAPI({ status:200, data: {nameCategory:nameCategory.toUpperCase(),categoriasArticulos}, success: true });
   } catch (err: any) {
      return generarObjResponseAPI({ status: 500, message: `ha ocurrido un problema: ${err.message}`, success: true })
   }
}

export async function service_getArticulosSeach(params: any) {
   try {
      const listaArticulosCoincidencias = await articleModel.findAll({
         attributes: ['id', 'titulo'],
         where: {
            titulo: {
               [Op.like]: `%${params}%`
            }
         }
      })

      if (listaArticulosCoincidencias.length == 0)
         return generarObjResponseAPI({ status: 404, success: false, message: 'No se encontraron resultados' })

      return generarObjResponseAPI({ status: 200, data: listaArticulosCoincidencias, success: true })
   } catch (err: any) {
      return generarObjResponseAPI({ status: 500, message: `ha ocurrido un problema: ${err.message}`, success: false })
   }
}

export async function getArticuloUnique(id: number) {
   try {
      const artUnique = await articleModel.findByPk(id)

      if (artUnique == null)
         return false;

      return artUnique;
   } catch (err: any) {
      return generarObjResponseAPI({ status: 500, message: `ha ocurrido un problema: ${err.message}` })
   }
}
import { Router } from 'express'
import { articlesAll, postArticle, categoriaArticulos, getArticulosSeach, articlesUnique } from '../controllers/articles.controller.js'
import { validToken } from '../auth/authAdmin.js'
import { articleSchema } from '../validation/validationModels.js'

export const routesArticles = Router()

//config swagger documentacion
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Articulo:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Identificador del artículo.
 *         titulo:
 *           type: string
 *           description: Título del artículo.
 *         contenido:
 *           type: string
 *           description: Contenido del artículo.
 *         fechaCreacion:
 *           type: string
 *           description: Fecha de creación del artículo.
 *         idCategoria:
 *           type: number
 *           description: ID de la categoría del artículo.
 *         urlImagen:
 *           type: string
 *           description: URL de la imagen asociada al artículo.
 *         categoriaarticulo:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID de la categoría del artículo.
 *             nombreCategoria:
 *               type: string
 *               description: Nombre de la categoría del artículo.
 */

/**
 * @swagger
 * tags:
 *   name: Artículos
 *   description: Endpoints relacionados con la gestión de artículos
 */

//routes
/**
 * @swagger
 * /api/articles:
 *   get:
 *     tags:
 *       - Artículos
 *     summary: Obtener todos los artículos
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *         application/json:
 *         schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Articulo'
 */
routesArticles.get('/articles', articlesAll)

/**
 * @swagger
 * /api/article:
 *   get:
 *     tags:
 *       - Artículos
 *     summary: Obtener artículo mediante un ID único.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del artículo.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 */
routesArticles.get('/article', articlesUnique)

/**
 * @swagger
 * /api/article:
 *   post:
 *     tags:
 *       - Artículos
 *     summary: Crear nuevo artículo
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               idCategoria:
 *                 type: number
 *               urlImagen:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Artículo creado exitosamente
 */
routesArticles.post('/article', articleSchema, validToken, postArticle)

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     tags:
 *       - Artículos
 *     summary: Obtener artículos por categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articulos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Articulo'
 */
routesArticles.get('/category/:id', categoriaArticulos)

/**
 * @swagger
 * /api/search:
 *   get:
 *     tags:
 *       - Artículos
 *     summary: Buscar artículos
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultados:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Articulo'
 */
routesArticles.get('/search', getArticulosSeach) 
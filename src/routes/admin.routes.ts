import Express from "express";
import { loginAdmin } from "../controllers/admin.controller";

const adminRouter = Express.Router()

/**
 * @swagger
 * tags:
 *   - name: Autenticación
 *     description: Endpoints relacionados con la autenticación
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión como administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gmail:
 *                 type: string
 *                 description: Nombre de usuario del administrador
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del administrador
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '401':
 *         description: Credenciales inválidas
 */
adminRouter.post('/api/auth/login', loginAdmin)


export default adminRouter
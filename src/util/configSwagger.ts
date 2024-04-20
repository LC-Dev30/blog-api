import { Router } from "express";
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const routerSwagger = Router()

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de la API de Artículos',
            version: '1.0.0',
        },
        servers:[
            {
                url:'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options)

routerSwagger.use('/api/docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))


export default routerSwagger
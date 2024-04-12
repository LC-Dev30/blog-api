import { body } from "express-validator";

export const articleSchema = [
    body('titulo','El titulo es requerido').exists().notEmpty(),
    body('contenido','El contenido es requerido').exists().notEmpty(),
    body('idCategoria','La categoria es requerido').exists().notEmpty().isNumeric({no_symbols:true}),
    body('urlImagen','La url es requerido').exists().notEmpty()
]
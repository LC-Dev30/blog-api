import { categoriaArticulo } from "./categoriaArticuloModel.js";
import { db } from "../database/db.js";
import {DataTypes} from "sequelize"

export const articleModel = db.define('articles',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    titulo:DataTypes.STRING,
    contenido:DataTypes.STRING,
    likes:DataTypes.INTEGER,
    fechaCreacion:DataTypes.DATE,
    autor:DataTypes.STRING,
    idcategoria:DataTypes.INTEGER,
    urlImagen:DataTypes.STRING
})


articleModel.belongsTo(categoriaArticulo,{foreignKey:'idcategoria',targetKey:'id'});
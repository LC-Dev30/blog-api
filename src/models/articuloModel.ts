import { categoriaArticulo } from "./categoriaArticuloModel.js";
import { db } from "../database/db.js";
import {DataTypes} from "sequelize"

export const articleModel = db.define('articles',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    titulo:{
      type:DataTypes.STRING,
      allowNull:false
    },
    contenido:{
      type:DataTypes.STRING,
      allowNull:false
    },
    fechaCreacion:{
      type:DataTypes.DATE,
      allowNull:false
    },
    idCategoria:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    urlImagen:{
      type:DataTypes.STRING,
      allowNull:false
    }
})


articleModel.belongsTo(categoriaArticulo,{foreignKey:'idCategoria',targetKey:'id'});
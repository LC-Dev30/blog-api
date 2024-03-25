import { DataTypes } from "sequelize";
import { db } from "../database/db";

export const categoriaArticulo = db.define('categoriaarticulos',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    nombreCategoria:DataTypes.STRING
})


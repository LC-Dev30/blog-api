import { db } from "../database/db";
import { DataTypes } from "sequelize";

export const adminModel = db.define('userAdmin',{
  gmail:{
    unique:true,
    type:DataTypes.STRING,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  nameAdmin:{
    type:DataTypes.STRING,
    allowNull:false
  },
  rol:{
    type:DataTypes.STRING,
    allowNull:false
  }
})


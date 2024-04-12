import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(
    process.env.NAMEDB as string,
    process.env.USERNAMEDB as string,
    process.env.PASSWORDDB as string,
    {
        host:'localhost',
        dialect: 'postgres',
        define: { 
            timestamps: false,
        }
    }
)

import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(
    process.env.NAMEDB || '',
    process.env.USERNAMEDB || '',
    process.env.PASSWORDDB,
    {
        dialect: 'mysql',
        define: { timestamps: false }
    }
)

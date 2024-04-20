import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()


export function crearTokenAdmin(id: number, rol: string) {
    return new Promise((resolve, reject) => {
        try {
            const secretKey = process.env.SECRETKEY as string
            const token = jwt.sign({ idAdmin: id, rolAdmin: rol }, secretKey, { expiresIn: '1d' })
            resolve(token)
        }
        catch {
            reject({ success: false })
        }
    })
}

// valid token
export function validToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token:string = req.cookies.token || req.headers['authorization']
        
        if (!token) return res.status(403).send('Acceso denegado: Token no proporcionado');

        const decodedToken = jwt.verify(token, process.env.SECRETKEY as string);

        if (typeof decodedToken === 'string') {
            return res.status(403).send('Acceso denegado: El token es inválido');
        }

        if (decodedToken.exp && typeof decodedToken.exp === 'number' && decodedToken.exp < Date.now() / 1000) {
            return res.status(403).send('Acceso denegado: El token ha caducado');
        }

        next();
    } catch(err:any) {
        res.clearCookie('token');
        res.status(403).send(err.message);
    }
}
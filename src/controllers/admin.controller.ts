import { Request, Response } from "express";
import { userAdmin } from "../types/adminTypes";
import { IsAdminValid } from "../validation/validationApp";
import { crearTokenAdmin } from "../auth/authAdmin";

export async function loginAdmin(req: Request, res: Response) {
   try {
      const { gmail, password }: userAdmin = req.body

      const validAdmin = await IsAdminValid(gmail, password)

      if (validAdmin.status != 200 && validAdmin.data == null && !validAdmin.success)
         return res.status(validAdmin.status).json({ message: validAdmin.message })

      const token = await crearTokenAdmin(validAdmin.data.gmail, validAdmin.data.password) as string

      if (token.length === 0) {
         res.status(500).send('Ha ocurrido un error en autenticarse, vuelva a intentarlo')
         return;
      }

      res.cookie('token', token);
      res.status(validAdmin.status).json({ validacion: true, nombreAdmin: validAdmin.data.nameAdmin })
   } catch {
      res.status(500).json('Ha ocurrido un problema en el servidor')
   }
}
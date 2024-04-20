import { adminModel } from "../models/adminModel";
import { generarObjResponseAPI } from "../util/utilFunctions";

export async function existAdmin(gmail: string, pass: string) {
   try {
      const searchAdmin = await adminModel.findOne({
         where: { gmail: gmail, password: pass },
         attributes: ['id', 'rol'],
         raw: true
      })

      if (searchAdmin == null)
         return generarObjResponseAPI({ status: 404, success: false, message: 'Cuenta no encontrada' })

      return generarObjResponseAPI({ status: 200, success: true, data: searchAdmin })
   } catch {
      return generarObjResponseAPI({ status: 500, message: 'Ha Ocurrido un problema', success: false })
   }
}
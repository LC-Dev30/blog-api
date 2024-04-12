import { existAdmin } from "../services/adminServices";
import { responseService } from '../types/dtoResponse'
import { generarObjResponseAPI } from "../util/util";

export function IsNumber(str: string): boolean {
    return !isNaN(parseFloat(str)) && isFinite(parseFloat(str));
}

export async function IsAdminValid(gmail: string, pass: string): Promise<responseService> {

    if (!isValidEmail(gmail, pass))
        return generarObjResponseAPI({ status: 400, success: false, message: 'Los campos no cumplen con los requisitos mínimos.' })

    const isExistAdmin = await existAdmin(gmail, pass)

    if (!isExistAdmin.success)
        return isExistAdmin

    return isExistAdmin
}

function isValidEmail(email: string, pass: string): boolean {
    return email.trim() !== '' && email.length >= 8 && pass.trim() !== '' && pass.length >= 8;
}



import { responseService } from "../types/dtoResponse"

export function fechaActual():string {
    let date = new Date()  
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export function generarObjResponseAPI(dataResponse:responseService){
    return dataResponse;
}
import { NextFunction, Request, Response } from "express";
import { Exceptions, HttpStatus } from "../../../application/ErrosClasses";

export interface MRequest extends Request {
    dto?: any;
};


export const paramsValidateDto = async (req: MRequest, res: Response, next: NextFunction) => {
    try {
        const { currentPage, limit } = req.query;
        if ((!currentPage && !limit) || (currentPage && !limit) || (!currentPage && limit))
            throw new Exceptions(HttpStatus.BAD_REQUEST, 'los parametros: currentPage y limit son requeridos');
        const validate = { currentPage: Number(currentPage), limit: Number(limit) };
        req.dto = validate;
        next();
    } catch (error: Exceptions | any) {
        res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message })
    }
}


export const validateIdDto = async (req: MRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id))
            throw new Exceptions(
                HttpStatus.BAD_REQUEST,
                `El  id: '${id}' no es un id valido.`
            )
        req.dto = { id };
        next();
    } catch (error: Exceptions | any) {
        res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message })
    }
} 
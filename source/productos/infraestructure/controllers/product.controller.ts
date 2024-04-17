import { Request, Response } from "express";
import { Exceptions, HttpStatus } from "../../application/ErrosClasses";
import { MongoRepository } from "../Repositories/MongoRepository";
import { ProductUseCases } from "../../application/productUseCases";
import { ProductServices } from "../service/product.service";
import { Product } from "../../domain/ProductValue";
import { MRequest } from "../middlewares/DTO/products.dto";


function httpErrorHndler(res: Response, error: Exceptions) {
    console.log(`\nERROR STATUS(${error?.code || 500}) -> [ httpErrorHandler ][ ${new Date().toLocaleString('es-ES')} ] -> ${error.stack}\n`);
    res.status(error?.code || 500).json({ status: false, error: error.message });
}


// todoInit: Injeccion de dependencias

const mongoRepository = new MongoRepository();
const productUseCases = new ProductUseCases(mongoRepository);
const productServices = new ProductServices(productUseCases);

// todoEnd



const createNewProduct = async (req: Request, res: Response) => {
    try {
        const { codigo, nombre, descripcion, categoria, precio } = req.body;
        const producto = new Product(codigo, nombre, descripcion, categoria, precio);
        const response = await productServices.createProduct(producto);

        res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Creado correctamente',
            response
        })
    } catch (error: Exceptions | any) {
        httpErrorHndler(res, error)
    }
}





const findAllProducts = async (req: MRequest, res: Response) => {
    try {
        const { currentPage, limit } = req.dto;
        const response = await productServices.findAllProducts(currentPage, limit);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Consultado correctamente',
            paginacion: { currentPage: currentPage, limit: limit },
            response
        })
    } catch (error: Exceptions | any) {
        httpErrorHndler(res, error);
    }
}




const findProductById = async (req: MRequest, res: Response) => {
    try {
        const { id } = req.dto;
        const response = await productServices.findById(id);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Consultado correctamente',
            response
        });
    } catch (error: Exceptions | any) {
        httpErrorHndler(res, error);
    }
}



const findProductByCode = async (req: MRequest, res: Response) => {
    try {

    } catch (error: Exceptions | any) {
        httpErrorHndler(res, error);
    }
}



export default {
    createNewProduct,
    findAllProducts,
    findProductById,
    findProductByCode
}
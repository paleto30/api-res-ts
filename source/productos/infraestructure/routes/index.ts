import { Router } from "express";
import productController from "../controllers/product.controller";
import { paramsValidateDto, validateIdDto } from "../middlewares/DTO/products.dto";




const router = Router();


router.post(
    '/products/',
    productController.createNewProduct
);


router.get(
    '/products/',
    paramsValidateDto,
    productController.findAllProducts
)


router.get(
    '/products/id/:id',
    validateIdDto,
    productController.findProductById
)


router.get(
    '/products/code/:codigo',
    productController.findProductByCode
)


export default router;
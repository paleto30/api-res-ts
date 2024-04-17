import { Exceptions, HttpStatus } from "../../application/ErrosClasses";
import { ProductUseCases } from "../../application/productUseCases";
import { Product } from "../../domain/ProductValue";




export class ProductServices {

    constructor(
        private readonly productUseCases: ProductUseCases
    ) { };


    async createProduct(producto: Product) {
        try {
            const newProduct = await this.productUseCases.crearProducto(producto);
            return newProduct;
        } catch (error: Exceptions | any) {
            throw error;
        }
    }


    async findAllProducts(currentPage: number, limit: number) {
        try {
            const listProducts: Product[] = await this.productUseCases.findAllProducts(currentPage, limit);
            return listProducts;
        } catch (error: Exceptions | any) {
            throw error;
        }
    }


    async findById (id: string) {
        try {
            const producto = await this.productUseCases.findById(id);
            return producto;
        } catch (error: Exceptions | any) {
            throw error;
        }
    }

}
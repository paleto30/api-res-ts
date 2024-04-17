import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/ProductValue";
import { Exceptions, HttpStatus } from "./ErrosClasses";





export class ProductUseCases {


    constructor(
        private readonly respository: ProductRepository
    ) { };



    public async crearProducto(producto: Product): Promise<Product> {
        const existingProduct = await this.respository.findByCode(producto.getCodigo());
        if (existingProduct) {
            throw new Exceptions(
                HttpStatus.CONFLICT,
                `El codigo '${producto.getCodigo()}' ya esta en uso.`
            );
        }
        return await this.respository.create(producto);
    }


    public async findAllProducts(currentPage: number, limit: number): Promise<Product[]> {
        const listProducts = await this.respository.findAll(currentPage, limit);
        return listProducts;
    }


    public async findByCode(codigo: string): Promise<Product> {
        const productFound = await this.respository.findByCode(codigo);
        if (!productFound) {
            throw new Exceptions(
                HttpStatus.NOT_FOUND,
                `El producto con codigo: ${codigo}, no fue encontrado.`);
        }
        return productFound;
    }


    public async findById(id: string): Promise<Product | null> {
        const producto = await this.respository.findById(id);
        if (!producto)
            throw new Exceptions(
                HttpStatus.NOT_FOUND,
                `Producto con id '${id}' no fue encontrado.`
            )
    
        return producto;
    }

}
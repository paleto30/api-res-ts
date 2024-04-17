import { Product } from "./ProductValue";




interface CreateProduct {
    create(producto: Product): Promise<Product>;
}


interface GetProduct {
    findByCode(codigo: string): Promise<Product | null>;
    findAll(currentPage:number, limit:number): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
}



export interface ProductRepository extends CreateProduct, GetProduct {

}
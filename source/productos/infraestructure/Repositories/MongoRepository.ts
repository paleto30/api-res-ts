import { ProductRepository } from "../../domain/ProductRepository";
import { Product } from "../../domain/ProductValue";
import ProductModel from "../models/producto.mogoModel";



export class MongoRepository implements ProductRepository {


    public async create(producto: Product): Promise<Product> {
        const newProducto = new ProductModel({ ...producto });
        await newProducto.save();
        return Product.dbObjectToProduct(newProducto);
    }


    public async findByCode(codigo: string): Promise<Product | null> {
        const productFound = await ProductModel.findOne({ codigo }).lean();
        return productFound ? Product.dbObjectToProduct(productFound) : null;
    }


    public async findAll(currentPage: number, limit: number): Promise<Product[]> {
        const skip = (currentPage - 1) * limit;
        const productList = await ProductModel.find({}, { _id: 0 })
            .sort({ precio: 1 })
            .limit(limit)
            .skip(skip)
            .exec();
        return Product.dbListToProductList(productList);
    }


    public async findById(id: string): Promise<Product | null> {
        const productoMongo = await ProductModel.findOne({ id }, { _id: 0 });
        return productoMongo ? Product.dbObjectToProduct(productoMongo) : null;
    }

}
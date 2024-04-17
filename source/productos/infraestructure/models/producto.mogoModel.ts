import mongoose, { Schema } from 'mongoose';
import { ProductEntity } from '../../domain/ProductEntity';

// Define la interfaz para el esquema de Product
//interface IProduct extends ProductEntity { }

// Define el esquema de Product
const ProductSchema: Schema<ProductEntity> = new Schema<ProductEntity>({
    id: { type: String, required: true, trim: false, unique: true },
    codigo: { type: String, required: true, trim: false, unique: true },
    nombre: { type: String, required: true, trim: false },
    descripcion: { type: String, required: true, trim: false },
    categoria: { type: String, required: true, trim: false },
    precio: { type: Number, required: true, trim: false },
}, { versionKey: false, id: false });

// Crea y exporta el modelo de Product basado en el esquema
const ProductModel = mongoose.model<ProductEntity>('Productos', ProductSchema);


export default ProductModel;
import { v4 as uuidv4 } from "uuid";
import { ProductEntity } from "./ProductEntity";



export class Product {

    private id: string;
    private codigo: string;
    private nombre: string;
    private descripcion: string;
    private categoria: string;
    private precio: number;


    constructor(
        codigo: string, nombre: string, descripcion: string, categoria: string, precio: number
    ) {
        this.id = uuidv4();
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
    }

    public static emptyProduct(): Product {
        return new Product('', '', '', '', 0);
    }

    public static dbObjectToProduct(mongooseObject: any): Product {
        const producto = new Product(
            mongooseObject.codigo,
            mongooseObject.nombre,
            mongooseObject.descripcion,
            mongooseObject.categoria,
            mongooseObject.precio,
        );
        producto.setId(mongooseObject.id);

        return producto;
    }

    public static dbListToProductList(mongooseList: ProductEntity[]): Product[] {
        return mongooseList.map(mongooseObj => Product.dbObjectToProduct(mongooseObj));
    }

    private setId(id: string) {
        this.id = id;
    };

    public getId(): string {
        return this.id
    }

    // codigo
    public getCodigo(): string {
        return this.codigo;
    }

    // nombre
    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    // descripcion
    public getDescriptcion(): string {
        return this.descripcion
    }
    public setDescription(descripcion: string): void {
        this.descripcion = descripcion;
    }

    // categoria
    public getCategoria(): string {
        return this.categoria;
    }
    public setCategoria(categoria: string): void {
        this.categoria = categoria;
    }

    // precio
    public getPrecio(): number {
        return this.precio;
    }
    public setPrecio(precio: number): void {
        this.precio = precio;
    }
}
import { Mongoose, connect } from "mongoose";




export class MongoConexion {

    private static intance: MongoConexion;
    private connection: any;

    constructor() {
        this.connection = null
    }


    public static getIntance(): MongoConexion {
        if (!MongoConexion.intance) {
            MongoConexion.intance = new MongoConexion();
        }
        return MongoConexion.intance;
    }


    public async connect(url: string): Promise<void> {
        try {
            if (!this.connection) {
                this.connection = await connect(url);
                console.log('MongoDB Connected...');
            }
        } catch (error) {
            console.error('Error connecting to MongoDB: ', error);
            process.exit(1)
        }
    }


    public getConnection(): Mongoose | null {
        return this.connection;
    }


    public async disconnect(): Promise<void> {
        try {

            if (this.connection) {
                await this.connection.disconnect();
                this.connection = null;
                console.log('MongoDB disconnected.');
            }

        } catch (error: any) {
            console.error(error.message);
            process.exit(1);
        }
    }

}
import express from "express";
import { Express } from "express";
import cors from 'cors'
import router from "./infraestructure/routes";
import { MongoConexion } from "./infraestructure/DB/MongoConexion";

export class AppProducts {


    private version: string = 'v1';
    private app: Express;
    private mongoUri: string; 

    
    constructor(mongoUri: string) {
        this.mongoUri = mongoUri;
        this.app = express();
        this.middlewares();
        this.synchronizeDatabase();
        this.injectRoutes();
    }



    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }


    private async synchronizeDatabase(): Promise<void>{
        const mongoConexion = MongoConexion.getIntance();
        await mongoConexion.connect(this.mongoUri);
    }


    private injectRoutes(): void {
        this.app.use(`/api/${this.version}`, router);
    }



    public listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`AppProducts running on http://localhost:${port}/api/${this.version}/`);
        })

    }
}



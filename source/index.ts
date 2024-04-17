
import 'dotenv/config';
import { AppProducts } from "./productos/appProuctos"


const { PORT, DB_URI } = process.env;




const main = () => {
    const productsPort = Number(PORT);
    const appProucts = new AppProducts(`${DB_URI}`);
    appProucts.listen(productsPort);
}

main();
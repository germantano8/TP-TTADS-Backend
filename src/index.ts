import { App } from "./app";
import middlewares from "./middlewares/middlewares";
import {router} from "./routes/index";
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 3700;

const app = new App(PORT, middlewares, [router]);


export {app}

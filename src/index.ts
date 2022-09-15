import { App } from "./app";
import middlewares from "./middlewares/middlewares";
import routes = require("./routes/index");

require("dotenv").config();

const PORT = 3700;

const app = new App(PORT, middlewares, [routes]);

app.mongoDB(process.env.CONN_STRING);
app.listen();

import { Response, Request, NextFunction } from "express";
import bodyParser = require("body-parser");
import cors = require("cors");

export default [
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cors({ credentials: true, origin: true }),
  function (_req: Request, res: Response, next: NextFunction) {
    res.set("Cache-Control", "no-store, max-age=0");
    next();
  },
  function (_req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
];

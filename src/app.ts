import { Application } from "express";
import express = require("express");
import mongoose = require("mongoose");
import handleError from "./middlewares/errors.middleware";

export class App {
  public app: Application;

  /**
   * @param port Port Application listens on
   * @param middleware Array of middleware to be applied to app
   * @param routes Array of express.Router objects for application routes
   */
  constructor(
    private port: number,
    middleware: Array<any>,
    routes: Array<express.Router>
  ) {
    this.app = express();
    this.middleware(middleware);
    this.routes(routes);
    this.assets("public");

    //Custom error handler middleware as the last middleware
    this.app.use(handleError);
  }

  /**
   * @param mware Array of middlewares to be loaded into express app
   */
  private middleware(mware: any[]) {
    mware.forEach((m) => {
      this.app.use(m);
    });
  }

  public addMiddleWare(middleWare: any) {
    this.app.use(middleWare);
  }

  /**
   * Attaches route objects to app
   * @param routes Array of router objects to be attached to the app
   */
  private routes(routes: Array<express.Router>) {
    routes.forEach((r) => {
      this.app.use("/api", r);
    });
  }

  /**
   * Enable express to serve up static assets
   */
  private assets(path: string) {
    this.app.use(express.static(path));
  }

  /**
   * Creates a connection to a MongoDB instance using mongoose
   * @param uri MongoDB connection string
   */
  public mongoDB(uri: string) {
    const connect = () => {
      mongoose
        .connect(uri)
        .then(() => {
          return;
        })
        .catch((error) => {
          console.log("DATABASE CONNECTION FAILED \n", error);
          return process.exit(1);
        });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
  }

  /**
   * Start the Express app
   */
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at: localhost:${this.port}`);
    });
  }
}

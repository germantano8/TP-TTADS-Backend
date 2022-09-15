import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import * as express from "express";
import ApiError from "../errors/api-error";
import { NextFunction, Request, Response } from "express";

/**
 * Validates the request object, and if it finds some errors, the middleware calls the next function with the error details.
 * The errors variable keeps an array of errors, each of them having the constraints object with the details.
 * This simple example creates a string of all of the issues.
 * The 400 Bad Request status code means that there is something wrong with the request that the client sent.
 * @param type class name to be mapped
 * @returns
 */
function handleValidation<T>(type: any): express.RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req.body)).then((errors) => {
      //If no validation errors pass req to next handler
      if (errors.length == 0) {
        return next();
      }

      const err = new ApiError(400, "Invalid request body");
      err.nestedErrors = errors.map((e) => Object.values(e.constraints));

      return next(err);
    });
  };
}

export default handleValidation;

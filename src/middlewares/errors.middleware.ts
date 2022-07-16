import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/api-error";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 * @param err Error caught by Express.js
 * @param _next Request object provided by Express
 * @param res Response object provided by Express
 * @param _req NextFunction function provided by Express
 */
function handleError(
  err: TypeError | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let error: ApiError;

  if (err instanceof ApiError) {
    error = err;
  } else {
    error = new ApiError(500, err.message);
  }

  return res.status(error.status).send(error);
}

export default handleError;

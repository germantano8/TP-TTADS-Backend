import { Request, Response, NextFunction } from "express";

import jwt = require("jsonwebtoken");
import { default as ApiError } from "../errors/api-error";

const auth = async (
  req: Request & { headers: { authorization: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = parseHeader(req);
    //req.user = decoded;
    return next();
  } catch (err) {
    return next(err);
  }
};

const parseHeader = (req: Request & { headers: { authorization: string } }) => {
  const header = req.headers.authorization;
  if (!header) throw new ApiError(403, "Authorization header missing");

  const token = header.split(" ")[1];
  if (!token) throw new ApiError(403, "Token is required for auth");

  const key = process.env.TOKEN_KEY || "";
  const decoded = jwt.verify(token, key, (err) => {
    throw new ApiError(403, err.message);
  });

  return decoded;
};

module.exports = auth;

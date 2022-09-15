import { Request, Response, NextFunction } from "express";

import jwt = require("jsonwebtoken");
import { default as ApiError } from "../errors/api-error";

const auth = async (
  req: Request & { headers: { authorization: string } },
  res: Response,
  next: NextFunction
) => {


  try {

    const header = req.headers.authorization;
    if (!header) throw new ApiError(401, "Authorization header missing");

    const token = header.split(" ")[1];
    if (!token) throw new ApiError(401, "Token is required for auth");

    const key = process.env.TOKEN_KEY || "";

    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();

  }


  catch (err) {
    next(new ApiError(401, err.message));
  };

};


module.exports = auth;

import {auth} from 'express-oauth2-jwt-bearer';
import * as dotenv from 'dotenv';

dotenv.config()

/*const authMiddleware = auth({
  audience: process.env.AUTH0_IDENTIFIER,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,

});*/

const authMiddleware = (req,res,next) => {
  next()
}

export{authMiddleware};

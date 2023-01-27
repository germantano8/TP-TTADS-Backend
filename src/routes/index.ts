import * as express from 'express';
import * as path from 'path';

import {router as role} from './role';
import {router as user} from './user';
import {router as tag} from './tag';
import {router as category} from './category';
import {router as meal} from './meal';
import {router as order} from './order';
import {router as location} from './location';
import {router as restaurant} from './restaurant';
import {uploads} from "../middlewares/disk";
import ApiError from "../errors/api-error";

const router = express.Router();

router.post("/upload", uploads.single("img"), (req, res, next) => {
  const { file } = req;
  if (!file) {
    const error = new ApiError(400, "Please upload a file");
    return next(error);
  }
  return res.send(file);
});

router.get("/image/:file", (req, res, next) => {
  const fileName = req.params.file;
  const filePath = path.resolve(`tmp/uploads/${fileName}`);
  res.sendFile(filePath, (err) => next(err));
});

router.use("/roles", role);
router.use("/users", user);
router.use("/tags", tag);
router.use("/categories", category);
router.use("/meals", meal);
router.use("/orders", order);
router.use("/locations", location);
router.use("/restaurants", restaurant);

export{router};

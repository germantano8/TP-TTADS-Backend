const express = require("express");
const path = require("path");

const role = require("./role");
const user = require("./user");
const tag = require("./tag");
const category = require("./category");
const meal = require("./meal");
const order = require("./order");
const location = require("./location");
const restaurant = require("./restaurant");
const uploads = require("../middlewares/disk.ts");
const { ApiError } = require("../errors/api-error");

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

module.exports = router;

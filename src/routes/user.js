"use strict";
let express = require("express");
let controller = require("../controllers/user");
let {
  verifyMongooseID,
  verifyUser,
  verifyLocation,
} = require("../middlewares/index");

let router = express.Router();

router.get("", controller.getUsers);
router.get("/:id/", verifyMongooseID, controller.getUser);
router.post("/", verifyUser, controller.createUser);
router.delete("/:id/", verifyMongooseID, controller.deleteUser);
router.put("/:id/", verifyMongooseID, verifyUser, controller.updateUser);

router.post("/:id/location", verifyLocation, controller.addMainLocation);

module.exports = router;

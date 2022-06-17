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

router.post("/:id/mainLocation", verifyLocation, controller.addMainLocation);
router.delete("/:id/mainLocation", controller.removeMainLocation);
router.post("/:id/location", verifyLocation, controller.addLocation);
router.delete("/:id/location", verifyLocation, controller.removeLocation);

module.exports = router;

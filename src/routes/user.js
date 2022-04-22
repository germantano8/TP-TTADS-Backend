"use strict";
let express = require("express");
let controller = require("../controllers/user");
let { verifyMongooseID, verifyUser } = require('../middlewares/index');

let router = express.Router();

router.get("", controller.getUsers);
router.get("/:id/", verifyMongooseID, controller.getUser);
router.post("/", controller.createUser);
router.delete("/:id/", controller.deleteUser);
router.put("/:id/", controller.updateUser);

module.exports = router;
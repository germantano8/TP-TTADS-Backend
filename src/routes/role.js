"use strict";
const express = require("express");
const controller = require("../controllers/role");
const { auth } = require("../middlewares");

let router = express.Router();

router.get("", auth, controller.getRoles);
router.get("/:id/", controller.getRole);
router.post("/", controller.createRole);
router.delete("/:id/", controller.deleteRole);
router.put("/:id/", controller.updateRole);

module.exports = router;

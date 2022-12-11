const express = require("express");
const controller = require("../controllers/role");
const { default: CreateRoleDto } = require("../dto/createRoleDto");
const { authMiddleware } = require("../middlewares");
const {
  default: handleValidation,
} = require("../middlewares/validation-middleware");

const router = express.Router();

router.get("", authMiddleware, controller.getRoles);
router.get("/:id/", controller.getRole);
router.post("/", handleValidation(CreateRoleDto), controller.createRole);
router.delete("/:id/", controller.deleteRole);
router.put("/:id/", controller.updateRole);

module.exports = router;

import * as express from 'express';
import { roleController as controller } from '../controllers';
import CreateRoleDto from "../dto/createRoleDto";
import { authMiddleware } from "../middlewares";
import handleValidation from "../middlewares/validation-middleware";

const router = express.Router();

router.get("", authMiddleware, controller.getRoles);
router.get("/:id/", controller.getRole);
router.post("/", handleValidation(CreateRoleDto), controller.createRole);
router.delete("/:id/", controller.deleteRole);
router.put("/:id/", controller.updateRole);

export{router};

let express = require("express");
let controller = require("../controllers/restaurant");
const { verifyMongooseID, verifyLocation } = require("../middlewares");

let router = express.Router();

router.get("/", controller.getRestaurants);
router.get("/:id", verifyMongooseID, controller.getRestaurant);
router.post("/", controller.createRestaurant);
router.delete("/:id", verifyMongooseID, controller.deleteRestaurant);
router.put("/:id", verifyMongooseID, controller.updateRestaurant);

router.put("/:id/location", verifyLocation, controller.addLocation);
router.delete("/:id/location", controller.removeLocation);

module.exports = router;

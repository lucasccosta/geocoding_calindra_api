import { Router } from "express";

// import { LocationsController } from "../controllers/location";
import { LocationsController } from "../controllers/location/LocationsController";

const locationsController = new LocationsController();

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});

// router.get("/location", LocationsController.getLocation);
router.get("/location", locationsController.getDistances);

export { router };

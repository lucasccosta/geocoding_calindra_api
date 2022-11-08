import { Router } from "express";

import { LocationsController } from "../controllers/location";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});

router.get("/location", LocationsController.getLocation);

export { router };

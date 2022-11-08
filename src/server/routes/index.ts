import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { LocationsController } from "../controllers/location";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});

router.get("/location", LocationsController.getLocation);

export { router };

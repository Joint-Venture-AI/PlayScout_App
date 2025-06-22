import { Router } from "express";
import { SubscriberController } from "./subscriber.controller";
import zodValidator from "../../middlewares/zodValidator";
import { createSubscriberZodSchema } from "./subscriber.validation";

const router = Router();

router.post(
  "/add-as-subscriber",
  zodValidator(createSubscriberZodSchema),
  SubscriberController.addAsSubscriber
);

router.get(
  "/get-subscriber-list",

  SubscriberController.getAllSubscriber
);

export const SubscriberRoute = router;

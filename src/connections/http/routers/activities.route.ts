import { Router } from "express";
import * as activityController from "../useCases/Activities/Controller/activity.controller";

export const activityrouter = Router();

activityrouter.post("/", activityController.Create);
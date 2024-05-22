import { Router } from "express";
import * as activityController from "../useCases/Activities/Controller/activity.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { CreateActivitySchema } from "../schemas/activity.schema";
import { limiter } from "../middlewares/ratelimit.middleware";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const activityrouter = Router();

activityrouter.post(
    "/",
    [
        limiter(6, 60000),
        ValidateMiddleware(CreateActivitySchema),
        PermissionMiddleware(["ADMIN", "USER"])
    ], 
    activityController.Create
);
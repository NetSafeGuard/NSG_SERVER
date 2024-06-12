import { Router } from "express";
import * as activityController from "../useCases/Activities/Controller/activity.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { AddDomainActivity, CreateActivitySchema, DeleteActivity, EditDomainActivity, DeleteDomainActivity } from "../schemas/activity.schema";
import { limiter } from "../middlewares/ratelimit.middleware";
import { PermissionMiddleware } from "../middlewares/permission.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";

export const activityrouter = Router();

activityrouter.post(
    "/",
    [
        limiter(6, 60000),
        TokenMiddleware,
        ValidateMiddleware(CreateActivitySchema),
        PermissionMiddleware(["ADMIN", "USER"])
    ],
    activityController.Create
);

activityrouter.post(
    "/domain",
    [
        limiter(6, 60000), 
        TokenMiddleware, 
        ValidateMiddleware(AddDomainActivity),
        PermissionMiddleware(["ADMIN", "USER"])
    ],

    activityController.AddDomain
)

activityrouter.put(
    "/domain",
    [
        limiter(6, 60000), 
        TokenMiddleware, 
        ValidateMiddleware(EditDomainActivity),
        PermissionMiddleware(["ADMIN", "USER"])
    ],

    activityController.EditDomain
)

activityrouter.delete(
    "/domain",
    [
        limiter(6, 60000), 
        TokenMiddleware, 
        ValidateMiddleware(DeleteDomainActivity),
        PermissionMiddleware(["ADMIN", "USER"])
    ],

    activityController.DeleteDomain
)

activityrouter.delete(
    '/',
    [
        limiter(6, 60000),
        TokenMiddleware, 
        ValidateMiddleware(DeleteActivity),
        PermissionMiddleware(["ADMIN", "USER"])
    ],

    activityController.Delete
)
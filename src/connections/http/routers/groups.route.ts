import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import { Create, Get, Delete } from "../useCases/Groups/Controller/group.controller";
import * as StudentController from "../useCases/Students/Controller/student.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { CreateGroupSchema, CreateStudentSchema } from "../schemas/group.schema";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const groupsrouter = Router();

groupsrouter.post("/", [TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Create);
groupsrouter.get("/", [TokenMiddleware, PermissionMiddleware(["USER", "ADMIN"])], Get);
groupsrouter.delete("/",[TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Delete);
// groupsrouter.put("/",[TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(EditGroupSchema)], Delete)
groupsrouter.post('/student', [TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateStudentSchema)], StudentController.Create);
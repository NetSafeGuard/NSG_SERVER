import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import { Create, Delete } from "../useCases/Groups/Controller/group.controller";
import * as StudentController from "../useCases/Students/Controller/student.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { CreateGroupSchema, CreateStudentSchema, EditStudentSchema } from "../schemas/group.schema";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const groupsrouter = Router();

groupsrouter.post("/", [TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Create);
groupsrouter.delete("/",[TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Delete);
groupsrouter.put("/student",[TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(EditStudentSchema)], StudentController.Update)
groupsrouter.post('/student', [TokenMiddleware, limiter(10,60000), PermissionMiddleware(["ADMIN", "USER"]), ValidateMiddleware(CreateStudentSchema)], StudentController.Create);
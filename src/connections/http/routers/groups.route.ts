import { Router } from "express";
import { limiter } from "../middlewares/ratelimit.middleware";
import { Create, Delete, Update } from "../useCases/Groups/Controller/group.controller";
import * as StudentController from "../useCases/Students/Controller/student.controller";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { TokenMiddleware } from "../middlewares/token.middleware";
import { CreateGroupSchema, CreateStudentSchema, DeleteStudentSchema, EditStudentSchema, EditGroupSchema } from "../schemas/group.schema";
import { PermissionMiddleware } from "../middlewares/permission.middleware";

export const groupsrouter = Router();

groupsrouter.post("/", [TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Create);
groupsrouter.delete("/",[TokenMiddleware, limiter(10,60000), PermissionMiddleware("ADMIN"), ValidateMiddleware(CreateGroupSchema)], Delete);
groupsrouter.put("/",[TokenMiddleware, limiter(10,60000), PermissionMiddleware(["ADMIN", "USER"]), ValidateMiddleware(EditGroupSchema)], Update)
groupsrouter.put("/student",[TokenMiddleware, limiter(10,60000), PermissionMiddleware(["ADMIN", "USER"]), ValidateMiddleware(EditStudentSchema)], StudentController.Update)
groupsrouter.post('/student', [TokenMiddleware, limiter(10,60000), PermissionMiddleware(["ADMIN", "USER"]), ValidateMiddleware(CreateStudentSchema)], StudentController.Create);
groupsrouter.delete("/student", [TokenMiddleware, limiter(10,60000), PermissionMiddleware(["ADMIN", "USER"]), ValidateMiddleware(DeleteStudentSchema)], StudentController.Delete);
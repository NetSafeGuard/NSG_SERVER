import { Router } from "express";
import * as examsController from "../useCases/Exams/Controller/exam.controller";

export const examsrouter = Router();

examsrouter.post("/", examsController.Create);
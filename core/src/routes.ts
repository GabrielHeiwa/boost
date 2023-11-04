
import { Router } from "express";
import { GetVersionUseCase } from "./useCases/getVersionUseCase";

const routes = Router();

const getVersionUseCase = new GetVersionUseCase();

routes.get("/", getVersionUseCase.execute);

export { routes };

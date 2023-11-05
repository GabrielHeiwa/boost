
import { Router } from "express";
import { GetVersionUseCase } from "./useCases/getVersionUseCase";
import { generateReportPDFUseCase } from "./useCases/generateReportPDF";
import { midlewareTemplateFile } from "./config/multer";

const routes = Router();

const getVersion = new GetVersionUseCase();
const generateReportPDF = new generateReportPDFUseCase(); 

// GET ROUTES
routes.get("/", getVersion.execute);

// POST ROUTES
routes.post("/generate", midlewareTemplateFile, generateReportPDF.execute);

export { routes };

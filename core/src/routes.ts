
import { Router } from "express";
import { GetVersionUseCase } from "./useCases/getVersionUseCase";
import { generateReportPDFUseCase } from "./useCases/generateReportPDF";

const routes = Router();

const getVersion = new GetVersionUseCase();
const generateReportPDF = new generateReportPDFUseCase(); 

// GET ROUTES
routes.get("/", getVersion.execute);

// POST ROUTES
routes.post("/generate", generateReportPDF.execute);

export { routes };

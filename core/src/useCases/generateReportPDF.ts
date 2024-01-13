

import type { Request, Response } from "express";
import { generateHtmlUseCase } from "./generateHtml";
import { generatePdfUseCase } from "./generatePDF";
import fs from "node:fs";
import path from "node:path";

const templates = ["vocation-receipt", "paycheck", "revenue-report"];
class generateReportPDFUseCase {
    public async execute(req: Request, res: Response) {
        try {
            const { template, data } = req.body;
            
            if (!template || !templates.includes(template)) {
                return res.status(400).json({
                    message: "Template inválido"
                });
            }
            
            const filePath = path.join(__dirname, "..", "..", "templates", `${template}.html`);           
            const file = fs.readFileSync(filePath, { encoding: "utf-8" });                   
            const htmlFilename = await new generateHtmlUseCase().execute(file, data);
            const htmlPath = path.resolve(process.cwd(), "html", htmlFilename);            
            const pdfPath = await new generatePdfUseCase().execute(htmlFilename);
            
            res.contentType('application/pdf');
            res.download(pdfPath, (err) => {
                if (err) {
                    console.error(err);
                    throw new Error("[res.download]> Houve um erro ao enviar o PDF para download");
                }

                fs.rm(pdfPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });

                fs.rm(htmlPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });

        } catch (err: any) {

            return res.status(400).json({
                message: "Houve um erro ao gerar o relatório PDF.",
                err: err.message,
            });
        }

    };
};

export { generateReportPDFUseCase };

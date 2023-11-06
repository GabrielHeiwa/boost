

import type { Request, Response } from "express";
import { generateHtmlUseCase } from "./generateHtml";
import { generatePdfUseCase } from "./generatePDF";
import fs from "node:fs";
import path from "node:path";


class generateReportPDFUseCase {
    public async execute(req: Request, res: Response) {
        try {
            const { file } = req;
            const { json } = req.body;
            const jsonParsed = JSON.parse(json);
    
            if (!file) {
                return res.status(400).json({
                    message: "Nenhum arquivo de template enviado"
                });
            }

            const htmlFilename = await new generateHtmlUseCase().execute(file, jsonParsed);
            const htmlPath = path.resolve(process.cwd(), "html", htmlFilename);

            const pdfPath = await new generatePdfUseCase().execute(htmlFilename);

            res.download(pdfPath);
            res.end(() => {

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
            
            console.error(err);

            return res.status(400).json({
                message: "Houve um erro ao gerar o relatório PDF.",
                err: err.message,
            });
        }

    };
};

export { generateReportPDFUseCase };

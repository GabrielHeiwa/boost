
import puppeteer from "puppeteer";
import { randomUUID } from "crypto";
import path from "path";
import fs from "node:fs";

class generatePdfUseCase {
    public async execute(htmlFilename: string) {
        try {

            const browser = await puppeteer.launch({ headless: "new" });

            const page = await browser.newPage();
            const url = "http://localhost:" + process.env.PORT + "/html/" + htmlFilename;

            await page.goto(url);

            const pdfFilename = randomUUID() + ".pdf";
            const pdfPath = path.resolve(process.cwd(), "pdf", pdfFilename);
            await page.pdf({ path: pdfPath });

            const htmlPath = path.resolve(process.cwd(), "html", htmlFilename);
            fs.rm(htmlPath, err => {
                if (err) {
                    console.error(err);
                }
            })

            return pdfPath;

        } catch (err: any) {

            throw new Error("[generatePDF]> Houve um erro ao gerar o PDF");
        
        }
    };
}

export { generatePdfUseCase };

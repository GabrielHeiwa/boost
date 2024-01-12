
import puppeteer from "puppeteer";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";

class generatePdfUseCase {
    public async execute(htmlFilename: string) {
        const filePath = path.join(__dirname, "..", "..", "html", htmlFilename);
        try {

            const browser = await puppeteer.launch({ 
                headless: process.env.ENVIRONMENT === "dev" ? false : "new",
                args: process.env.ENVIRONMENT === "dev" ? [] : ["--no-sandbox", "--disable-setuid-sandbox"]
            });

            const page = await browser.newPage();
            const html = fs.readFileSync(filePath, { encoding: "utf-8" })
            await page.setContent(html);

            const pdfFilename = randomUUID() + ".pdf";
            const pdfPath = path.resolve(process.cwd(), "pdf", pdfFilename);
            await page.pdf({ path: pdfPath });

            await browser.close();

            return pdfPath;

        } catch (err: any) {
            console.log((err));
            

            throw new Error("[generatePDF]> Houve um erro ao gerar o PDF");
        
        }
    };
}

export { generatePdfUseCase };

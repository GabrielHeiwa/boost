
import puppeteer from "puppeteer";
import { randomUUID } from "crypto";
import path from "path";

class generatePdfUseCase {
    public async execute(htmlFilename: string) {
        try {

            const browser = await puppeteer.launch({ 
                headless: process.env.ENVIRONMENT === "dev" ? false : "new",
                args: process.env.ENVIRONMENT === "dev" ? [] : ["--no-sandbox", "--disable-setuid-sandbox"]
            });

            const page = await browser.newPage();
            const url = "http://localhost:" + process.env.PORT + "/html/" + htmlFilename;

            await page.goto(url);

            const pdfFilename = randomUUID() + ".pdf";
            const pdfPath = path.resolve(process.cwd(), "pdf", pdfFilename);
            await page.pdf({ path: pdfPath });

            await browser.close();

            return pdfPath;

        } catch (err: any) {

            throw new Error("[generatePDF]> Houve um erro ao gerar o PDF");
        
        }
    };
}

export { generatePdfUseCase };

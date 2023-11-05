

import type { Request, Response } from "express";
import multer from "multer";
import path from "node:path";
import handlebars from "handlebars";
import fs from "node:fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, Date.now() + '-' + file.fieldname + fileExtension);
    }
});

class generateReportPDFUseCase {
    public async execute(req: Request, res: Response) {
        multer({ storage }).single("template")(req, res, function (err) {
            // TODO: Tratamento de erro para o upload do arquivo
            
            if (err instanceof multer.MulterError) {
                console.log("multer error");
                // A Multer error occurred when uploading.
            } else if (err) {
                console.log("error");
                // An unknown error occurred when uploading.
            }

            const { file } = req;
            const { json } = req.body;
            const jsonParsed = JSON.parse(json);

            if (!file) return;

            const fileTemplate = fs.readFileSync(file.path, { encoding: "utf-8" });
            const template = handlebars.compile(fileTemplate);
            const html = template(jsonParsed);

            const outputPath = path.resolve(__dirname, "..", "..", "tmp", "output.html");
            fs.writeFile(outputPath, html, { encoding: "utf-8" }, (err) => {
                if (err) {
                    console.error("Erro ao gravar o template");
                    console.error(err);

                    return;
                }
            });
        });

        return res.status(200).send("ok");

    };


    public async generateHTMLFile() {

    }

};

export { generateReportPDFUseCase };

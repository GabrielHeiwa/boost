
import handlebars from "handlebars";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

class generateHtmlUseCase {
    public async execute(file: string, json: Record<string, any>) {
        const template = handlebars.compile(file);
        const html = template(json);
        const uuid = randomUUID();
        const filename = uuid + "-output.html";

        const outputPath = path.resolve(process.cwd(), "html", filename);
        fs.writeFileSync(outputPath, html);

        return filename;
    }
}

export { generateHtmlUseCase };

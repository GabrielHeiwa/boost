
import type { Request, Response } from "express";
import pjson from "../../package.json";

class GetVersionUseCase {
    public async execute(req: Request, res: Response) {
        const VERSION = pjson.version;

        return res.status(200).json({ version: VERSION });
    }
}

export { GetVersionUseCase };

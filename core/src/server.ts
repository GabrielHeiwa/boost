
import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import { routes } from "./routes";

const server = express();

server.use(cors({ origin: "*" }));
server.use(express.json({ limit: process.env.BOOST_FILE_SIZE_LIMIT }));
server.use(routes);

server.set("view engine", engine());

export { server };

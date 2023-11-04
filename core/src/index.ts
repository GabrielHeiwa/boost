
// Configuração das variaveis de ambiente
import { config } from "dotenv";

config();

import { server } from "./server";

const PORT = process.env.PORT || 2703;

server.listen(PORT, () => console.info("[index]> Servidor ouvindo a porta " + PORT));

import express from "express";
import dotenv from "dotenv";
import personagensRouter from "./src/routes/personagensRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Servidor de Nanatsu no Taizai funcionando...");
});

app.use("/personagens", personagensRouter);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor funcionando em: http://localhost:${serverPort}`);
});
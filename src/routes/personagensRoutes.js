import express from "express";
import {getAllPersonagens, getPersonagemById, createPersonagem, deletePersonagem} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAllPersonagens);
router.get("/:id", getPersonagemById);
router.post("/", createPersonagem);
router.delete("/:id", deletePersonagem);

export default router;
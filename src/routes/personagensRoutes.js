import express from "express";
import {getAllPersonagens, getPersonagensById, createPersonagem} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAllPersonagens);
router.get("/:id", getPersonagensById);
router.post("/", createPersonagem);

export default router;
import express from "express";
import {getAllPersonagens, getPersonagensById} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAllPersonagens);
router.get("/:id", getPersonagensById);

export default router;
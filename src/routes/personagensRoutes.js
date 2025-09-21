import express from "express";
import {getAllPersonagens} from "../controllers/personagensController.js";

const router = express.Router();

router.get("/", getAllPersonagens);

export default router;
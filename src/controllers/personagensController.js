import data from "../models/data.js";
import dados from "../models/data.js";
const {personagens} = dados;

const getAllPersonagens = (req, res) => {
    res.status(200).json({
        total: personagens.length,
        data: personagens
    });
}

const getPersonagensById = (req, res) => {
    const id = parseInt(req.params.id);
    const personagem = personagens.find(p => p.id === id);

    if (personagem) {
        res.status(200).json({
            success: true,
            data: personagem
        });
    } else {
        res.status(400).json({
            success: false,
            message: `personagem com o ID ${id} não encontrado.`
        });
    }
}

export {getAllPersonagens, getPersonagensById}
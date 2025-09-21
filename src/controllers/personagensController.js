import data from "../models/data.js";
import dados from "../models/data.js";
const {personagens} = dados;

const getAllPersonagens = (req, res) => {
    res.status(200).json({
        total: personagens.length,
        data: personagens
    });
}

export {getAllPersonagens}
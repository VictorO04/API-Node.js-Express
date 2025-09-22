import data from "../models/data.js";
import dados from "../models/data.js";
const { personagens } = dados;

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
            message: `personagem com o ID ${id} não encontrado`
        });
    }
}

const createPersonagem = (req, res) => {
    const { nome, raca, habilidades, afiliacao } = req.body;

    const racasNanatsu = [
        "Demônio",
        "Deusa",
        "Humano",
        "Gigante",
        "Fada",
        "Deus Antigo",
        "Besta Sagrada",
        "Vampiro",
        "Deidade do Caos",
        "Serpente Marinha",
        "Boneco",
        "Animal Mágico"
    ];

    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "Nome é obrigatório para adicionar um novo personagem"
        });
    }
    if (!raca) {
        return res.status(400).json({
            success: false,
            message: "Raça é obrigatório para adicionar um novo personagem"
        });
    }
    if (!habilidades) {
        return res.status(400).json({
            success: false,
            message: "Habilidades é obrigatório para adicionar um novo personagem"
        });
    }
    if (!afiliacao) {
        return res.status(400).json({
            success: false,
            message: "Afiliação é obrigatório para adicionar um novo personagem"
        });
    }

    if (!racasNanatsu.includes(raca)) {
        return res.status(400).json({
            success: false,
            message: `A raça "${raca}" não existe. Raças existentes: ${racasNanatsu.join(", ")}`
        });
    }

    const novoPersonagem = {
        id: personagens.length + 1,
        nome,
        raca,
        habilidades,
        afiliacao
    }

    personagens.push(novoPersonagem);

    res.status(201).json({
        success: true,
        message: "Novo personagem cadastrado com sucesso",
        data: novoPersonagem
    });
}

export {getAllPersonagens, getPersonagensById, createPersonagem}
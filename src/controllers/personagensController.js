import data from "../models/data.js";
import dados from "../models/data.js";
const { personagens } = dados;

const getAllPersonagens = (req, res) => {
    res.status(200).json({
        total: personagens.length,
        data: personagens
    });
}

const getPersonagemById = (req, res) => {
    const id = parseInt(req.params.id);
    const personagem = personagens.find(p => p.id === id);

    if (personagem) {
        res.status(200).json({
            success: true,
            data: personagem
        });
    } else {
        res.status(404).json({
            success: false,
            message: `personagem com o ID ${id} não encontrado`
        });
    }
}

const getByNamePersonagens = (req, res) => {
    const nome = req.params.nome.toLowerCase();
    const personagensEncontrados = personagens.filter(p => p.nome.toLowerCase().includes(nome));

    if (personagensEncontrados.length > 0) {
        res.status(200).json({
            success: true,
            data: personagensEncontrados
        }); 
    } else {
        res.status(404).json({
            success: false,
            message: `Personagem com o nome ${nome} não encontrado`
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

const deletePersonagem = (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const personagemParaApagar = personagens.find(p => p.id === idParaApagar);

    if (!personagemParaApagar) {
        return res.status(404).json({
            success: false,
            message: `personagem com este ID não existe`
        });
    }

    const personagemFiltrado = personagens.filter(p => p.id !== idParaApagar);

    personagens.splice(0, personagens.length, ...personagemFiltrado);

    return res.status(200).json({
        success: true,
        message: "O personagem foi removido com sucesso"
    });
}

const updatePersonagem = (req, res) => {
    const id = parseInt(req.params.id);
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

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O ID deve ser válido"
        });
    }

    const personagemExiste = personagens.find(p => p.id === id);

    if (!personagemExiste) {
        return res.status(404).json({
            success: false,
            message: "Personagem não existe"
        });
    }

    if (!racasNanatsu.includes(raca)) {
        return res.status(400).json({
            success: false,
            message: `A raça "${raca}" não existe. Raças existentes: ${racasNanatsu.join(", ")}`
        });
    }

    const personagemAtualizado = personagens.map(personagem => personagem.id === id
        ? {
            ...personagem,
            ...(nome && {nome}),
            ...(raca && {raca}),
            ...(habilidades && {habilidades}),
            ...(afiliacao && {afiliacao})
        }
        : personagem
    );

    personagens.splice(0, personagens.length, ...personagemAtualizado);

    const personagemAtualizados = personagens.find(p => p.id === id);

    res.status(200).json({
        success: true,
        message: "Personagem atualizado com sucesso",
        data: personagemAtualizados
    });
}

export {getAllPersonagens, getPersonagemById, getByNamePersonagens, createPersonagem, deletePersonagem, updatePersonagem}
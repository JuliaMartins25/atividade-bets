import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Bruno Mars",
    profissao: "cantor",
    aposta: true, //envolvimento em apostas
    nivel: [
      "Alto",
      "Médio",
      "Baixo",
    ],
  },

];

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
  const { nome, profissao, aposta, nivel } = req.body;

  // Validação dos campos nome e profissão
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou o profissão não foi preenchido!",
    });
  }

  // Validação do nivel de suspeita
  if (suspeitos != "Baixo" && suspeitos != "Médio" && suspeitos != "Alto") {
    return res.status(400).send({
      message:
        "o suspeito não tem nível!",
    });
  }

  // Criação de um novo suspeitos
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissão,
    aposta,
    nivel,
  };

  // Adiciona o novo suspeito ao array de suspeitos
  suspeitos.push(novoSuspeito);

  return res.status(201).json({
    message: "Suspeito cadastrado com sucesso!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeitos pelo id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeitos pelo id no array de suspeitos
  const suspeitos = suspeitos.find((suspects) => suspects.id == id);

  // Verifica se o suspeitos foi encontrado
  if (!suspeitos) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
  }

  return res.status(200).json(suspeitos);
});

// Rota para atualizar um suspeitos pelo id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, partido, idade, segundo, propostas } = req.body;

  // Busca um suspeitos pelo id no array de suspeitos
  const suspeitos = suspeitos.find((politico) => politico.id == id);

  // Verifica se o suspeitos foi encontrado
  if (!suspeitos) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
  }

  // Validação dos campos nome e partido
  if (!nome || !partido) {
    return res.status(400).send({
      message: "O nome ou o partido não foi preenchido, criança aleatória!",
    });
  }

  suspeitos.nome = nome;
  suspeitos.partido = partido;
  suspeitos.idade = idade;
  suspeitos.segundo = segundo;
  suspeitos.propostas = propostas;

  return res.status(200).json({
    message: "Candidato atualizado com sucesso!",
    suspeitos,
  });
});

suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeitos pelo id no array de suspeitos
  const suspeitos = suspeitos.find((politico) => politico.id == id);

  // Verifica se o suspeitos foi encontrado
  if (!suspeitos) {
    return res
      .status(404)
      .json({ message: `Candidato com id ${id} não encontrado!` });
  }

  // Remove o suspeitos do array de suspeitos
  suspeitos = suspeitos.filter((suspeitos) => suspeitos.id != id);

  return res.status(200).json({
    message: "Candidato removido com sucesso!",
    suspeitos,
  });
});

export default suspeitosRoutes;
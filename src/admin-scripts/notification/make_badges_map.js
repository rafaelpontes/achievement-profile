var badges = [

  // Daily exerciser

  {
    key: "daily-exerciser",
    title: "Exercitador Diário",
    description: "Resolveu pelo menos 5 exercícios em um dia.",
    imgsrc: "./images/badges/24h/24h.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Só acumula uma vez por dia.",
    achieved: false,
    original_icon_author: 'freepik'
  },

  {
    key: "daily-exerciser-copper",
    title: "Exercitador Diário de Bronze",
    description: "Resolveu pelo menos 10 exercícios em um dia.",
    imgsrc: "./images/badges/24h/24h-copper.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Só acumula uma vez por dia.",
    achieved: false
  },

  {
    key: "daily-exerciser-silver",
    title: "Exercitador Diário de Prata",
    description: "Resolveu pelo menos 15 exercícios em um dia.",
    imgsrc: "./images/badges/24h/24h-silver.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Só acumula uma vez por dia.",
    achieved: false
  },

  {
    key: "daily-exerciser-gold",
    title: "Exercitador Diário de Ouro",
    description: "Resolveu pelo menos 20 exercícios em um dia.",
    imgsrc: "./images/badges/24h/24h-gold.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Só acumula uma vez por dia.",
    achieved: false
  },

  {
    key: "daily-exerciser-diamond",
    title: "Exercitador Diário Diamante",
    description: "Resolveu pelo menos 25 exercícios em um dia.",
    imgsrc: "./images/badges/24h/24h-diamond.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Só acumula uma vez por dia.",
    achieved: false
  },

  // More exerciser Badges

  {
    key: "exerciser-247",
    title: "Exercitador 24/7",
    description: "Resolveu pelo menos um exercício por dia por 7 dias consecutivos.",
    imgsrc: "./images/badges/247/247.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Se passar 2 dias consecutivos sem enviar exercício, zera a contagem para obtenção. Completados 7 dias consecutivos de envio, acumula um badge e a contagem zera novamente.",
    achieved: false
  },

  {
    key: "exerciser-30",
    title: "Exercitador Whole 30",
    description: "Resolveu pelo menos um exercício por dia por 30 dias consecutivos.",
    imgsrc: "./images/badges/30/30.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Se passar 2 dias consecutivos sem enviar exercício, zera a contagem para obtenção. Completados 30 dias consecutivos de envio, acumula um badge e a contagem zera novamente.",
    achieved: false
  },

  // Persistent
  {
    key: "persistent",
    title: "Programador Persistente",
    description: "Resolveu pelo menos 5 exercícios por dia, por 5 dias consecutivos.",
    imgsrc: "./images/badges/persistent/persistent.png",
    cumulative: false,
    achieved: false
  },

  {
    key: "persistent-copper",
    title: "Programador Persistente de Bronze",
    description: "Resolveu pelo menos 5 exercícios por dia, por 5 dias consecutivos, após receber badge de \"Exercitador Persistente\".", imgsrc: "./images/badges/persistent/persistent-copper.png",
    cumulative: false,
    achieved: false
  },

  {
    key: "persistent-silver",
    title: "Programador Persistente de Prata",
    description: "Resolveu pelo menos 5 exercícios por dia, por 5 dias consecutivos, após receber badge de \"Programador Persistente de Bronze\".",
    imgsrc: "./images/badges/persistent/persistent-silver.png",
    cumulative: false,
    achieved: false
  },

  {
    key: "persistent-gold",
    title: "Programador Persistente de Ouro",
    description: "Resolveu pelo menos 5 exercícios por dia, por 5 dias consecutivos, após receber badge de \"Programador Persistente de Prata\".",
    imgsrc: "./images/badges/persistent/persistent-gold.png",
    cumulative: false,
    achieved: false
  },

  {
    key: "persistent-diamond",
    title: "Programador Persistente Diamante",
    description: "Resolveu pelo menos 5 exercícios por dia, por 5 dias consecutivos, após receber badge de \"Programador Persistente de Ouro\".",
    imgsrc: "./images/badges/persistent/persistent-diamond.png",
    cumulative: false,
    achieved: false
  },

  {
    key: "persistent-savant",
    title: "Programador Persistente Sagaz!",
    description: "Resolveu pelo menos 5 exercícios por dia, por 5 dias consecutivos, após ter recebido o badge de \"Exercitador Persistente Diamante\".",
    imgsrc: "./images/badges/persistent/persistent-savant.png",
    cumulative: true, amount: 0,
    cumulative_criteria: "Caso fique 2 dias consecutivos sem enviar a quantidade mínima de exercícios (cinco), a contagem é zerada.",
    achieved: false
  },

  {
    key: "competitor-copper",
    title: "Competidor de Bronze",
    description: "Ficou no intervalo [30%-50%[ dos alunos que mais resolveram exercícios em uma semana.",
    imgsrc: './images/badges/competitor/competitor-copper.png',
    cumulative: true, amount: 0,
    cumulative_criteria: "Só aculuma uma vez por semana.",
    tooltip_description: "Contabiliza da 0h da segunda às 23h59 do domingo.",
    tooltip_criteria: "O período de uma semana consiste da 0h da segunda às 23h59 do domingo",
    achieved: false
  },

  {
    key: "competitor-silver",
    title: "Competidor de Prata",
    description: "Ficou no intervalo [50%-65%[ dos alunos que mais resolveram exercícios em uma semana.",
    imgsrc: './images/badges/competitor/competitor-silver.png',
    cumulative: true, amount: 0,
    cumulative_criteria: "Só aculuma uma vez por semana.",
    tooltip_description: "Contabiliza da 0h da segunda às 23h59 do domingo.",
    tooltip_criteria: "O período de uma semana consiste da 0h da segunda às 23h59 do domingo",
    achieved: false
  },

  {
    key: "competitor-gold",
    title: "Competidor de Ouro",
    description: "Ficou no intervalo [65%-85%[ dos alunos que mais resolveram exercícios em uma semana.",
    imgsrc: './images/badges/competitor/competitor-gold.png',
    cumulative: true, amount: 0,
    cumulative_criteria: "Só aculuma uma vez por semana.",
    tooltip_description: "Contabiliza da 0h da segunda às 23h59 do domingo.",
    tooltip_criteria: "O período de uma semana consiste da 0h da segunda às 23h59 do domingo",
    achieved: false
  },

  {
    key: "competitor-platinum",
    title: "Competidor de Platina",
    description: "Ficou no intervalo [85%-95%[ dos alunos que mais resolveram exercícios em uma semana.",
    imgsrc: './images/badges/competitor/competitor-platinum.png',
    cumulative: true, amount: 0,
    cumulative_criteria: "Só aculuma uma vez por semana.",
    tooltip_description: "Contabiliza da 0h da segunda às 23h59 do domingo.",
    tooltip_criteria: "O período de uma semana consiste da 0h da segunda às 23h59 do domingo",
    achieved: false
  },

  {
    key: "competitor-diamond",
    title: "Competidor Diamante",
    description: "Ficou no intervalo [95%-100%] dos alunos que mais resolveram exercícios em uma semana.",
    imgsrc: './images/badges/competitor/competitor-diamond.png',
    cumulative: true, amount: 0,
    cumulative_criteria: "Só aculuma uma vez por semana.",
    tooltip_description: "Contabiliza da 0h da segunda às 23h59 do domingo.",
    tooltip_criteria: "O período de uma semana consiste da 0h da segunda às 23h59 do domingo",
    achieved: false
  },

  {
    key: "unit-1",
    title: "Unidade 1 Concluída!",
    description: "Concluiu a Unidade 1.",
    imgsrc: './images/badges/units/unit-1.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-2",
    title: "Unidade 2 Concluída!",
    description: "Concluiu a Unidade 2.",
    imgsrc: './images/badges/units/unit-2.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-3",
    title: "Unidade 3 Concluída!",
    description: "Concluiu a Unidade 3.",
    imgsrc: './images/badges/units/unit-3.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-4",
    title: "Unidade 4 Concluída!",
    description: "Concluiu a Unidade 4.",
    imgsrc: './images/badges/units/unit-4.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-5",
    title: "Unidade 5 Concluída!",
    description: "Concluiu a Unidade 5.",
    imgsrc: './images/badges/units/unit-5.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-6",
    title: "Unidade 6 Concluída!",
    description: "Concluiu a Unidade 6.",
    imgsrc: './images/badges/units/unit-6.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-7",
    title: "Unidade 7 Concluída!",
    description: "Concluiu a Unidade 7.",
    imgsrc: './images/badges/units/unit-7.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-8",
    title: "Unidade 8 Concluída!",
    description: "Concluiu a Unidade 8.",
    imgsrc: './images/badges/units/unit-8.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-9",
    title: "Unidade 9 Concluída!",
    description: "Concluiu a Unidade 9.",
    imgsrc: './images/badges/units/unit-9.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "unit-10",
    title: "Unidade 10 Concluída!",
    description: "Concluiu a Unidade 10.",
    imgsrc: './images/badges/units/unit-10.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "collaborator",
    title: "Colaborador",
    description: "Deu sua primeira dica útil.",
    imgsrc: './images/badges/collaborator/collaborator.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "collaborator-beginner",
    title: "Colaborador Iniciante",
    description: "Deu pelo menos 5 dicas úteis para outros alunos.",
    imgsrc: './images/badges/collaborator/collaborator-beginner.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "collaborator-intermediate",
    title: "Colaborador Intermediário",
    description: "Deu pelo menos 10 dicas úteis para outros alunos.",
    imgsrc: './images/badges/collaborator/collaborator-intermediate.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "collaborator-advanced",
    title: "Colaborador Avançado",
    description: "Deu pelo menos 15 dicas úteis para outros alunos.",
    imgsrc: './images/badges/collaborator/collaborator-advanced.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "collaborator-expert",
    title: "Colaborador Expert",
    description: "Deu pelo menos 25 dicas úteis para outros alunos.",
    imgsrc: './images/badges/collaborator/collaborator-expert.png',
    cumulative: false,
    achieved: false
  },

  {
    key: "collaborator-savant",
    title: "Colaborador Sagaz!",
    description: "Deu 10 dicas úteis, após ser classificado como \"Colaborador Expert\".",
    imgsrc: './images/badges/collaborator/collaborator-savant.png',
    cumulative: true, amount: 0,
    cumulative_criteria: "A cada 10 dicas úteis, acumula um badge deste e a contagem zera.",
    tooltip_description: "Só é possível ganhar este badge após ter sido classificado como Colaborador Expert.",
    achieved: false
  },

  {
    key: "professional-approximator",
    title: "Aproximador Profissional!",
    description: "Resolveu a questão de pi por aproximação.",
    imgsrc: "./images/badges/extras/pi/pi-aprox.png",
    cumulative: false,
    achieved: false
  },

  {
    key: "extra-badge",
    title: "Badge Extra!",
    description: "Exemplo de badge.",
    imgsrc: "./images/badges/extras/pi/pi-aprox.png",
    cumulative: false,
    achieved: false
  }
];

badgesMap = {};

for (var badge of badges) {
  badgesMap[badge.key] = {};
  badgesMap[badge.key].title = badge.title;
  badgesMap[badge.key].image = badge.imgsrc;
}

console.log(badgesMap);

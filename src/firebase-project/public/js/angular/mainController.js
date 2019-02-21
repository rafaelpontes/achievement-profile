var achievementsApp = angular.module('tstAchievements', []);

achievementsApp.controller('MainCtlr', function AppController($scope) {

  const DEBUG = false;

  function debug(message) {
    if(DEBUG) {
      console.log(message);
    }
  }

  // Page state variables
  $scope.isLoggedIn = false;
  $scope.isLoadingPage = true;
  $scope.hasTriedLogin = false;
  $scope.isEnrolledStudent = false;

  $scope.placarSemana = {};

  // Achievements initialization
  $scope.achievements = {};

  $scope.achievements.statistics = {
    current_consecutiveActiveDays: '-',
    consecutiveActiveDays: '-',

    current_maxProbSolDay: '-',
    maxProbSolDay: '-',

    current_maxProbSolWeek: '-',
    maxProbSolWeek: '-',

    current_maxUsefulHintsWeek: '-',
    maxUsefulHintsWeek: '-',

    current_maxUsefulHints: '-',
    maxUsefulHints: '-'
  };

  $scope.achievements.numberOfBadges = 0;

  var badgepath = "./images/badges/";
  var noimgpath = "./images/badges/noimage.png";

  $scope.achievements.notachievedpath = "./images/badges/locked.png";

  $scope.achievements.badges = {}

  $scope.achievements.badges.daily = [

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
    } ];

    $scope.achievements.badges.continuous_exerciser = [
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
      }
    ];

  $scope.achievements.badges.competitor = [
      {
        key: "competitor-copper",
        title: "Competidor de Bronze",
        description: "Ficou no intervalo [75%-50%[ dos alunos que mais resolveram exercícios em uma semana.",
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
        description: "Ficou no intervalo [50%-35%[ dos alunos que mais resolveram exercícios em uma semana.",
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
        description: "Ficou no intervalo [35%-20%[ dos alunos que mais resolveram exercícios em uma semana.",
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
        description: "Ficou no intervalo [20%-5%[ dos alunos que mais resolveram exercícios em uma semana.",
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
        description: "Ficou entre os 5% dos alunos que mais resolveram exercícios em uma semana.",
        imgsrc: './images/badges/competitor/competitor-diamond.png',
        cumulative: true, amount: 0,
        cumulative_criteria: "Só aculuma uma vez por semana.",
        tooltip_description: "Contabiliza da 0h da segunda às 23h59 do domingo.",
        tooltip_criteria: "O período de uma semana consiste da 0h da segunda às 23h59 do domingo",
        achieved: false
      },

      // Marathon Competitor

      {
        key: "copper-marathonist",
        title: "Maratonista de Bronze",
        description: "Ficou no intervalo [75%-50%[ dos alunos que mais resolveram exercícios na maratona.",
        imgsrc: './images/badges/special/copper-marathonist.png',
        cumulative: false, amount: 0,
        cumulative_criteria: "Não cumulativo.",
        tooltip_description: "A maratona foi programada das 10h às 12h do dia 09 de julho de 2018.",
        tooltip_criteria: "Só pode ser adquirido durante a maratona.",
        achieved: false
      },

      {
        key: "silver-marathonist",
        title: "Maratonista de Prata",
        description: "Ficou no intervalo [50%-35%[ dos alunos que mais resolveram exercícios na maratona.",
        imgsrc: './images/badges/special/silver-marathonist.png',
        cumulative: false, amount: 0,
        cumulative_criteria: "Não cumulativo.",
        tooltip_description: "A maratona foi programada das 10h às 12h do dia 09 de julho de 2018.",
        tooltip_criteria: "Só pode ser adquirido durante a maratona.",
        achieved: false
      },

      {
        key: "gold-marathonist",
        title: "Maratonista de Ouro",
        description: "Ficou no intervalo [35%-20%[ dos alunos que mais resolveram exercícios na maratona.",
        imgsrc: './images/badges/special/gold-marathonist.png',
        cumulative: false, amount: 0,
        cumulative_criteria: "Não cumulativo.",
        tooltip_description: "A maratona foi programada das 10h às 12h do dia 09 de julho de 2018.",
        tooltip_criteria: "Só pode ser adquirido durante a maratona.",
        achieved: false
      },

      {
        key: "platinum-marathonist",
        title: "Maratonista de Platina",
        description: "Ficou no intervalo [20%-5%[ dos alunos que mais resolveram exercícios na maratona.",
        imgsrc: './images/badges/special/platinum-marathonist.png',
        cumulative: false, amount: 0,
        cumulative_criteria: "Não cumulativo.",
        tooltip_description: "A maratona foi programada das 10h às 12h do dia 09 de julho de 2018.",
        tooltip_criteria: "Só pode ser adquirido durante a maratona.",
        achieved: false
      },

      {
        key: "diamond-marathonist",
        title: "Maratonista Diamante",
        description: "Ficou entre os 5% dos alunos que mais resolveram exercícios na maratona.",
        imgsrc: './images/badges/special/diamond-marathonist.png',
        cumulative: false, amount: 0,
        cumulative_criteria: "Não cumulativo.",
        tooltip_description: "A maratona foi programada das 10h às 12h do dia 09 de julho de 2018.",
        tooltip_criteria: "Só pode ser adquirido durante a maratona.",
        achieved: false
      }
    ];

    // $scope.achievements.badges.collaborator = [

    // {
    //   key: "collaborator",
    //   title: "Colaborador",
    //   description: "Deu sua primeira dica útil.",
    //   imgsrc: './images/badges/collaborator/collaborator.png',
    //   cumulative: false,
    //   achieved: false
    // },
    //
    // {
    //   key: "collaborator-beginner",
    //   title: "Colaborador Iniciante",
    //   description: "Deu pelo menos 5 dicas úteis para outros alunos.",
    //   imgsrc: './images/badges/collaborator/collaborator-beginner.png',
    //   cumulative: false,
    //   achieved: false
    // },
    //
    // {
    //   key: "collaborator-intermediate",
    //   title: "Colaborador Intermediário",
    //   description: "Deu pelo menos 10 dicas úteis para outros alunos.",
    //   imgsrc: './images/badges/collaborator/collaborator-intermediate.png',
    //   cumulative: false,
    //   achieved: false
    // },
    //
    // {
    //   key: "collaborator-advanced",
    //   title: "Colaborador Avançado",
    //   description: "Deu pelo menos 15 dicas úteis para outros alunos.",
    //   imgsrc: './images/badges/collaborator/collaborator-advanced.png',
    //   cumulative: false,
    //   achieved: false
    // },
    //
    // {
    //   key: "collaborator-expert",
    //   title: "Colaborador Expert",
    //   description: "Deu pelo menos 25 dicas úteis para outros alunos.",
    //   imgsrc: './images/badges/collaborator/collaborator-expert.png',
    //   cumulative: false,
    //   achieved: false
    // },
    //
    // {
    //   key: "collaborator-savant",
    //   title: "Colaborador Sagaz!",
    //   description: "Deu 10 dicas úteis, após ser classificado como \"Colaborador Expert\".",
    //   imgsrc: './images/badges/collaborator/collaborator-savant.png',
    //   cumulative: true, amount: 0,
    //   cumulative_criteria: "A cada 10 dicas úteis, acumula um badge deste e a contagem zera.",
    //   tooltip_description: "Só é possível ganhar este badge após ter sido classificado como Colaborador Expert.",
    //   achieved: false
    // },

    $scope.achievements.badges.special = [
      // Marathon special
      {
        key: "marathonist",
        title: 'Maratonista!',
        imgsrc: './images/badges/special/marathonist.png',
        description: "Resolveu uma questão na maratona inaugural.",
        achieved: false,
        cumulative: false
      },
      {
        key: "warm-marathonist",
        title: 'Maratonista Aquecido!',
        imgsrc: './images/badges/special/warm-marathonist.png',
        description: "Resolveu 5 questões na maratona inaugural.",
        achieved: false,
        cumulative: false
      },
      {
        key: "cheered-marathonist",
        title: 'Maratonista Animado!',
        imgsrc: './images/badges/special/cheered-marathonist.png',
        description: "Resolveu 10 questões na maratona inaugural.",
        achieved: false,
        cumulative: false
      },
      {
        key: 'ninja-marathonist',
        title: 'Maratonista Ninja!',
        imgsrc: './images/badges/special/ninja-marathonist.png',
        description: "Resolveu 15 questões na maratona inaugural.",
        achieved: false,
        cumulative: false
      },

      // Extra badges
    {
      key: 'life-meaning',
      title: 'Vivendo com Sentido!',
      description: "Submeteu uma questão no minuto 42.",
      cumulative: false,
      achieved: false,
      imgsrc: './images/badges/special/life-meaning.png'
    },
    {
      key: 'class-exerciser',
      title: 'Exercitador de Classe!',
      description: "Submeteu uma questão durante uma aula de laboratório da segunda-feira.",
      cumulative: true,
      achieved: false,
      cumulative_criteria: "Só acumula uma vez por semana.",
      imgsrc: './images/badges/special/class-exerciser.png'
    },
    {
      key: 'lunch-exerciser',
      title: 'Exercitador Alimentado!',
      description: "Resolveu uma questão entre as 13h00 e 13h59.",
      cumulative: false,
      achieved: false,
      cumulative_criteria: "Só acumula uma vez por dia.",
      imgsrc: './images/badges/special/lunch-exerciser.png'
    },
    {
      key: 'weekend-exerciser',
      title: 'Exercitador Atemporal!',
      description: "Resolveu um problema entre as 5h e 7h da manhã de um sábado ou um domingo.",
      cumulative: true,
      achieved: false,
      cumulative_criteria: "Só acumula uma vez por dia.",
      imgsrc: './images/badges/special/weekend-exerciser.png'
    },
    {
      key: 'friday-exerciser',
      title: 'Sexteiro!',
      description: "Fez uma questão entre as 20h e 21h59 de uma sexta-feira.",
      cumulative: true,
      achieved: false,
      cumulative_criteria: "Só pode ser obtido uma vez por semana.",
      imgsrc: './images/badges/special/friday-exerciser.png'
    },
    {
      key: 'early-exerciser',
      title: 'Exercitador Matutino!',
      description: "Fez um exercício entre as 5h e 7h de segunda a sexta.",
      cumulative: true,
      cumulative_criteria: "Só acumula uma vez por dia.",
      achieved: false,
      imgsrc: './images/badges/special/early-exerciser.png'
    }
  ];

    // Badges per challenge problem
    $scope.achievements.badges.challenge_problems = [
    {
    	key: "passagem_aerea",
    	title: "Viajante Aéreo!",
    	description: "Resolveu a questão 'Passagem Aérea'.",
    	imgsrc: "./images/badges/extras/passagem_aerea.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "caixa_preta",
    	title: "Investigador de Acidentes!",
    	description: "Resolveu a questão 'Caixa Preta'.",
    	imgsrc: "./images/badges/extras/caixa_preta.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "quem_acertou_menos",
    	title: "Certeiro!",
    	description: "Resolveu a questão 'Quem Acertou Menos'.",
    	imgsrc: "./images/badges/extras/quem_acertou_menos.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "segundo_maior_menor",
    	title: "M&m Secundário!",
    	description: "Resolveu a questão 'Segundo Maior Menor'.",
    	imgsrc: "./images/badges/extras/segundo_maior_menor.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "mastery_learning",
    	title: "Aprendiz Conquistador!",
    	description: "Resolveu a questão 'Mastery Learning'.",
    	imgsrc: "./images/badges/extras/mastery_learning.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "ataque_mais_positivo",
    	title: "Atacante Efetivo!",
    	description: "Resolveu a questão 'Ataque Mais Positivo'.",
    	imgsrc: "./images/badges/extras/ataque_mais_positivo.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "pesquisa_hoteis",
    	title: "Turista!",
    	description: "Resolveu a questão 'Pesquisa Hoteis'.",
    	imgsrc: "./images/badges/extras/pesquisa_hoteis.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "media_limite",
    	title: "Limitador Médio!",
    	description: "Resolveu a questão 'Media Limite'.",
    	imgsrc: "./images/badges/extras/media_limite.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "custo_inss",
    	title: "Contribuinte Aposentado!",
    	description: "Resolveu a questão 'Custo Inss'.",
    	imgsrc: "./images/badges/extras/custo_inss.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "parte_fracionaria",
    	title: "Fracionador por Partes!",
    	description: "Resolveu a questão 'Parte Fracionaria'.",
    	imgsrc: "./images/badges/extras/parte_fracionaria.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "converte_matricula",
    	title: "Conversor Matriculado!",
    	description: "Resolveu a questão 'Converte Matricula'.",
    	imgsrc: "./images/badges/extras/converte_matricula.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "perimetro_de_triangulo",
    	title: "Aprendiz de Pitágoras!",
    	description: "Resolveu a questão 'Perimetro De Triangulo'.",
    	imgsrc: "./images/badges/extras/perimetro_de_triangulo.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "media_dos_extremos",
    	title: "Extremista Aritmético!",
    	description: "Resolveu a questão 'Media Dos Extremos'.",
    	imgsrc: "./images/badges/extras/media_dos_extremos.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "conta_divisiveis",
    	title: "Conta Divisiveis!",
    	description: "Resolveu a questão 'Conta Divisiveis'.",
    	imgsrc: "./images/badges/extras/conta_divisiveis.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "pesquisa_voos",
    	title: "Aspirante a Aviador!",
    	description: "Resolveu a questão 'Pesquisa Voos'.",
    	imgsrc: "./images/badges/extras/pesquisa_voos.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "prof_equacoes",
    	title: "Equacionador Eloquente!",
    	description: "Resolveu a questão 'Prof Equacoes'.",
    	imgsrc: "./images/badges/extras/prof_equacoes.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "fahrenheit_celsius",
    	title: "Conversor Caliente!",
    	description: "Resolveu a questão 'Fahrenheit Celsius'.",
    	imgsrc: "./images/badges/extras/fahrenheit_celsius.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "tiro_ao_alvo_2",
    	title: "Na Mosca!",
    	description: "Resolveu a questão 'Tiro Ao Alvo 2'.",
    	imgsrc: "./images/badges/extras/tiro_ao_alvo_2.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "mais_velho",
    	title: "Experiente!",
    	description: "Resolveu a questão 'Mais Velho'.",
    	imgsrc: "./images/badges/extras/mais_velho.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "octal_decimal",
    	title: "Numerólogo!",
    	description: "Resolveu a questão 'Octal Decimal'.",
    	imgsrc: "./images/badges/extras/octal_decimal.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "k_moldura",
    	title: "Moldurador-K!",
    	description: "Resolveu a questão 'K Moldura'.",
    	imgsrc: "./images/badges/extras/k_moldura.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "hello_world",
    	title: "Programador Saudoso!",
    	description: "Resolveu a questão 'Hello World'.",
    	imgsrc: "./images/badges/extras/hello_world.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "qualidade",
    	title: "Testado pelo INMETRO!",
    	description: "Resolveu a questão 'Qualidade'.",
    	imgsrc: "./images/badges/extras/qualidade.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "mm_sort",
    	title: "Ordenador Profissional!",
    	description: "Resolveu a questão 'Mm Sort'.",
    	imgsrc: "./images/badges/extras/mm_sort.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "caixa_alta",
    	title: "Programador Gritante!",
    	description: "Resolveu a questão 'Caixa Alta'.",
    	imgsrc: "./images/badges/extras/caixa_alta.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "separa_duas_cores",
    	title: "Bicromático!",
    	description: "Resolveu a questão 'Separa Duas Cores'.",
    	imgsrc: "./images/badges/extras/separa_duas_cores.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "letras_coincidentes",
    	title: "Letrado!",
    	description: "Resolveu a questão 'Letras Coincidentes'.",
    	imgsrc: "./images/badges/extras/letras_coincidentes.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "transporte_modificado",
    	title: "Modificador de Transportes!",
    	description: "Resolveu a questão 'Transporte Modificado'.",
    	imgsrc: "./images/badges/extras/transporte_modificado.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "quadrado_na_circunferencia",
    	title: "Geometrista Nato!",
    	description: "Resolveu a questão 'Quadrado Na Circunferencia'.",
    	imgsrc: "./images/badges/extras/quadrado_na_circunferencia.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "descarta_coincidentes",
    	title: "Coincidentemente Descartado!",
    	description: "Resolveu a questão 'Descarta Coincidentes'.",
    	imgsrc: "./images/badges/extras/descarta_coincidentes.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "ordena_tipos",
    	title: "Ordenador Tipológico!",
    	description: "Resolveu a questão 'Ordena Tipos'.",
    	imgsrc: "./images/badges/extras/ordena_tipos.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "calculadora_de_medias",
    	title: "Mediador Calculista!",
    	description: "Resolveu a questão 'Calculadora De Medias'.",
    	imgsrc: "./images/badges/extras/calculadora_de_medias.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "verifica_operacoes_extrato",
    	title: "Operador Extrativista!",
    	description: "Resolveu a questão 'Verifica Operacoes Extrato'.",
    	imgsrc: "./images/badges/extras/verifica_operacoes_extrato.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "menor_dos_extremos",
    	title: "Extremista!",
    	description: "Resolveu a questão 'Menor Dos Extremos'.",
    	imgsrc: "./images/badges/extras/menor_dos_extremos.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "hospital_de_trauma",
    	title: "Doutor Anti-Trauma!",
    	description: "Resolveu a questão 'Hospital De Trauma'.",
    	imgsrc: "./images/badges/extras/hospital_de_trauma.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "dv_cpf",
    	title: "Verificador Pessoal!",
    	description: "Resolveu a questão 'Dígito Verificador CPF'.",
    	imgsrc: "./images/badges/extras/dv_cpf.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "conjunto_mais_elementos",
    	title: "Elementarista Máximo!",
    	description: "Resolveu a questão 'Conjunto Mais Elementos'.",
    	imgsrc: "./images/badges/extras/conjunto_mais_elementos.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "eh_triangulo",
    	title: "Verificador Triangular!",
    	description: "Resolveu a questão 'Eh Triangulo'.",
    	imgsrc: "./images/badges/extras/eh_triangulo.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "teorema_de_herao",
    	title: "Amigo de Herão!",
    	description: "Resolveu a questão 'Teorema De Herao'.",
    	imgsrc: "./images/badges/extras/teorema_de_herao.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "pi_por_aproximacoes",
    	title: "Aproximador Profissional!",
    	description: "Resolveu a questão de pi por aproximação.",
    	imgsrc: "./images/badges/extras/pi_por_aproximacoes.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "resumo_passagem",
    	title: "Viajante Preciso!",
    	description: "Resolveu a questão 'Resumo Passagem'.",
    	imgsrc: "./images/badges/extras/resumo_passagem.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "soma_divisores_do_primeiro",
    	title: "Somador de Divisores!",
    	description: "Resolveu a questão 'Soma Divisores Do Primeiro'.",
    	imgsrc: "./images/badges/extras/soma_divisores_do_primeiro.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "imprime_nota_fiscal",
    	title: "Impressor Fiscal!",
    	description: "Resolveu a questão 'Imprime Nota Fiscal'.",
    	imgsrc: "./images/badges/extras/imprime_nota_fiscal.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "square_code",
    	title: "Codificador Quadrático!",
    	description: "Resolveu a questão 'Square Code'.",
    	imgsrc: "./images/badges/extras/square_code.png",
    	cumulative: false,
    	achieved: false
    },

    {
    	key: "substitui_espaco_por_virgula",
    	title: "Substituto Pontual!",
    	description: "Resolveu a questão 'Substitui Espaco Por Virgula'.",
    	imgsrc: "./images/badges/extras/substitui_espaco_por_virgula.png",
    	cumulative: false,
    	achieved: false
    }

  ];

  // Handling login
  const provider = new firebase.auth.GoogleAuthProvider();

  // Reference to db
  const db = firebase.database();

  // Reference to students' db
  const ssdb = firebase.database().ref(`/students/`);

  // Reference to current student's db. Updated on login/logout.
  var sdb = null;

  // Reference to current user, if logged in when page loads.
  var user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(function(user) {
    updatePageState(user);
    updateUserInfoOnPage(user);
    checkUrlPhotoOnDatabase(user);
  });

  function updatePageState(user) {

    // Page is not loading anymore.
    $scope.$apply(function() {
      $scope.isLoadingPage = false;
    })

    // Checks if user is logged in.
    if(user) {
      $scope.$apply(function() {
        $scope.isLoggedIn = true;
        $scope.hasTriedLogin = true;
      })

      // Checks if user actually enrolled in the course.
      checkIfUserIsEnrolled(user);
    }
  }

  function checkIfUserIsEnrolled(user) {
    if (user) {
      // If user is not null, check if his/her email is enrolled.
      return db.ref().child('enrolled_students')
        .orderByChild('email')
        .equalTo(user.email)
        .once('value', snap => {
          if (snap.val()) {
            debug('User is enrolled.')
            $scope.$apply(function() {
              $scope.isEnrolledStudent = true;
            })
          } else {
            debug('User is NOT enrolled.')
            $scope.$apply(function() {
              $scope.isEnrolledStudent = false;
            })
            signUserOut();
          }
      }).then(() => {
        if ($scope.isEnrolledStudent === true) {

          messaging.requestPermission()
          .then(() => {
              debug("Permission granted!");
              return messaging.getToken();
          }).catch((error) => {
            debug("Tudo bem, caso queira receber notificações das conquistas, ative a opção de notificações no navegador. :)");
          }).then((token) => {
            debug("FCM token received: " + token);
            $scope.fcmToken = token;
            return new Promise((resolve, reject) => {
              let wait = setTimeout(function(token) {
                resolve(token);
              }, 10000);
            })
          }).then((token) => {
            return db.ref()
              .child(`/students/${firebase.auth().currentUser.uid}/fcmTokens`)
              .once('value', (snap) => {

                // Update values on db.
                var tokens = snap ? snap.val() : null;
                var fcmTokenSet;

                if(tokens != null &&
                  typeof tokens[Symbol.iterator] === 'function') {
                  // If true, tokens is iterable
                  fcmTokenSet = new Set(tokens)
                } else {
                  fcmTokenSet = new Set();
                  if (tokens) {
                    fcmTokenSet.add(tokens);
                  }
                };

                if($scope.fcmToken) {
                  // Only add new fcm token if one is granted
                  fcmTokenSet.add($scope.fcmToken);
                  var fcmTokenArray = Array.from(fcmTokenSet);
                  // debug(fcmTokenArray);
                  return firebase.database()
                  .ref(`/students/${firebase.auth().currentUser.uid}/fcmTokens`)
                  .set(fcmTokenArray);
                }
                // return "No tokens to add.";
              })
            })
        } // End of if ($scope.isEnrolledStudent === true)
      }).catch((error) => {
        console.error("There was an error registering token on database. :(");
      });
    } // end of if (user) {
  }

  /*
    Function that returns a string reference to the week of a date in the
    in the form: 'YYYYMMdd-YYYYMMdd'.
  */
  function getDateWeekLabel(date) {
    var previousMondayLabel = getDateLabel(getPreviousMonday(date));
    var nextSundayLabel = getDateLabel(getNextSundayLimit(date));
    return (previousMondayLabel + '_' + nextSundayLabel);
  }

  function getPreviousMonday(date) {
    if(!date) { date = new Date() }
    var day = date.getDay();
    var prevMonday;
    switch (day) {
      case 0:
        prevMonday = new Date(date.getTime() - (6 * 86400000));
        break;
      case 1:
        prevMonday = date;
        break;
      default:
        prevMonday = new Date(date.getTime() + ((1 - day) * 86400000));
        break;
    }
    prevMonday.setHours(0, 0, 0, 0);
    return prevMonday;
  }

  function getNextSundayLimit(date) {
    if(!date) { date = new Date() }
    var day = date.getDay();
    var nextSunday;
    const sundayCode = 0;
    if(day === sundayCode) {
        nextSunday = date;
    } else {
        nextSunday = new Date(date.getTime() + ((7 - day) * 86400000));
    }
    nextSunday = new Date(nextSunday);
    nextSunday.setHours(23, 59, 59, 999);
    return nextSunday;
  }

  function getDateLabel(date) {
    // Function that returns a string in the form 'YYYYMMdd'
    return date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2);
  }

  function updateUserInfoOnPage(user) {

    if (user) {
      // Already logged in.
      var name, email, photoUrl, uid;
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;  // The user's ID, unique to the Firebase project.
      // Do NOT use this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.

      debug(`Logged in as ${user.displayName} and the e-mail is ${user.email}.`);
      // debug(user)


      var weekLabel = getDateWeekLabel(new Date());

      var lbdb = db.ref(`leaderboards/${weekLabel}`);

      debug(`Creating reference on db to leaderboards/${weekLabel}`)

      lbdb.on('value', updateWeeklyLearderboard);

      sdb = db.ref(`students/${uid}`);

      sdb.on("value", updateContentBasedOnDb);

      $scope.$apply(function() {
        $scope.nameMenu = user.displayName;
        $scope.emailMenu = user.email;
        $scope.isLoggedIn = true;
        $scope.profilePicture = user.photoURL;
        firebaseUid = user.uid;
      })

    } else {
      debug("Not logged in.");

      if(sdb) {
        // If there's still a connection to db, unset listener
        sdb.off('value', updateContentBasedOnDb);
      }

      if(lbdb) {
        // If there's still a connection to db, unset listener
        lbdb.off('value', updateWeeklyLearderboard);
      }

      $scope.$apply(function() {
        $scope.isLoggedIn = false;
        $scope.nameMenu = "";
        $scope.emailMenu = "";
        $scope.profilePicture = null;
      })
    }
    return user;
  }

  function updateWeeklyLearderboard(snap) {
    var curLb = snap.val();
    if (curLb) {
      $scope.$apply(() => {
        $scope.placarSemana = curLb;
      });

      // labels, values, bgColor, pointRadius
      var extraConfig = {
        labels: Array(Object.keys(curLb).length).fill('.'),
        values: Object.values(curLb).sort((a,b) => { return a - b }),
        pointRadius: Array(Object.keys(curLb).length).fill(5),
      };

      var studentHash = md5(firebaseUid);
      var studentNumber = 0;

      for(var label in curLb) {
        if(label === studentHash) {
          studentNumber = curLb[label];
          break;
        }
      }

      var sCount = 0;
      var highest = 0;
      for(var i = extraConfig.values.length-1; i >= 0; i--) {
        if (extraConfig.values[i] > highest) highest = extraConfig.values[i];
        sCount++;
        if(extraConfig.values[i] === studentNumber) {
          extraConfig.labels[i] = "Você";
          extraConfig.pointRadius[i] = 15;
          break;
        }
      }

      highest += 10;
      extraConfig.MaxYValue = highest;
      var percentageStep = 100.0/extraConfig.values.length;

      updateLeaderboardChart(extraConfig);

      var nTotal = Object.keys(curLb).length;
      var porcentagem = sCount*percentageStep;

      // debug(`porcentagem: ${porcentagem}`)

      $scope.$apply(() => {

        $scope.porcentagem = porcentagem < 1 ? 1 : Math.round(porcentagem*100)/100;

        debug(`porcentagem: ${porcentagem}`)

        if(porcentagem <= 5 || sCount === 1)
          $scope.categoria = "Diamante"
        else if (porcentagem <= 20 || sCount === 2)
          $scope.categoria = "Platina"
        else if (porcentagem <= 35 || sCount === 3)
          $scope.categoria = "Ouro"
        else if (porcentagem <= 50 || sCount === 4)
          $scope.categoria = "Prata"
        else if (porcentagem <= 75 || sCount === 5)
          $scope.categoria = "Bronze"
        else
          $scope.categoria = "N/A"
      });
    }
  }

  /*
    Function that updates main content on page based on login.
    @param snap: a snapshot of current user's info on database.
  */
  function updateContentBasedOnDb(snap) {

    // Recovering student's data.
    var student = snap.val();

    // debug(student)

    if (student) {
      $scope.$apply(function() {
        $scope.achievements.statistics = {
          current_consecutiveActiveDays: student.daily_statistics.active_days_current,
          consecutiveActiveDays: student.daily_statistics.active_days_record,

          current_maxProbSolDay: student.daily_statistics.daily_solved_current,
          maxProbSolDay: student.daily_statistics.daily_solved_record,

          current_maxProbSolWeek: student.weekly_statistics.weekly_solved_current,
          maxProbSolWeek: student.weekly_statistics.weekly_solved_record,

          current_maxUsefulHintsWeek: student.weekly_statistics.weekly_hints_current,
          maxUsefulHintsWeek: student.weekly_statistics.weekly_hints_record,

          current_maxUsefulHints: student.global_statistics.global_hints_record,
          maxUsefulHints: "-"
        };

        // Requesting badges' achievements from db
        $scope.achievements.numberOfBadges = 0;

        var nTypesOfBadges = Object.keys($scope.achievements.badges).length

        for (var badgeType in $scope.achievements.badges) {
          // For each kind of badge, check whether it was achieved

          // Number of badges of that type
          var l = $scope.achievements.badges[badgeType].length

          for (var i = 0; i < l; i++) {
            // Iterate over this type of badges to check achievement
            var currentBadgeKey = $scope.achievements.badges[badgeType][i].key;
            if (student.badges.hasOwnProperty(currentBadgeKey)) {
              var achieved = student.badges[currentBadgeKey].achieved;
              var amount = student.badges[currentBadgeKey].amount;
            } else {
              achieved = false;
              amount = 0;
            }

            $scope.achievements.badges[badgeType][i].achieved = achieved;
            $scope.achievements.badges[badgeType][i].amount = amount;

            if (achieved) {
              $scope.achievements.numberOfBadges += 1;
            }
          }
        } // for (var badgeType in $scope.achievements.badges) {

        // Now, this is me updating achieved and notAchieved lists of badges
        $scope.achievedBadges = {};
        $scope.notAchievedBadges = {};

        for (var badgeType in $scope.achievements.badges) {
          // For each kind of badge, check whether it was achieved

          // Number of badges of that type
          var l = $scope.achievements.badges[badgeType].length

          $scope.achievedBadges[badgeType] = [];
          $scope.notAchievedBadges[badgeType] = [];

          for (var i = 0; i < l; i++) {
            if ($scope.achievements.badges[badgeType][i].achieved) {
              $scope.achievedBadges[badgeType]
                .push($scope.achievements.badges[badgeType][i])
            } else {
              $scope.notAchievedBadges[badgeType]
                .push($scope.achievements.badges[badgeType][i])
            }
          }
        }

      })
    }
  }

  function checkUrlPhotoOnDatabase(user) {
    // TODO
  }

  function loginPopUp() {

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      debug('successfully logged as "' + user.displayName + '".');
    }).catch(function(error) {
      debug(`There was an error when logging in with '${error.email}'. Code ${error.code}. Credential type: ${error.credential}. Message: ${error.message}.` );
      console.error(`Houve um erro na tentativa de login! Favor tentar novamente. :)`);
    });
  }

  function signUserOut() {
    return db.ref()
      .child(`/students/${firebase.auth().currentUser.uid}/fcmTokens`)
      .once('value', (snap) => {

        // Update values on db.
        var tokens = snap ? snap.val() : null;
        var fcmTokenSet;

        if(tokens != null &&
          typeof tokens[Symbol.iterator] === 'function') {
          // If true, tokens is iterable
          fcmTokenSet = new Set(tokens)
        } else {
          fcmTokenSet = new Set();
          if (tokens) {
            fcmTokenSet.add(tokens);
          }
        };
        // debug("Got this set of tokens:");
        // debug(fcmTokenSet);

        if($scope.fcmToken) {
          // Only add new fcm token if one is granted
          fcmTokenSet.delete($scope.fcmToken);
          var fcmTokenArray = Array.from(fcmTokenSet);
          // debug(fcmTokenArray);
          return firebase.database()
          .ref(`/students/${firebase.auth().currentUser.uid}/fcmTokens`)
          .set(fcmTokenArray);
        }
        // return "No tokens to add.";
      }).then(() => {
        return firebase.auth().signOut();
      }).then(() => {
        // Sign-out successful.
        debug("Signing out...");
        updateUserInfoOnPage(firebase.auth().currentUser);
        updatePageState(firebase.auth().currentUser);
      }).catch(function(error) {
        // An error happened.
        debug("There's was an error on logout.");
      });
  }

  $scope.logoutPopUp = signUserOut;
  $scope.loginPopUp = loginPopUp;
  $scope.updateUserInfoOnPage = updateUserInfoOnPage;
  $scope.porcentagem = 0;
  $scope.categoria = "N/A"
  $scope.fcmToken = null;
  var firebaseUid = null;

  // Handling messaging
  const messaging = firebase.messaging();

  // Begin of leaderboard graph
  window.onload = updateLeaderboardChart;

  function updateLeaderboardChart(extraConfig) {
    lbChartConfig = {
        type: 'line',
        data: {
          labels: extraConfig.labels || [],
          datasets: [{
            label: 'Questões resolvidas na semana',
            data: extraConfig.values || [],
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.red,
            fill: false,
            borderDash: [3, 3],
            pointRadius: extraConfig.pointRadius || 5,
            pointHoverRadius: 10,
            lineTension: 0
          }]
        },
        options: {
          responsive: true,
          legend: {
            display: false,
            position: 'bottom',
          },
          hover: {
            mode: 'index'
          },
          scales: {
            xAxes: [{
              ticks: {beginAtZero: true, max:20},
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Alunos'
              }
            }],
            yAxes: [{
              ticks: {beginAtZero: true, max:extraConfig.MaxYValue},
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Questões Resolvidas'
              }
            }]
          },
          title: {
            display: true,
            text: 'Ranking Semanal de Questões Resolvidas'
          }
        }
      };
      var ctx = document.getElementById('canvas')
                        .getContext('2d');
      if(window.myLine) window.myLine.destroy();
      window.myLine = new Chart(ctx, lbChartConfig);
      debug(lbChartConfig)
  };
  // End of leaderboard graph

  // messaging.onMessage((payload) => {
  //   console.log("I received a notification, but since I'm already on the page, the onMessage method was called with this payload: ", payload);
  // });

  // Badge types
  $scope.badgeTypeDescriptors = {
    daily: "Badges Diários",
    continuous_exerciser: "Badges por Continuidade",
    competitor: "Badges de Competição",
    special: "Badges Especiais",
    challenge_problems: "Badges de Questões-Desafios"
  }

  $scope.hasAnyBadgeOfType = function hasAnyBadgeOfType(type){
    for(var badge in $scope.achievements.badges[type]) {
      if ($scope.achievements.badges[type][badge].achieved) return true;
    }
    return false;
  }

  $scope.hasMissingBadgeOfType = function hasAnyBadgeOfType(type){
    for(var badge in $scope.achievements.badges[type]) {
      if (!$scope.achievements.badges[type][badge].achieved) return true;
    }
    return false;
  }

  $scope.isMarathonTime = function isMarathonTime() {
    let rightNowInCG = new Date();
    const beginHour = 0
    let marathonBegin = new Date(2018, 9, 29, beginHour, 0, 0, 0)
    const hourDuration = 23
    let marathonEnd = new Date(2018, 9, 29, beginHour + hourDuration, 59, 59, 999)
    if (rightNowInCG >= marathonBegin && rightNowInCG < marathonEnd) return true
    return false
  }

});

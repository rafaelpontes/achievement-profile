/*
This file is part of "Achievement Profile".

"Achievement Profile" is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

"Achievement Profile" is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with "Achievement Profile".  If not, see <https://www.gnu.org/licenses/>
*/

// Cloud Functions for main routines.
// Add these functions to your firebase project, but modify http keys accordingly
// @author Rafael Pontes

'use strict';

const md5 = require("./md5.min.js")

const TZOffset = -3; // JP Offset

// Debug flag
const DEBUG = true;

// Import for Firebase Cloud Functions
const functions = require('firebase-functions');

/*
  Extra imports
*/
const crypto = require('crypto');

/*
  =================================
  Initializing primary Project
  =================================
*/
// Import Admin SDK to manipulate project resources
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase) // initializing app

// Reference to main project db.
const dbRef = admin.database().ref();

// PubSub for this project
const PubSub = require('@google-cloud/pubsub');
const pubsub = new PubSub({
   projectId: 'tst-badges',
   keyFilename: 'path/to/accountKey.json'
 });

// Badges publisher
const newBadgeTopic = pubsub.topic('new-badge-achieved');
const newBadgePublisher = newBadgeTopic.publisher();

// LeaderboardUpdate publisher
const leaderboardUpdateTopic = pubsub.topic('leaderboard-update-trigger');
const leaderboardUpdatePublisher = leaderboardUpdateTopic.publisher();

// Badges Map with keys associated with titles.

var badgesMap = {

  'daily-exerciser':
   { title: 'Exercitador Diário',
     image: './images/badges/24h/24h.png' },
  'daily-exerciser-copper':
   { title: 'Exercitador Diário de Bronze',
     image: './images/badges/24h/24h-copper.png' },
  'daily-exerciser-silver':
   { title: 'Exercitador Diário de Prata',
     image: './images/badges/24h/24h-silver.png' },
  'daily-exerciser-gold':
   { title: 'Exercitador Diário de Ouro',
     image: './images/badges/24h/24h-gold.png' },
  'daily-exerciser-diamond':
   { title: 'Exercitador Diário Diamante',
     image: './images/badges/24h/24h-diamond.png' },
  'exerciser-247':
   { title: 'Exercitador 24/7',
     image: './images/badges/247/247.png' },
  'exerciser-30':
   { title: 'Exercitador Whole 30',
     image: './images/badges/30/30.png' },
  persistent:
   { title: 'Programador Persistente',
     image: './images/badges/persistent/persistent.png' },
  'persistent-copper':
   { title: 'Programador Persistente de Bronze',
     image: './images/badges/persistent/persistent-copper.png' },
  'persistent-silver':
   { title: 'Programador Persistente de Prata',
     image: './images/badges/persistent/persistent-silver.png' },
  'persistent-gold':
   { title: 'Programador Persistente de Ouro',
     image: './images/badges/persistent/persistent-gold.png' },
  'persistent-diamond':
   { title: 'Programador Persistente Diamante',
     image: './images/badges/persistent/persistent-diamond.png' },
  'persistent-savant':
   { title: 'Programador Persistente Sagaz!',
     image: './images/badges/persistent/persistent-savant.png' },
  'competitor-copper':
   { title: 'Competidor de Bronze',
     image: './images/badges/competitor/competitor-copper.png' },
  'competitor-silver':
   { title: 'Competidor de Prata',
     image: './images/badges/competitor/competitor-silver.png' },
  'competitor-gold':
   { title: 'Competidor de Ouro',
     image: './images/badges/competitor/competitor-gold.png' },
  'competitor-platinum':
   { title: 'Competidor de Platina',
     image: './images/badges/competitor/competitor-platinum.png' },
  'competitor-diamond':
   { title: 'Competidor Diamante',
     image: './images/badges/competitor/competitor-diamond.png' },
  'unit-1':
   { title: 'Unidade 1 Concluída!',
     image: './images/badges/units/unit-1.png' },
  'unit-2':
   { title: 'Unidade 2 Concluída!',
     image: './images/badges/units/unit-2.png' },
  'unit-3':
   { title: 'Unidade 3 Concluída!',
     image: './images/badges/units/unit-3.png' },
  'unit-4':
   { title: 'Unidade 4 Concluída!',
     image: './images/badges/units/unit-4.png' },
  'unit-5':
   { title: 'Unidade 5 Concluída!',
     image: './images/badges/units/unit-5.png' },
  'unit-6':
   { title: 'Unidade 6 Concluída!',
     image: './images/badges/units/unit-6.png' },
  'unit-7':
   { title: 'Unidade 7 Concluída!',
     image: './images/badges/units/unit-7.png' },
  'unit-8':
   { title: 'Unidade 8 Concluída!',
     image: './images/badges/units/unit-8.png' },
  'unit-9':
   { title: 'Unidade 9 Concluída!',
     image: './images/badges/units/unit-9.png' },
  'unit-10':
   { title: 'Unidade 10 Concluída!',
     image: './images/badges/units/unit-10.png' },
  collaborator:
   { title: 'Colaborador',
     image: './images/badges/collaborator/collaborator.png' },
  'collaborator-beginner':
   { title: 'Colaborador Iniciante',
     image: './images/badges/collaborator/collaborator-beginner.png' },
  'collaborator-intermediate':
   { title: 'Colaborador Intermediário',
     image: './images/badges/collaborator/collaborator-intermediate.png' },
  'collaborator-advanced':
   { title: 'Colaborador Avançado',
     image: './images/badges/collaborator/collaborator-advanced.png' },
  'collaborator-expert':
   { title: 'Colaborador Expert',
     image: './images/badges/collaborator/collaborator-expert.png' },
  'collaborator-savant':
   { title: 'Colaborador Sagaz!',
     image: './images/badges/collaborator/collaborator-savant.png' },
  'professional-approximator':
   { title: 'Aproximador Profissional!',
     image: './images/badges/extras/pi/pi-aprox.png' },
  'extra-badge':
   { title: 'Badge Extra!',
     image: './images/badges/extras/pi/pi-aprox.png' },
  // challenge_problems
  passagem_aerea:
   { title: 'Viajante Aéreo!',
     image: './images/badges/extras/passagem_aerea.png' },
  caixa_preta:
   { title: 'Investigador de Acidentes!',
     image: './images/badges/extras/caixa_preta.png' },
  quem_acertou_menos:
   { title: 'Certeiro!',
     image: './images/badges/extras/quem_acertou_menos.png' },
  segundo_maior_menor:
   { title: 'M&m Secundário!',
     image: './images/badges/extras/segundo_maior_menor.png' },
  mastery_learning:
   { title: 'Aprendiz Conquistador!',
     image: './images/badges/extras/mastery_learning.png' },
  ataque_mais_positivo:
   { title: 'Atacante Efetivo!',
     image: './images/badges/extras/ataque_mais_positivo.png' },
  pesquisa_hoteis:
   { title: 'Turista!',
     image: './images/badges/extras/pesquisa_hoteis.png' },
  media_limite:
   { title: 'Limitador Médio!',
     image: './images/badges/extras/media_limite.png' },
  custo_inss:
   { title: 'Contribuinte Aposentado!',
     image: './images/badges/extras/custo_inss.png' },
  parte_fracionaria:
   { title: 'Fracionador por Partes!',
     image: './images/badges/extras/parte_fracionaria.png' },
  converte_matricula:
   { title: 'Conversor Matriculado!',
     image: './images/badges/extras/converte_matricula.png' },
  perimetro_de_triangulo:
   { title: 'Aprendiz de Pitágoras!',
     image: './images/badges/extras/perimetro_de_triangulo.png' },
  media_dos_extremos:
   { title: 'Extremista Aritmético!',
     image: './images/badges/extras/media_dos_extremos.png' },
  conta_divisiveis:
   { title: 'Conta Divisiveis!',
     image: './images/badges/extras/conta_divisiveis.png' },
  pesquisa_voos:
   { title: 'Aspirante a Aviador!',
     image: './images/badges/extras/pesquisa_voos.png' },
  prof_equacoes:
   { title: 'Equacionador Eloquente!',
     image: './images/badges/extras/prof_equacoes.png' },
  fahrenheit_celsius:
   { title: 'Conversor Caliente!',
     image: './images/badges/extras/fahrenheit_celsius.png' },
  tiro_ao_alvo_2:
   { title: 'Na Mosca!',
     image: './images/badges/extras/tiro_ao_alvo_2.png' },
  mais_velho:
   { title: 'Experiente!',
     image: './images/badges/extras/mais_velho.png' },
  octal_decimal:
   { title: 'Numerólogo!',
     image: './images/badges/extras/octal_decimal.png' },
  k_moldura:
   { title: 'Moldurador-K!',
     image: './images/badges/extras/k_moldura.png' },
  hello_world:
   { title: 'Programador Saudoso!',
     image: './images/badges/extras/hello_world.png' },
  qualidade:
   { title: 'Testado pelo INMETRO!',
     image: './images/badges/extras/qualidade.png' },
  mm_sort:
   { title: 'Ordenador Profissional!',
     image: './images/badges/extras/mm_sort.png' },
  caixa_alta:
   { title: 'Programador Gritante!',
     image: './images/badges/extras/caixa_alta.png' },
  separa_duas_cores:
   { title: 'Bicromático!',
     image: './images/badges/extras/separa_duas_cores.png' },
  letras_coincidentes:
   { title: 'Letrado!',
     image: './images/badges/extras/letras_coincidentes.png' },
  transporte_modificado:
   { title: 'Modificador de Transportes!',
     image: './images/badges/extras/transporte_modificado.png' },
  quadrado_na_circunferencia:
   { title: 'Geometrista Nato!',
     image: './images/badges/extras/quadrado_na_circunferencia.png' },
  descarta_coincidentes:
   { title: 'Coincidentemente Descartado!',
     image: './images/badges/extras/descarta_coincidentes.png' },
  ordena_tipos:
   { title: 'Ordenador Tipológico!',
     image: './images/badges/extras/ordena_tipos.png' },
  calculadora_de_medias:
   { title: 'Mediador Calculista!',
     image: './images/badges/extras/calculadora_de_medias.png' },
  verifica_operacoes_extrato:
   { title: 'Operador Extrativista!',
     image: './images/badges/extras/verifica_operacoes_extrato.png' },
  menor_dos_extremos:
   { title: 'Extremista!',
     image: './images/badges/extras/menor_dos_extremos.png' },
  hospital_de_trauma:
   { title: 'Doutor Anti-Trauma!',
     image: './images/badges/extras/hospital_de_trauma.png' },
  dv_cpf:
   { title: 'Verificador Pessoal!',
     image: './images/badges/extras/dv_cpf.png' },
  conjunto_mais_elementos:
   { title: 'Elementarista Máximo!',
     image: './images/badges/extras/conjunto_mais_elementos.png' },
  eh_triangulo:
   { title: 'Verificador Triangular!',
     image: './images/badges/extras/eh_triangulo.png' },
  teorema_de_herao:
   { title: 'Amigo de Herão!',
     image: './images/badges/extras/teorema_de_herao.png' },
  pi_por_aproximacoes:
   { title: 'Aproximador Profissional!',
     image: './images/badges/extras/pi_por_aproximacoes.png' },
  resumo_passagem:
   { title: 'Viajante Preciso!',
     image: './images/badges/extras/resumo_passagem.png' },
  soma_divisores_do_primeiro:
   { title: 'Somador de Divisores!',
     image: './images/badges/extras/soma_divisores_do_primeiro.png' },
  imprime_nota_fiscal:
   { title: 'Impressor Fiscal!',
     image: './images/badges/extras/imprime_nota_fiscal.png' },
  square_code:
   { title: 'Codificador Quadrático!',
     image: './images/badges/extras/square_code.png' },
  substitui_espaco_por_virgula:
   { title: 'Substituto Pontual!',
     image: './images/badges/extras/substitui_espaco_por_virgula.png' },

     // Marathon Competitor
    "copper-marathonist":
    { title: 'Maratonista de Bronze!',
    image: './images/badges/special/copper-marathonist.png' },
    "silver-marathonist":
    { title: 'Maratonista de Prata!',
    image: './images/badges/special/silver-marathonist.png' },
    "gold-marathonist":
    { title: 'Maratonista de Ouro!',
    image: './images/badges/special/gold-marathonist.png' },
    "platinum-marathonist":
    { title: 'Maratonista de Platina!',
    image: './images/badges/special/platinum-marathonist.png' },
    "diamond-marathonist":
    { title: 'Maratonista de Diamante!',
    image: './images/badges/special/diamond-marathonist.png' },

     // Marathon special
     "marathonist":
     { title: 'Maratonista!',
     image: './images/badges/special/marathonist.png' },
     "warm-marathonist":
     { title: 'Maratonista Aquecido!',
     image: './images/badges/special/warm-marathonist.png' },
     'cheered-marathonist':
     { title: 'Maratonista Aquecido!',
     image: './images/badges/special/cheered-marathonist.png' },
     'ninja-marathonist':
     { title: 'Maratonista Ninja!',
      image: './images/badges/special/ninja-marathonist.png' },

     // Extra badges
     'life-meaning':
      { title: 'Vivendo com Sentido!',
      image: './images/badges/special/life-meaning.png' },
      'class-exerciser':
      { title: 'Exercitador de Classe!',
      image: './images/badges/special/class-exerciser.png' },
      'lunch-exerciser':
      { title: 'Exercitador Alimentado!',
      image: './images/badges/special/lunch-exerciser.png' },
      'weekend-exerciser':
      { title: 'Exercitador Atemporal!',
      image: './images/badges/special/weekend-exerciser.png' },
      'friday-exerciser':
      { title: 'Sexteiro!',
      image: './images/badges/special/friday-exerciser.png' },
      'early-exerciser':
      { title: 'Exercitador Matutino!',
      image: './images/badges/special/early-exerciser.png' }
};

/*
  =====================================
  Begin Cloud Functions Implementations
  =====================================
*/

/*
  Function that stores user info on a database,
  upon First Login, and calculates all due badges,
  based on past solved problems by this student.
  TODO: calculate past badges before user creation. (OK, but test!)
        (DONE with temporary user record)
*/
exports.onFirstLogin = functions.auth.user().onCreate(user => {

  debug("Showing all properties of event received from onFirstLogin:");
  var pv; // Property Value
  for (var pn in user) { // Property Name
    pv = user[pn];
    debug(`pn: ${pn} has this pv: ${pv}`)
  }
  return checkIfUserIsEnrolledAndReact(user)
        .then(() => {
          return updateWeeklyLeaderboard();
        });

  function checkIfUserIsEnrolledAndReact(user) {
    const email = user.email;
    if (email) {
      // If user is not null, check if his/her email is enrolled.
      var userData = gatherUserDataFromEvent(user);
      return dbRef.child('enrolled_students')
        .orderByChild('email')
        .equalTo(email)
        .once('value', snap => {
          if (snap.val()) {
            debug(`User with email ${email} is enrolled.`);
            // Checking for temporary node.
            return checkTempNodeAndReact(userData);
          } else {
            debug(`User with email ${userData.email} is NOT enrolled.`);
            return registerAlienAttemptedAlogins(userData);
          }
      });
    } else {
      // No user was received from creation event... Weird...
      debug("No user received from creation event. Weird...");
      return new Promise((resolve, reject) => {
        resolve('No user received from creation event.')
      });
    }
  }

  function gatherUserDataFromEvent(event) {
    return {
      name: event.displayName || 'N/A',
      email: event.email,
      creationTime: event.metadata.creationTime || "N/A",
      photoUrl: event.photoURL || '',
      firebaseUid: event.uid || 'N/A'
    };
  }

  function checkTempNodeAndReact(userData) {
    return dbRef.child('temp_students')
      .orderByChild('email')
      .equalTo(userData.email)
      .once('value', snap => {
        if (snap.val()) {
          // If there was a temp node for user, move it to default node.
          debug(`Temporary node had been created for ${userData.email}. Moving it to default node.`);
          return moveTempToDefaultNode(userData);
        } else {
          // Else, create a new student from scratch for this user.
          var student = createStudentWithData(userData);
          debug(`Creating a new student node for ${student.email}.`);
          return storeStudentOnDb(student);
        }
    });
  }

  function moveTempToDefaultNode(userData) {
    var nodeHash = crypto
                      .createHash('md5').update(userData.email).digest('hex');
    return dbRef.child(`temp_students/${nodeHash}`).once('value', snap => {
      if(snap.val()) {
        var student = snap.val();

        debug("stringify do temp student que está sendo migrado:")
        debug(JSON.stringify(student))

        // Updating temporary node with userData info.
        student.name = userData.name || "N/A";
        student.email = userData.email;
        student.creationTime = userData.creationTime || "N/A";
        student.photoUrl = userData.photoUrl || '';
        student.firebaseUid = userData.firebaseUid || "N/A";

        const newStudentRef = dbRef.child(`students/${student.firebaseUid}`);
        return newStudentRef.set(student, (error) => {
          if (!error) { snap.getRef().remove(); }
          else {
            if(typeof(console) !== 'undefined' && console.error) {
              console.error(error);
            }
          }
        }).then(() => {
            debug(`Student with email ${student.email} created successfully.`);
            return student;
          });
      } else {
        debug("Could not retrieve temporary node. Something went wrong.");
        return 'error!';
      }
    });
  }

  function createStudentWithData(userData) {
    // Function that creates a new student with no records whatsoever.
    var student = {
      name: userData.name || "N/A",
      email: userData.email,
      creationTime: userData.creationTime || "N/A",
      photoUrl: userData.photoUrl || "N/A",
      firebaseUid: userData.firebaseUid || "N/A",
      daily_statistics: {
        active_days_current:0,
        active_days_record:0,
        daily_solved_current: 0,
        daily_solved_record: 0,
        last_daily_timestamp: 0
      },
      weekly_statistics: {
        weekly_solved_current: 0,
        weekly_solved_record: 0,
        weekly_hints_record: 0,
        weekly_hints_current: 0,
        last_weekly_timestamp: 0
      },
      monthly_statistics: {
        consecutive_days_active: 0,
        last_monthly_timestamp: 0
      },
      global_statistics: {
        global_hints_record: 0,
        solved_problems_count: 0,
        last_global_timestamp: 0
      },
      badges: generateBadgesObject(),
      solved_problems: null
    };

    return student;
  }

  function storeStudentOnDb(student) {
    const newStudentRef = dbRef.child(`students/${student.firebaseUid}`);
    return newStudentRef.set(student).then(() => {
        debug(`Student with email ${student.email} created successfully.`);
        return student;
      });
  }

  // This function registers login attempts from users who are not students
  function registerAlienAttemptedAlogins(userData) {

    const alienUserRef = dbRef.child(`/alien_logins`);

    var p1 = alienUserRef.push(userData).then(() => {
        debug(`Alien user with email ${userData.email}, named ${userData.name}, atempted to login on platform.`);
        return userData;
    }).catch((error) => {
      debug("Error registering alien user:", error);
    });

    var p2 = admin.auth().deleteUser(userData.firebaseUid)
    .then(() => {
      debug(`Successfully deleted alien user (${userData.email}).`);
      return userData;
    })
    .catch((error) => {
      debug("Error deleting user:", error);
    });

    return Promise.all([p1, p2]);

    }
}); // End of onFirstLogin

exports.onTimeRequestByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;
  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage: {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  let curServerTime = new Date();
  let returnString = 'curServerTime: ' + curServerTime + "\r\n";
  returnString += 'getTime(): ' + curServerTime.getTime() + "\r\n";
  returnString += 'curServerTime.getTimezoneOffset(): ' + curServerTime.getTimezoneOffset() + "\r\n";
  const CGOffset = -3;
  curServerTime = new Date(curServerTime.getTime() + (1000 * 60 * 60 * CGOffset))
  returnString += 'after CGOffset: ' + curServerTime + "\r\n";
  returnString += 'getTime(): ' + curServerTime.getTime() + "\r\n";

  res.send(returnString);
  return 'done!';

}); // End of onTimeRequestByHttps

/*
  Function that registers a problem solved for a given student based on JSON
  received on an https request.
*/
exports.onSubmissionReceivedByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;
  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage: {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  // Included to mitigate problem with datetime from Python.
  const rightNow = new Date();
  const threshold1970 = new Date("1971-11-11T20:50:01.462Z");
  const thresholdThisYear = new Date("2018-01-01T20:50:01.462Z");
  var receivedTime;

  return saveEvent(req.body)
  .then(() => {
    res.send('Object ' + JSON.stringify(req.body) + ' was received successfully.\n');
    return req.body;
  }).catch((error) => {
    res.status(400).send('Error. Syxntax from object received did not match the one expected.');
    console.error(error);
  })

  function saveEvent(obj) {
    var temp = {};
    if (obj.hasOwnProperty("type")){
      switch (obj.type) {
        case 'problem_solved':
          temp['key'] = obj.key;
          temp['student'] = obj.student;

          // This check was necessary because of Python datetime problem.
          receivedTime = new Date(obj[i].time);
          if (receivedTime < threshold1970)
            temp['timestamp'] = obj[i].time * 1000;
          else if (receivedTime < thresholdThisYear)
            temp['timestamp'] = rightNow.getTime();
          else
            temp['timestamp'] = obj[i].time;

          if (obj.hasOwnProperty("aid"))
            temp['aid'] = obj.aid;
          debug("Pushing this temp obj into events problems_solved branch:")
          debug(JSON.stringify(temp))
          return dbRef.child('events/problems_solved').push(temp);
        default:
          debug("Type of event not identified.");
          break;
      }
      return Promise.resolve(obj);
    } else {
      if (Array.isArray(obj)) {
        const DELAY_DUPLICATES = 2000; // In milisecs
        var objArray = [];
        var promises = [];
        var students = new Set();
        var studentsDelays = {};
        for (var i = 0; i < obj.length; i++) {
          var curStudent = obj[i].student;
          temp = {};
          temp['key'] = obj[i].key;
          temp['student'] = curStudent;

          // This check was necessary because of Python datetime problem.
          receivedTime = new Date(obj[i].time);
          if (receivedTime < threshold1970)
            temp['timestamp'] = obj[i].time * 1000;
          else if (receivedTime < thresholdThisYear)
            temp['timestamp'] = rightNow.getTime();
          else
            temp['timestamp'] = obj[i].time;

          temp['aid'] = obj[i].aid;
          objArray.push(temp);

          // Check if student was in current lot
          if (students.has(curStudent)) {
            // If s/he was, you have to add a delay in the next push action.

            // This is how many milisecs we have to wait after last time we
            // added an entry for this student on the db.
            studentsDelays[curStudent] += DELAY_DUPLICATES;
            promises.push(new Promise((resolve, reject) => {
              let wait = setTimeout(function(curObj) {
                promises.push(
                  dbRef.child('events/problems_solved').push(curObj));
                debug(`${JSON.stringify(curObj)} was pushed into DB.`);
                resolve(`${curObj} was pushed into DB.`);
              }.bind(this, objArray[i]), studentsDelays[curStudent]);
            }));
          } else {
            // If this is the first of this student in the lot, we do this:

            // Initialize delay for possible duplicates of this student.
            studentsDelays[curStudent] = 0;

            // Register this student happened once.
            students.add(curStudent);

            // Push data to db.
            promises.push(
              dbRef.child('events/problems_solved').push(objArray[i]));
            debug(`${JSON.stringify(objArray[i])} was pushed into DB.`);
          }
        }
        return Promise.all(promises);
      }
    }
    return "Nothing to do...";
  }

}); // End of exports.onSubmissionReceived

/*
  Function that resets daily statistics counters.
*/
exports.onDailyStatisticsResetByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;
  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage: {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  var students = null;

  return dbRef
    .child('students')
    .once("value", (snap) => {
      students = snap.val()
      if (students) {
        const yesterday = new Date(Date.now() - 46400000);
        const yesterdayLabel = getDateLabel(yesterday);

        for (var fuid in students) {
          // Iterate over each student and reset daily counter
          students[fuid].daily_statistics.daily_solved_current = 0;

          if (students[fuid]
                .daily_statistics
                .hasOwnProperty('daily_history')) {
              // If student has daily_history property, check if he was active yesterday
              if (!students[fuid]
                    .daily_statistics
                    .daily_history
                    .hasOwnProperty(yesterdayLabel)) {
                      students[fuid].daily_statistics
                      .active_days_current = 0;
              }
            } else {
              students[fuid].daily_statistics
              .active_days_current = 0;
            }
        }
      }
      return students;
    }).then(() => {
      var studentsUpdateObject = {};
      debug("Salvando este objeto de students com update:");
      debug(JSON.stringify(students))
      studentsUpdateObject[`students`] = students
      return dbRef.update(studentsUpdateObject);
    }).then(() => {
      const stats = 'Daily stats were reset successfully.';
      res.send(stats);
      debug(stats);
      return stats;
    }).catch((error) => {
    res.status(422).send('Error. Unexpected entity.');
    console.error(error);
  })

}); // End of exports.onDailyStatisticsResetByHttps

/*
  Function that resets weekly statistics counters.
*/
exports.onWeeklyStatisticsResetByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;
  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage: {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  var students = null;

  return dbRef
    .child('students')
    .once("value", (snap) => {
      students = snap.val()
      if (students) {
        for (var fuid in students) {
          // Iterate over each student and reset daily counter
          students[fuid].weekly_statistics.weekly_solved_current = 0;
        }
      }
      return students;
    }).then(() => {
      var studentsUpdateObject = {};
      studentsUpdateObject[`students`] = students
      return dbRef.update(studentsUpdateObject);
    }).then(() => {
      const stats = 'Weekly stats were reset successfully.';
      res.send(stats);
      return stats;
    }).catch((error) => {
    res.status(422).send('Error. Unexpected entity.');
    console.error(error);
  })
}); // End of exports.onWeeklyStatisticsResetByHttps

exports.onLeaderboardPublished = functions.pubsub.topic('leaderboard-update-trigger').onPublish((message) => {

  // This object will hold students info
  var students;

  // This object will hold the leaderboard updates with old leaderboards
  var weekLeaderboard = {};

  // Formatted week label (set later)
  var weekLabel;

  return dbRef
    .child('leaderboards')
    .once("value", (snap) => {
        if(snap.val()) {
          weekLeaderboard = snap.val();
        } else {
          weekLeaderboard = {};
        }
        return weekLeaderboard;
    })
    .then(() => {
      return dbRef
        .child('students')
        .once("value", (snap) => {

          students = snap.val();

          if (students) {

            // Request can possibly inform which week to update
            // var whenToUpdate;
            // var when = JSON.parse(Buffer.from(message.data, "base64").toString())
            // if (when) {
            //   whenToUpdate = new Date(when);
            // } else {
            //   whenToUpdate = new Date();
            // }

            var whenToUpdate = new Date();

            weekLabel = getDateWeekLabel(whenToUpdate);

            // Set node with week at hand
            weekLeaderboard[weekLabel] = {};

            for (var student in students) {
              // Each student node is represented by his/her md5 hash from his/her firebaseUid
              // This guarantees the leaderboard is anonymous
              student = students[student];
              debug(`Creating node for student ${student.name}. FirebaseUid: ${student.firebaseUid}`)

              var studentHash = crypto
                                    .createHash('md5')
                                    .update(student.firebaseUid)
                                    .digest('hex');

              // Initially, we assume the student hasn't done any exercises.
              var solvedOnWeek = 0;

              // The student's node in the week's node receives the amount of problems solved for that week
              if (student &&
                  student.hasOwnProperty('weekly_statistics') &&
                  student.weekly_statistics.hasOwnProperty('weekly_history') &&
                  student.weekly_statistics.weekly_history.hasOwnProperty(weekLabel)
              ) {
                solvedOnWeek =
                          student.weekly_statistics.weekly_history[weekLabel];
                if (Array.isArray(solvedOnWeek)) {
                  // It's still stored in the old array format
                  weekLeaderboard[weekLabel][studentHash] = solvedOnWeek.length;
                } else {
                  // Most likely, it's an Object (because of db push)
                  weekLeaderboard[weekLabel][studentHash] =
                                              Object.keys[solvedOnWeek].length;
                }
              } else {
                // 0 Problems solved by this student this week
                weekLeaderboard[weekLabel][studentHash] = 0;
              }
            }

            debug("Finishing up the leaderboard function.")
            var updateObj = {};
            updateObj[`leaderboards`] = weekLeaderboard;

            // Update leaderboard on db
            debug("About to call the update function on db.")
            return dbRef.update(updateObj)

      } // End of if (students) {}
      return 'no student found'
    }) // End of .once("value", (snap) => {
    .then(() => {
      debug('leaderboard for week ' + weekLabel + ' was successfully updated.\n');
      return "Done!"
    })
  }) // End of .then((weekLeaderboard) => {
}) // End of exports.onLeaderboardPublished

/*
  Function that registers a problem solved for a given student based on JSON
  received on an https request.
  TODO: change key used.
*/
exports.onLeaderboardUpdateByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;

  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage: {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  updateWeeklyLeaderboard()
    .then(messageId => {
        debug(`I published a leaderboard trigger.`);
        res.send("Leaderboard trigger activated successfully!")
        return `Id from sent message: ${messageId}`;
      }).catch(error => {
        debug(`There was an error updating the leaderboard. :(`);
      });

}) // End of exports.onLeaderboardUpdateByHttps

/*
  Function that is to be fired once a week to check who earned which badges for the past week.
*/
exports.onLeaderboardBadgeByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;
  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  // This object will hold students info
  var students;

  // This object will hold the leaderboard updates with old leaderboards
  var weekLeaderboard = {};

  // Request can possibly inform which week to update
  const rObj = req.body;
  var whenToUpdate;

  if (rObj.hasOwnProperty('when')) {
    // If the when property is defined, it has the timestamp of the week to update
    whenToUpdate = new Date(rObj.when);
  } else {
    // Else, just update the current week
    whenToUpdate = new Date();
  }

  var rightNow = new Date().getTime();

  // Formatted week label
  var weekLabel = getDateWeekLabel(whenToUpdate);

  return dbRef
    .child(`leaderboards/${weekLabel}`)
    .once("value", (snap) => {
        if(snap.val()) {
          weekLeaderboard = snap.val();
          return weekLeaderboard;
        } else {
          throw new Error('no records for that week');
        }
    }).then(() => {
        return dbRef
          .child('students')
          .once("value", (snap) => {

            // Gather all students that have logged in:
            students = snap.val();

            var promises = [];

            if (students) {

              var weekLbValues = [];
              for(var hash in weekLeaderboard) {
                weekLbValues.push(weekLeaderboard[hash]);
              }

              // Gather sorted array of number of solved problems this week
              var sortedSolved = weekLbValues.sort((a, b) => { return a - b } )

              // For each student registered
              // give him the Competition Badge he deserves
              for (var studentUid in students) {

                // Gather student
                var student = students[studentUid];

                // Leaderboard uses md5 hash to protect identity
                var studentHash = md5(studentUid);

                // Number of completed assignments this week
                var studentCompAssign = 0;

                for(var label in weekLeaderboard) {
                  if(label === studentHash) {
                    studentCompAssign = weekLeaderboard[label];
                    break;
                  }
                }

                var sCount = 0; // Number of students ahead + you

                for (var bPos = sortedSolved.length - 1; bPos >= 0; bPos--) {
                  sCount++;
                  if (sortedSolved[bPos] === studentCompAssign) break;
                }

                // Weight each student has in %
                var percentageStep = 100.0/sortedSolved.length;
                var porcentagem = sCount*percentageStep;
                var categoria = "N/A";

                if(porcentagem <= 5 || sCount === 1)
                   categoria = "competitor-diamond";
                else if (porcentagem <= 20 || sCount === 2)
                   categoria = "competitor-platinum";
                else if (porcentagem <= 35 || sCount === 3)
                   categoria = "competitor-gold";
                else if (porcentagem <= 50 || sCount === 4)
                   categoria = "competitor-silver";
                else if (porcentagem <= 75 || sCount === 5)
                   categoria = "competitor-copper";
                else
                   categoria = "N/A";

                // If student received competitor badge, send.
                if (categoria !== "N/A") {
                  promises.push(addBadgeByKey(categoria, student, rightNow));
                  let update = {};
                  update['/students/' + student.firebaseUid] = student;
                  // Update values on db.
                  promises.push(dbRef.update(update));
                }
          }
          return Promise.all(promises);
        } else {
            throw new Error("No students active. Can't possibly give badges.")
        }
      }) // End of .once("value", (snap) => {
    }) // End of .then(() => {
    .then(() => {
      debug("Done with sending leaderboard badges!");
      res.send('Leaderboard badges for week ' + weekLabel + ' were successfully sent.\n');
      return "Done!"
    }).catch((error) => {
      console.error("Error: " + error);
      return -1;
    })
}); // End of exports.onLeaderboardBadgeByHttps

exports.onMarathonBadgeByHttps = functions.https.onRequest((req, res) => {
  const keyReceived = req.query.key;
  const localKey = 'keyToAuthenticateHTTPRequest';
  // Usage: {cloudfunctionurl}/?key=keyToAuthenticateHTTPRequest

  if (keyReceived !== localKey) {
    debug('The key provided in the request does not match the key set in the environment. Check that', keyReceived,
    'matches the on in the environment.');
    // 'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the one in the environment.');
    return 403;
  }

  // This object will hold students info
  var students;

  // This object will hold the leaderboard updates with old leaderboards
  var weekLeaderboard = {};

  // Request can possibly inform which week to update
  const rObj = req.body;
  var whenToUpdate;

  if (rObj.hasOwnProperty('when')) {
    // If the when property is defined, it has the timestamp of the week to update
    whenToUpdate = new Date(rObj.when);
  } else {
    // Else, just update the current week
    whenToUpdate = new Date();
  }

  var rightNow = new Date().getTime();

  // Formatted week label
  var weekLabel = getDateWeekLabel(whenToUpdate);

  return dbRef
    .child(`leaderboards/${weekLabel}`)
    .once("value", (snap) => {
        if(snap.val()) {
          weekLeaderboard = snap.val();
          return weekLeaderboard;
        } else {
          throw new Error('no records for that week');
        }
    }).then(() => {
        return dbRef
          .child('students')
          .once("value", (snap) => {

            // Gather all students that have logged in:
            students = snap.val();

            var promises = [];

            if (students) {

              var weekLbValues = [];
              for(var hash in weekLeaderboard) {
                weekLbValues.push(weekLeaderboard[hash]);
              }

              // Gather sorted array of number of solved problems this week
              var sortedSolved = weekLbValues.sort((a, b) => { return a - b } )

              // For each student registered
              // give him the Competition Badge he deserves
              for (var studentUid in students) {

                // Gather student
                var student = students[studentUid];

                // Leaderboard uses md5 hash to protect identity
                var studentHash = md5(studentUid);

                // Number of completed assignments this week
                var studentCompAssign = 0;

                for(var label in weekLeaderboard) {
                  if(label === studentHash) {
                    studentCompAssign = weekLeaderboard[label];
                    break;
                  }
                }

                var sCount = 0; // Number of students ahead + you

                for (var bPos = sortedSolved.length - 1; bPos >= 0; bPos--) {
                  sCount++;
                  if (sortedSolved[bPos] === studentCompAssign) break;
                }

                // Weight each student has in %
                var percentageStep = 100.0/sortedSolved.length;
                var porcentagem = sCount*percentageStep;
                var categoria = "N/A";

                if(porcentagem <= 5 || sCount === 1)
                   categoria = "diamond-marathonist";
                else if (porcentagem <= 20 || sCount === 2)
                   categoria = "platinum-marathonist";
                else if (porcentagem <= 35 || sCount === 3)
                   categoria = "gold-marathonist";
                else if (porcentagem <= 50 || sCount === 4)
                   categoria = "silver-marathonist";
                else if (porcentagem <= 75 || sCount === 5)
                   categoria = "copper-marathonist";
                else
                   categoria = "N/A";

                debug(`Porcentagem de ${student.email}: ${porcentagem}. Categoria: ${categoria}`)

                // If student received competitor badge, send.
                if (categoria !== "N/A") {
                  promises.push(addBadgeByKey(categoria, student, rightNow));
                  let update = {};
                  update['/students/' + student.firebaseUid] = student;
                  // Update values on db.
                  promises.push(dbRef.update(update));
                }
          }
          return Promise.all(promises);
        } else {
            throw new Error("No students active. Can't possibly give badges.")
        }
      }) // End of .once("value", (snap) => {
    }) // End of .then(() => {
    .then(() => {
      debug("Done with sending leaderboard badges!");
      res.send('Marathon badges were successfully sent.\n');
      return "Done!"
    }).catch((error) => {
      console.error("Error: " + error);
      return -1;
    })
}); // End of exports.onMarathonBadgeByHttps

// Updates info on a student's db, impacted by a new submission.
exports.onProblemSolvedRegistered = functions.database.ref('events/problems_solved/{pushId}')
  .onCreate((event) => {
    debug("Received this stringify: " + JSON.stringify(event));
    const problemSolved = event._data;
    if (!problemSolved) {
      return "Solved problem not received by function...";
    }
    const ps = { // ProblemSolved
      sid: problemSolved.student, // Student ID (email)
      pid: problemSolved.key, // Problem ID
      time: problemSolved.timestamp, // Timestamp
      aid: problemSolved.aid // Timestamp
    }

    const CGOffset = -3; // Timezone offset in Campina Grande
    ps.time = ps.time + (1000 * 60 * 60 * CGOffset);

    // Grabs current info on Student
    return dbRef
            .child('students')
            .orderByChild('email')
            .equalTo(ps.sid)
            .once("value", (snap) => {

      if (!snap.val()) {
        // If snap.val() is null, student is not yet registered.

        debug(`Received problem (${ps.pid}) from enrolled student (${ps.sid}) who has NOT logged in yet.`);

        // Update information on a temporary node for this student.
        debug("Saving information to temporary node.");
        return updateProblemOnTemporaryStudentNode(ps);

      } else {
        // Student is registered on default node. Continue as usual.
        var student = snap.val();
        student = student[Object.keys(snap.val())[0]];

        debug("Received problem from student: " + student.email);

        if(student.hasOwnProperty("assignmentIds")) {
          var aidSet = new Set(student.assignmentIds);
          if(aidSet.has(ps.aid)) {
            debug("Temporary student has already done this assignment.");
            return 0; // Done here.
          } else {
            // New aid, append to record.
            student.assignmentIds.push(ps.aid);
          }
        } else {
          // First assignmentId ever:
          student["assignmentIds"] = [];
          student.assignmentIds.push(ps.aid);
        }

        updateStatistics(student, ps);
        updateBadges(student, ps);

        var update = {};
        update['/students/' + student.firebaseUid] = student;

        // Update values on db.
        return dbRef.update(update);
      }
    }).then(() => {
      debug("I updated the DB!!");
      return updateWeeklyLeaderboard();
    });

    function updateProblemOnTemporaryStudentNode(ps) {
      var nodeHash = crypto.createHash('md5').update(ps.sid).digest('hex');
      return dbRef
              .child(`temp_students/${nodeHash}`)
              .once("value", (snap) => {

      var student;
      if (snap.val()) {
        student = snap.val();

        if(student.hasOwnProperty("assignmentIds")) {
          var aidSet = new Set(student.assignmentIds);
          if(aidSet.has(ps.aid)) {
            debug("Temporary student has already done this assignment.");
            return 0; // Done here.
          } else {
            // New aid, append to record.
            student.assignmentIds.push(ps.aid);
          }
        } else {
          // First assignmentId ever:
          student["assignmentIds"] = [];
          student.assignmentIds.push(ps.aid);
        }

        debug(`Updating info on temporary node for student ${student.email}.`);
        updateStatistics(student, ps);
        updateBadges(student, ps);
      } else {
        // Create student from scratch before adding new problem
        // Because there was no temp record of one.
        var userData = {}
        userData['email'] = ps.sid;
        student = createStudentWithData(userData);
        updateStatistics(student, ps);
        updateBadges(student, ps);
      }

      debug(`Creating a new temporary node for ${student.email}.`);
      var update = {};
      update['/temp_students/' + nodeHash] = student;

      // Update values on db.
      return dbRef.update(update);

    }).then(() => {
        debug("I successfully updated the DB on a temporary branch!!");
        return "I updated the DB on a temporary branch!!";
      }).catch((error) => {
        debug("There was an error in creating new temporary branch.");
      });
    }

    function updateStatistics(student, ps) {
      updateDailyAmounts(student, ps);
      updateWeeklyAmounts(student, ps);
      updateGlobalAmounts(student, ps);
    }

    function updateDailyAmounts(student, ps) {

      var lastDate = new
        Date(student.global_statistics.last_global_timestamp);

      // Calculates date that registers last milisecond of last timestamp's date
      var lastDateLimit = new Date(
        new Date(lastDate)
          .setHours(23, 59, 59, 999)
      );

      // Making a timestamp object based on problem submission
      var psDate = new Date(ps.time);

      // Creating object with only its problemid and timestamp.
      var problemAndTime = { problemid: ps.pid, timestamp: ps.time };

      // Retrieve problem date label
      var psDateLabel = getDateLabel(psDate);

      if (student.daily_statistics.hasOwnProperty('daily_history')) {
        // If student has daily_history property, append new problem

        if (student.daily_statistics.daily_history.hasOwnProperty(psDateLabel)) {
          // If another problem was submitted on the same day, append new problem
          student.daily_statistics.daily_history[psDateLabel].push(problemAndTime);
        } else {
          // Else, this is the first problem submitted on that day.

          // Create a new node for that day and add the problem to that day
          student.daily_statistics.daily_history[psDateLabel] = [problemAndTime];
        }
      } else {
        // Else, this is the first time a problem is registered ever!

        // Add daily_history node as a new Object, because each date node will be added as a property
        student.daily_statistics.daily_history = {};

        // Then, declare a new property inside daily_history that receives a list with the first problem in that day.
        student.daily_statistics.daily_history[psDateLabel] = [];
        student
          .daily_statistics
          .daily_history[psDateLabel]
          .push(problemAndTime);
      }

      var diffInDaysLastCur = dateDiffInDays(lastDate, psDate);
      if (diffInDaysLastCur === 1) {
        // solved problem the next day
        student.daily_statistics.active_days_current += 1;

        // If current value greater than record, update record
        if (student.daily_statistics.active_days_current > student.daily_statistics.active_days_record) {
          student.daily_statistics.active_days_record = student.daily_statistics.active_days_current;
        }
      } else {
        // Else, if submitted with more than two days of difference,
        // restart consecutive active days counters back to 1.
        if(diffInDaysLastCur > 1) {
          student.daily_statistics.active_days_current = 1;

          // If current value greater than record, update record
          if (student.daily_statistics.active_days_record < 1) {
            student.daily_statistics.active_days_record = 1;
          }
        }
      }

      if (psDate < lastDateLimit) {
        // If true, solved another problem within the same day.

        // Increment daily solved counter.
        student.daily_statistics.daily_solved_current += 1;

      } else {
        // Increment daily solved counter.
        student.daily_statistics.daily_solved_current = 1;
      }

      // If current value greater than record, update record
      if (student.daily_statistics.daily_solved_current > student.daily_statistics.daily_solved_record) {
        student.daily_statistics.daily_solved_record = student.daily_statistics.daily_solved_current;
      }
    } // End of updateDailyAmounts

    // Funtion that updates statistics in weekly_statistics
    function updateWeeklyAmounts(student, ps) {

      var lastDate = new
        Date(student.global_statistics.last_global_timestamp);

      // Calculates Moday 0 a.m. that precedes last submission's timestamp
      var lastDateMondayBegin = getPreviousMonday(lastDate);

      // Calculates last milisec of Sunday after last submission
      var lastDateSundayEnd = getNextSundayLimit(lastDate);

      // Making a timestamp object based on problem submission
      var psDate = new Date(ps.time);

      // Retrieve label with reference to week
      var psDateWeekLabel = getDateWeekLabel(psDate);

      var problemAndTime = { problemid: ps.pid, timestamp: ps.time };

      if (student.weekly_statistics.hasOwnProperty('weekly_history')) {
        // If student has weekly_problems property, append new problem
        if (student.weekly_statistics.weekly_history.hasOwnProperty(psDateWeekLabel)) {
          // If another problem was submitted on the same week, append new problem
          student.weekly_statistics.weekly_history[psDateWeekLabel].push(problemAndTime);
        } else {
          // Else, this is the first problem submitted on that week.

          // Create a new node for that week and add the problem to it
          student.weekly_statistics.weekly_history[psDateWeekLabel] = [problemAndTime];
        }
      } else {
        // Else, this is the first time a problem is registered ever!

        // Create a new node for weekly_history
        student.weekly_statistics.weekly_history = {};
        student.weekly_statistics.weekly_history[psDateWeekLabel] = [problemAndTime];
      }

      // New approach on weekly statistics!
      // Initially, we assume the student hasn't done any exercises.
      var solvedOnWeek = 0;

      // The student's node in the week's node receives the amount of problems solved for that week
      if (student &&
          student.hasOwnProperty('weekly_statistics') &&
          student.weekly_statistics.hasOwnProperty('weekly_history') &&
          student.weekly_statistics.weekly_history.hasOwnProperty(psDateWeekLabel)
      ) {
        solvedOnWeek =
                  student.weekly_statistics.weekly_history[psDateWeekLabel];
        if (Array.isArray(solvedOnWeek)) {
          // It's still stored in the old array format
          student.weekly_statistics.weekly_solved_current = solvedOnWeek.length;
        } else {
          // Most likely, it's an Object (because of db push)
          student.weekly_statistics.weekly_solved_current =
                                      Object.keys[solvedOnWeek].length;
        }
      } else {
        // 0 Problems solved by this student this week
        student.weekly_statistics.weekly_solved_current = 0;
      }

      if (student.weekly_statistics.weekly_solved_current > student.weekly_statistics.weekly_solved_record) {
        student.weekly_statistics.weekly_solved_record = student.weekly_statistics.weekly_solved_current;
      }

      // if (psDate > lastDateMondayBegin && psDate < lastDateSundayEnd) {
      //   // If true, solved problem within last submission
      //   // week's constraints, so you can increase weekly status
      //   student.weekly_statistics.weekly_solved_current += 1;
      //
      //   // If current value greater than record, update record
      //   if (student.weekly_statistics.weekly_solved_current > student.weekly_statistics.weekly_solved_record) {
      //     student.weekly_statistics.weekly_solved_record = student.weekly_statistics.weekly_solved_current;
      //   }
      // } else {
      //   // Else, submitted one or more weeks later.
      //   // Set weekly counters to 1.
      //   student.weekly_statistics.weekly_solved_current = 1;
      //   if (student.weekly_statistics.weekly_solved_current < 1) {
      //     student.weekly_statistics.weekly_solved_record = 1;
      //   }
      // }
    } // End of updateWeeklyAmounts

    function updateGlobalAmounts(student, ps) {
      // Updating lastTimestamp after calculations
      student.global_statistics.last_global_timestamp = ps.time;
      student.global_statistics.solved_problems_count += 1;
    }

    function updateBadges(student, ps) {
      calculateDailyBadges(student, ps);
      calculatePersistentBadge(student, ps);
      checkChallengeBadges(student, ps);
      checkExtraBadges(student, ps);
      checkMarathonBadges(student, ps);
    }

    function checkExtraBadges(student, ps) {
      // ps.time is already adjusted for Campina Grande timezone
      let psDate = new Date(ps.time);
      let psHour = psDate.getUTCHours();
      let psDay = psDate.getUTCDay();
      let psMinute = psDate.getUTCMinutes();

      debug("I'm checking on Extra Badges...");
      debug(`Hour: ${psHour}, Day: ${psDay}, Minute: ${psMinute}`);
      debug(`Original psDate: ${psDate}`);

      if (psHour >= 5 && psHour <= 7 && psDay !== 0 && psDay !== 6 &&
        !hasAchievedBadgeOnDate('early-exerciser', student, ps.time)) {
        // Solved problem between 5 and 7 am from Moday through Friday.
        addBadgeByKey('early-exerciser', student, ps.time);
      }

      if (5 >= psHour && psHour <= 7 && psDay === 5 && psDay === 6 &&
        !hasAchievedBadgeOnDate('weekend-exerciser', student, ps.time)) {
        // Solved problem between 5 and 7 am.
        addBadgeByKey('weekend-exerciser', student, ps.time);
      }

      if (20 >= psHour && psHour <= 21 && psDay === 5 &&
        !hasAchievedBadgeOnDate('friday-exerciser', student, ps.time)) {
          addBadgeByKey('friday-exerciser', student, ps.time);
      }

      if (1 === psHour &&
        !hasAchievedBadgeOnDate('lunch-exerciser', student, ps.time)) {
          addBadgeByKey('lunch-exerciser', student, ps.time);
      }

      if (psDay === 1 && psHour >= 10 && psHour <= 12 &&
        !hasAchievedBadgeOnDate('class-exerciser', student, ps.time)) {
          addBadgeByKey('class-exerciser', student, ps.time);
      }

      if (psMinute === 42) {
        addUniqueBadgeByKey("life-meaning", student, ps.time);
      }

    }

    // Only works if this system is initialized on the moment of the marathon.
    function checkMarathonBadges(student, ps) {
      if (isMarathonTime(ps.time)) {
        addUniqueBadgeByKey("marathonist", student, ps.time);
        let dsc = student.daily_statistics.daily_solved_current;
        switch (dsc) {
          case 5:
            addBadgeByKey('warm-marathonist', student, ps.time);
            break;
          case 10:
            addBadgeByKey('cheered-marathonist', student, ps.time);
            break;
          case 15:
            addBadgeByKey('ninja-marathonist', student, ps.time);
            break;
        }
      }
    }

    function isMarathonTime(time) {
      // You have to replace year, month, day, hour, minute, second and duration with your desired values for start and end of marathon. It's recommended to test this functionality beforehand.
      time = new Date(time);
      let begin = new Date(Date.UTC(year, month, day, hour, minute, second));
      let end = new Date(Date.UTC(year, month, day, hour + duration, minute, second));
      if (time > begin && time < end) {
        return true;
      }
      return false;
    }

    function calculateDailyBadges(student, ps) {
      // daily-exerciser
      var dsc = student.daily_statistics.daily_solved_current;
      switch (dsc) {
        case 5:
          addBadgeByKey('daily-exerciser', student, ps.time);
          break;
        case 10:
          addBadgeByKey('daily-exerciser-copper', student, ps.time);
          break;
        case 15:
          addBadgeByKey('daily-exerciser-silver', student, ps.time);
          break;
        case 20:
          addBadgeByKey('daily-exerciser-gold', student, ps.time);
          break;
        case 25:
          addBadgeByKey('daily-exerciser-diamond', student, ps.time);
          break;
      }

      var adc = student.daily_statistics.active_days_current;
      var psDate = new Date(ps.time);

      if((adc % 7 === 0) &&
        !hasAchievedBadgeOnDate('exerciser-247', student, ps.time)) {
        addBadgeByKey('exerciser-247', student, ps.time);
      }

      if((adc % 30 === 0) &&
        !hasAchievedBadgeOnDate('exerciser-30', student, ps.time)) {
        addBadgeByKey('exerciser-30', student, ps.time);
      }

    }

    function hasAchievedBadgeOnDate(key, student, time) {
      let psDateLabel = getDateLabel(new Date(time));
      if (student.badges.hasOwnProperty(key) &&
        student.badges[key].hasOwnProperty('aquisition_timestamps')) {
        var timestamps = student.badges[key].aquisition_timestamps;
        for (var i = 0; i < timestamps.length; i++) {
          let curDateLabel = getDateLabel(new Date(timestamps[i]));
          if(psDateLabel === curDateLabel) {
            return true;
          }
        }
      }
      return false;
    }

    function calculatePersistentBadge(student, ps) {
      // This function is unindented on purpose, for readability of nested ifs.
      var psDate = new Date(ps.time);
      if (solved5Prob5DaysInRow(student, ps)) {
        // If solved 5 problems each day for past 5 days, it's possible to have
        // won a persistent badge. Let's check...
        if(student.badges['persistent'].achieved === false) {
          addBadgeByKey('persistent', student, ps.time);
        } else {
        // Else, persistent badge achieved. Let's check for following badges.
        if (!isLastPersistentBadge5DaysApart(student, 'persistent', psDate)) {
          // If last persistent badge is not 5 days apart, can't possibly have
          // won a new one, just get out of this function and act as if nothing
          // happened. :P
          return;
        }

        if(student.badges['persistent-copper'].achieved === false) {
         addBadgeByKey('persistent-copper', student, ps.time);
        } else {
        // Else, persistent-copper achieved. Let's check for following badges.
        if (!isLastPersistentBadge5DaysApart(student, 'persistent-copper', psDate)){
          return;
        }

        if(student.badges['persistent-silver'].achieved === false) {
          addBadgeByKey('persistent-silver', student, ps.time);
        } else {
        // Else, persistent-silver achieved. Let's check for following badges.
        if (!isLastPersistentBadge5DaysApart(student, 'persistent-silver', psDate)){
          return;
        }

        if(student.badges['persistent-gold'].achieved === false) {
          addBadgeByKey('persistent-gold', student, ps.time);
        } else {
          // Else, persistent-gold achieved. Let's check for following badges.
          if (!isLastPersistentBadge5DaysApart(student, 'persistent-gold', psDate)){
            return;
          }

          if(student.badges['persistent-diamond'].achieved === false) {
          addBadgeByKey('persistent-diamond', student, ps.time);
        } else {
          // Else, persistent-diamond achieved. Let's check for savant badge.
          if (!isLastPersistentBadge5DaysApart(student, 'persistent-diamond', psDate)){
            return;
          }
          if (student.badges['persistent-savant'].achieved === true) {
            if (!isLastPersistentBadge5DaysApart(student, 'persistent-savant', psDate)) {
              return;
            }
          }
          // If code reaches here, student may earn a cumulative savant-badge.
          addBadgeByKey('persistent-savant', student, ps.time);
        }}}}}
      } // End of first if
    }

    function isLastPersistentBadge5DaysApart(
      student,
      lastPersitentKey,
      psDate) {
        var sortedTimestamps = student.badges[lastPersitentKey].aquisition_timestamps.sort((a, b) => {
          return parseInt(a) < parseInt(b);
        });
        var lastPersistentDate = new Date(sortedTimestamps[0]);

        // If earned last persistent badge within less than 5 days,
        // impossible to have earned following badges.
        if (dateDiffInDays(lastPersistentDate, psDate) < 5) {
          return false;
        }
        return true;
    }

    function checkChallengeBadges(student, ps) {
      var pids = [
        'passagem_aerea', 'caixa_preta', 'quem_acertou_menos', 'segundo_maior_menor', 'mastery_learning', 'ataque_mais_positivo', 'pesquisa_hoteis', 'media_limite', 'custo_inss', 'parte_fracionaria', 'converte_matricula', 'perimetro_de_triangulo', 'media_dos_extremos', 'conta_divisiveis', 'pesquisa_voos', 'prof_equacoes', 'fahrenheit_celsius', 'tiro_ao_alvo_2', 'mais_velho', 'octal_decimal', 'k_moldura', 'hello_world', 'qualidade', 'mm_sort', 'caixa_alta', 'separa_duas_cores', 'letras_coincidentes', 'transporte_modificado', 'quadrado_na_circunferencia', 'descarta_coincidentes', 'ordena_tipos', 'calculadora_de_medias', 'verifica_operacoes_extrato', 'menor_dos_extremos', 'hospital_de_trauma', 'dv_cpf', 'conjunto_mais_elementos', 'eh_triangulo', 'teorema_de_herao', 'pi_por_aproximacoes', 'resumo_passagem', 'soma_divisores_do_primeiro', 'imprime_nota_fiscal', 'square_code', 'substitui_espaco_por_virgula'
      ];

      if (pids.indexOf(ps.pid) > -1)  {
        debug("Adicionando unique badge " + ps.pid);
        addUniqueBadgeByKey(ps.pid, student, ps.time);
      } else {
        debug("Não encontrei questão " + ps.pid + " na lista de badges de desafios.")
      }
    }

    function addUniqueBadgeByKey(key, student, time) {
      // Only adds a badge, if it hadn't been achieved before.
      if(student.badges.hasOwnProperty(key) &&
       student.badges[key].hasOwnProperty('achieved')) {
        if(!student.badges[key].achieved) {
          student.badges[key].achieved = true;
          student.badges[key].amount = 1;
          student.badges[key].timestamp = time;
          sendBadgeNotification(key, student, time);
        }
      } else {
        // For some reason, badge hadn't been added to db before.
        student.badges[key] = {};
        student.badges[key].achieved = true;
        student.badges[key].amount = 1;
        student.badges[key].timestamp = time;
        sendBadgeNotification(key, student, time);
      }
    }

    function solved5Prob5DaysInRow(student, ps) {
      if(!student.daily_statistics.hasOwnProperty('daily_history')) {
        return false;
      } else {
        var dHist = student.daily_statistics.daily_history;
        if(Object.keys(dHist).length < 5) {
          // If less than 5 days are in history, return false
          return false;
        }
        for (var i = 0; i < 5; i++) {
          // Checking if last 5 days' labels are in history
          var curDate = new Date(ps.time - (i * 86400000));
          if(!dHist.hasOwnProperty(getDateLabel(curDate))) {
            // If one of the 5 listed days are not present, student didn't send
            // problems on at least one of past 5 days.
            return false;
          }
        }
        // All good so far
        // now checking number of exercises on each of past 5 days
        var sortedKeys = Object.keys(dHist).sort();
        sortedKeys.reverse(); // Bring most recent dates to initial positions
        for (var j = 0; j < 5; j++) {
          if (dHist[sortedKeys[j]].length < 5) {
            // If one of past 5 days have less than 5 exercises, return false
            return false;
          }
        }
        // At least 5 exercises were done each day in past 5 days
        return true;
      }
    }

    // Old sendBadgeNotification implementation
  }); // End of onProblemSolvedRegistered Cloud Function

  // This function is declared here because it is used by multiple CFs.
  function generateBadgesObject() {

    var badgesKeys = [

      // Daily badges
      "daily-exerciser", "daily-exerciser-copper", "daily-exerciser-silver",
      "daily-exerciser-gold", "daily-exerciser-diamond",

      // Continuous exerciser badges
      "exerciser-247", "exerciser-30", "persistent", "persistent-copper", "persistent-silver", "persistent-gold", "persistent-diamond", "persistent-savant",

      // Competitor
      "competitor-copper", "competitor-silver", "competitor-gold",
      "competitor-platinum", "competitor-diamond",

      // Marathon Competitor
      "copper-marathonist", "silver-marathonist", "gold-marathonist",
      "platinum-marathonist", "diamond-marathonist",

      // Marathon special
      "marathonist", 'warm-marathonist', 'cheered-marathonist',
      'ninja-marathonist',

      // Extra badges
      "life-meaning", 'class-exerciser', 'lunch-exerciser', 'friday-exerciser',
      'early-exerciser', 'weekend-exerciser',

      // Unit badges (removed)
      // "unit-1", "unit-2", "unit-3", "unit-4", "unit-5", "unit-6", "unit-7",
      // "unit-8", "unit-9", "unit-10",

      // collaborator badges
      // not implemented as of now, maybe in a near future
      "collaborator", "collaborator-beginner", "collaborator-intermediate",
      "collaborator-advanced", "collaborator-expert", "collaborator-savant",

      // Badges for challenging problems
      'passagem_aerea', 'caixa_preta', 'quem_acertou_menos',
      'segundo_maior_menor', 'mastery_learning', 'ataque_mais_positivo',
      'pesquisa_hoteis', 'media_limite', 'custo_inss', 'parte_fracionaria',
      'converte_matricula', 'perimetro_de_triangulo', 'media_dos_extremos',
      'conta_divisiveis', 'pesquisa_voos', 'prof_equacoes',
      'fahrenheit_celsius', 'tiro_ao_alvo_2', 'mais_velho', 'octal_decimal',
      'k_moldura', 'hello_world', 'qualidade', 'mm_sort', 'caixa_alta',
      'separa_duas_cores', 'letras_coincidentes', 'transporte_modificado',
      'quadrado_na_circunferencia', 'descarta_coincidentes', 'ordena_tipos',
      'calculadora_de_medias', 'verifica_operacoes_extrato',
      'menor_dos_extremos', 'hospital_de_trauma', 'dv_cpf',
      'conjunto_mais_elementos', 'eh_triangulo', 'teorema_de_herao',
      'pi_por_aproximacoes', 'resumo_passagem', 'soma_divisores_do_primeiro',
      'imprime_nota_fiscal', 'square_code', 'substitui_espaco_por_virgula'
    ];

    var badges = {};

    for(var i = 0; i < badgesKeys.length; i++) {
      var curBadge = {
        achieved: false,
        amount: 0,
        timestamps: []
      }
      badges[badgesKeys[i]] = curBadge;
    }
    return badges;
  }

  // This function is declared here because it is used by multiple CFs.
  function createStudentWithData(userData) {
    // Function that creates a new student with no records whatsoever.
    var student = {
      name: userData.name || "N/A",
      email: userData.email,
      creationTime: userData.creationTime || "N/A",
      photoUrl: userData.photoUrl || "N/A",
      firebaseUid: userData.firebaseUid || "N/A",
      daily_statistics: {
        active_days_current:0,
        active_days_record:0,
        daily_solved_current: 0,
        daily_solved_record: 0,
        last_daily_timestamp: 0
      },
      weekly_statistics: {
        weekly_solved_current: 0,
        weekly_solved_record: 0,
        weekly_hints_record: 0,
        weekly_hints_current: 0,
        last_weekly_timestamp: 0
      },
      monthly_statistics: {
        consecutive_days_active: 0,
        last_monthly_timestamp: 0
      },
      global_statistics: {
        global_hints_record: 0,
        solved_problems_count: 0,
        last_global_timestamp: 0
      },
      badges: generateBadgesObject(),
      solved_problems: null
    };

    return student;
  }

const Pubsub = require('@google-cloud/pubsub');
// const config = require('../config');
// const logging = require('./logging');

// Fuction that sends a notification to a user when he receives a badge
exports.onBadgeNotificationPublished = functions.pubsub.topic('new-badge-achieved').onPublish((message) => {

  debug(`message received onBadgeNotificationPublished: ${JSON.stringify(message)}`);
  // debug("Showing all properties of 'message' received from onBadgeNotificationPublished:");
  // var pv; // Property Value
  // for (var pn in message) { // Property Name
  //   pv = message[pn];
  //   debug(`pn: ${pn} has this pv: ${pv}`)
  // }

  let messageData = message.data;
  const notificationStringObject = messageData ?
                                Buffer.from(messageData, "base64").toString() :
                                null;
  // Fields: studentName, studentUid, badgeTitle, badgeImage, time, tokens
  // console.error("Something wrong with the PubSub message JSON object! :(");
  const notificationObject = JSON.parse(notificationStringObject);

  debug(`notificationObject stringify created onBadgeNotificationPublished: ${JSON.stringify(notificationObject)}`);
  debug(`notificationObject created onBadgeNotificationPublished: ${notificationObject}`);

  console.log(`Recebi um badge via PubSub do aluno ${notificationObject.studentName}. Se estiver null, deu erro. TODO: Próxima coisa seria enviar notificação...`);

  // Notification details
  const payload = {
    notification: {
      title: `${notificationObject.badgeTitle}!`,
      body: `Parabéns, ${notificationObject.studentName}! Você conquistou o badge ${notificationObject.badgeTitle}!`,
      icon: notificationObject.badgeImage || '/images/noimage.png',
      sound: './sounds/slow-spring-board.mp3',
      click_action: `https://tst-badges.firebaseapp.com/`
    }
  };

  // Getting list of device tokens
  return admin.database()
  .ref(`/students/${notificationObject.studentUid}/fcmTokens`).once('value')
  .then(allTokens => {
    if(allTokens.val()) {

      // const t = allTokens.val();
      //
      // // Listing all tokens
      // const tokenKeys = Object.keys(t);
      // const tokens = [];
      //
      // for (var k in tokenKeys) {
      //   tokens.push(t[k]);
      // }

      const val = allTokens.val();
      var tokens = [];
      for (var k in val) {
        tokens.push(val[k]);
      }

      debug("Tokens: " + tokens)

      // Send notifications to all tokens
      return admin.messaging().sendToDevice(tokens, payload)
        .then(response => {
          const tokensToRemove = [];
          response.results.forEach((result, index) => {
            const error = result.error;
            if(error) {
              console.error('Falha ao enviar notificação para', tokens[index], error);
              // Cleaning up the tokens who are not registered anymore.
              if (error.code === 'messaging/invalid-registration-token' ||
                  error.code === 'messaging/registration-token-not-registered') {
                    tokensToRemove.push(allTokens.ref.child(tokens[index].remove()));
                  }
            }
          });
          return Promise.all(tokensToRemove);
        });
    }
    return 'ok';
  });
  }); // End of sendBadgeNotification cloud function

// End of Cloud Functions Implementations

/*
  =========================
  Auxiliary Local Functions
  =========================
*/

// A function that logs debug info on screen.
function debug(m) {
  if (DEBUG === true) {
    console.log(m);
  }
}

function sendBadgeNotification(key, student, timestamp) {

  let obj = {
    studentName: student.name,
    studentUid: student.firebaseUid,
    badgeTitle: badgesMap[key].title || "null",
    badgeImage: badgesMap[key].image || '',
    time: timestamp,
    tokens: student['fcmTokens'] || null
  };

  let badgeData = JSON.stringify(obj);

  debug("Object being given to Buffer: " + badgeData);

  // To send to topic via PubSub, object needs to be a Buffer.
  const dataBuffer = Buffer.from(badgeData);

  debug("dataBuffer created: " + JSON.stringify(dataBuffer));

  return newBadgePublisher.publish(dataBuffer).
    then(messageId => {
      debug(`I published the badge ${key} to ${student.name} with the PubSub.`);
      return `Id from sent message: ${messageId}`;
    }).catch(error => {
      debug(`There was an error sending the badge ${key} to ${student.displayName} with the PubSub. Error: ${error}`);
    });
}

function addBadgeByKey(key, student, time) {

  if(!student.badges.hasOwnProperty(key)) {
    student.badges[key] = {};
    student.badges[key].achieved = true;
    student.badges[key].amount = 1;
  } else {
    student.badges[key].achieved = true;
    student.badges[key].amount += 1;
  }

  if (student.badges[key]
        .hasOwnProperty('aquisition_timestamps')) {
    // If had previous timestamps, just push another
    student.badges[key].aquisition_timestamps.push(time);
  } else {
    // If property wasn't set, initialize timestamp list for the first time
    student.badges[key].aquisition_timestamps = [time];
  }
  debug("Added this badge: " + key + " to student " + student.email + ".");
  return sendBadgeNotification(key, student, time);
}

// Returns difference in days between two Date objects (a, b)
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function errHandler(error) {
  console.error(error);
}

function getDateLabel(date) {
  // Function that returns a string in the form 'YYYYMMdd'
  return date.getFullYear() +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          ("0" + date.getDate()).slice(-2);
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

function updateWeeklyLeaderboard() {
  return leaderboardUpdatePublisher
            .publish(Buffer.from(JSON.stringify(new Date().getTime())))
}

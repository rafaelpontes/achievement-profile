const https = require('https');

/*
  Script de exemplo de como enviar array de assignments resolvidos pelos alunos.
*/

/*
  Submission format:
    {
      "student": email, // student@institute.edu
      "time": timestamp, // new Date().geTime() da submissao
      "key": assignmentName, // problem name, e.g. "pi_por_aproximacoes"
      "aid": assignmentId // assignment ID
    }
  @params
   studentArray: array with students submissions.

*/
function sendArray(studentArray) {
  var postData = JSON.stringify(studentArray);
  var options = {
    host: '{yourfunctionlinkhere}.cloudfunctions.net',
    port: 443,
    path: '/onSubmissionReceivedByHttps?key=yoursubmissionkeyhere',
    method: 'POST',
    headers: {
         'Content-Type': 'application/json',
         'Content-Length': postData.length
       }
  };

  var req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();
}

function makeNewSubmission(
                        email,
                        assignmentName,
                        assignmentId,
                        timestamp) {
  return {
    "student": email,
    "time": timestamp,
    "key": assignmentName,
    "aid": assignmentId
  };
}

var sArray = [];

var testSubjects = [
  "registered_email@institute.edu"
];


var problemas = ["quadrado_na_circunferencia", "qualidade", "transporte_modificado", "passagem_aerea", "segundo_maior_menor", "quem_acertou_menos", "perimetro_de_triangulo", "pesquisa_hoteis",  "parte_fracionaria", "resumo_passagem", "fahrenheit_celsius", "menor_dos_extremos", "octal_decimal", "teorema_de_herao", "imprime_nota_fiscal", "caixa_preta",  "caixa_alta", "converte_matricula", "hello_world", "pi_por_aproximacoes", "mais_velho", "media_limite", "prof_equacoes", "soma_divisores_do_primeiro", "ordena_tipos"];

var cont = 10;
for (var i in testSubjects) {
  for (var j = 0; j < 5; j++) {
    sArray.push(
      makeNewSubmission(
        testSubjects[i],
        problemas[Math.floor((Math.random() * problemas.length))], // random problem
        Math.floor((Math.random() * 30000000) +50000000), // Random aid
        new Date().getTime() + Math.floor((Math.random() * 10000)) // Random time
    ))
  }
}

// Sending array created here
sendArray(sArray);

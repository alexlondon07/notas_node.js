/**
* Dependencias
*/
var express = require('express');
var bodyParser = require('body-parser');

/**
* Variables locales
*/
var server = express();
var db = {};

/**
* Middleware
*/
server.use(bodyParser.json('application/json'))

/**
* Rutas
*/
server.post('/notas', function(req, res){
  console.log('POST', req.body.nota);
  //Manipulate request
  var notaNueva = req.body.nota;
  notaNueva.id = Date.now();

  //Almacenando la nota
  db[notaNueva.id]=notaNueva;

  res.set('Content-Type', 'application/json');
  res.status(201);
  //Send response
  res.json({
      nota:notaNueva
    });
});

server.get('/notas/:id?', function(req, res){
  console.log('GET /notas/%s', req.params.id);
  var id = req.params.id;
  var nota = db[id];

  res.json({
    notas: nota
  });

});

/**
* Poner en marcha nuestro server
*/
if(!module.parent){
  server.listen(3000, function(){
    console.log('Hola estoy Aprendiendo Node.js');
  });
}else {
  module.exports=server;
}

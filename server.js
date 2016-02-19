/**
* Dependencias
*/
var express = require('express');
var bodyParser = require('body-parser');

/**
* Variables locales
*/
var server = express();


/**
* Middleware
*/
server.use(bodyParser.json('application/json'))

/**
* Rutas
*/
var notas = require ('./lib/notas');
server.use.notas;

/**
* Poner en marcha nuestro server
*/
if(!module.parent){
  server.listen(3000, function(){
    console.log('Hola estoy Aprendiendo Node.js http://localhost:3000/notas/');
  });
}else {
  module.exports=server;
}

/**
* Dependencias
*/
var app = require('express')();
var db = {};

/**
* Routes
*/
app.route('/notas/:id?')
  //Logging
  .all(function(req, res, next){
    console.log(req.method, req.path, req.body);
    //Configuramos el tipo de contenido, que siempre sean JSON
    res.set('Content-Type', 'application/json');
    //Siga con la siguiente funcion
    next();
  })

//POST
.post(function(req, res){
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
})

//GET
.get(function(req, res){
  var id = req.params.id;
  var nota = db[id];

  res.json({
    notas: nota
  });
});
module.exports = app;

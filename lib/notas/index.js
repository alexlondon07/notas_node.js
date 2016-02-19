/**
* Dependencias
*/
var app = require('express')();
var db = {};

/**
* Routes
*/
app.post('/notas', function(req, res){
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

app.get('/notas/:id?', function(req, res){
  console.log('GET /notas/%s', req.params.id);
  var id = req.params.id;
  var nota = db[id];

  res.json({
    notas: nota
  });

});
module.exports = app;

var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request= request(host);

//Funcion para definir el contexto de nuestra prueba con Mocha
describe('recurso/notas', function(){

  describe('POST', function(){
    it('deberia crear una nota nueva' , function(){
      var data={
        "nota":{
          "title": "Nota numero 1",
          "description": "Aprendiendo Node.js en platzi",
          "type": "js",
          "body": "Soy el cuerpo de json"
        }
      };

      request
        .post('/notas')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res){
          var body = res.body;

          console.log('body', body);

          expect(body).to.have.property('nota');
          nota = body.nota;

          //Propiedades
          expect(nota).to.have.property('title', 'Nota numero 1');
          expect(nota).to.have.property('description', 'Aprendiendo Node.js en platzi');
          expect(nota).to.have.property('type', 'js');
          expect(nota).to.have.property('body', 'Soy el cuerpo de json');
          expect(nota).to.have.property('id');
          done(err);
        });
        //cuerpo de l solicitud deber tener una nota en JSON
        //NOTA: debe tener una propiedad 'title', 'Nota numero 1'
    });
  });


  describe('GET', function(){
    it('deberia obtener una nota existente' , function(){
      var data={
        "nota":{
          "title": "Nota numero 1",
          "description": "Aprendiendo Node.js en platzi",
          "type": "js",
          "body": "Soy el cuerpo de json"
        }
      };
      //Crear nota nueva
      request
        .post('/notas')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res){
          var id = res.body.nota.id;

          request
            .get('/notas/' +id)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res){
              var nota = res.body.notas;
              // Propiedades
              expect(nota).to.have.property('id', id);
              expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
              expect(nota).to.have.property('description', 'Introduccion a clase');
              expect(nota).to.have.property('type', 'js');
              expect(nota).to.have.property('body', 'soy el cuerpo de json');
              done();
          });

        });
      });
  });
});

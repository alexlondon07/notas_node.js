var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request= request(host);

//Funcion para definir el contexto de nuestra prueba con Mocha
describe('recurso/notas', function(){

  describe('POST', function(){
    it('deberia crear una nota nueva' , function(){
      var data={
        "notas":{
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

          expect(body).to.have.property('nota');//Primera expectativa

          nota =body.nota;

          //Propiedades
          expect(nota).to.have.property('title', 'Nota numero 1');
          expect(nota).to.have.property('description', 'Aprendiendo Node.js en platzi');
          expect(nota).to.have.property('type', 'js');
          expect(nota).to.have.property('body', 'Soy el cuerpo de json');
          expect(nota).to.have.property('id');
          done();
        });
        //cuerpo de l solicitud deber tener una nota en JSON
        //NOTA: debe tener una propiedad 'title', 'Nota numero 1'
    });
  });

});

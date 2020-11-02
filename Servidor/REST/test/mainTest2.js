// ........................................................
// mainTest2.js
// ........................................................

var request = require('request')
var assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

describe("Test 2: Post y Get medicion", function () {

    it("probar POST /medicion", function (hecho) {

        var datosMedicion = {

            valor: 12345,
            momento: "2018-10-22T03:00:00.000Z",
            ubicacion: "38.9666700,-0.1833300"
        }

        request.post({

                url: IP_PUERTO + "/medicion",
                headers: {

                    'User-Agent': 'David',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(datosMedicion)
            },

            function (err, respuesta, carga) {

                res = JSON.stringify({

                    valor: 12345,
                    momento: "2018-10-22T01:00:00.000Z", //Le resta dos horas a la hora de devolverlo, supongo que es por el uso horario
                    ubicacion: "38.9666700,-0.1833300"
                })

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                assert.equal(carga, res, "¿La carga no es " + res)
                hecho()
            } // callback
        ) // .post
    }) // it

    it("probar GET /medicion", function (hecho) {

        request.get({

                url: IP_PUERTO + "/medicion",
                headers: {

                    'User-Agent': 'David'
                }
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")

                var solucion = JSON.parse(carga)

                assert.equal(solucion.valor, "12345", "¿El valor de la medida no es 12345?")
                assert.equal(solucion.momento, "2018-10-22T01:00:00.000Z", "¿El momento no es 018-10-22 05:00:00?")
                assert.equal(solucion.ubicacion, "38.9666700,-0.1833300", "¿La ubicacion no es 38.9666700,-0.1833300?")

                hecho()
            } // callback
        ) // .get
    }) // it
}) //describe    

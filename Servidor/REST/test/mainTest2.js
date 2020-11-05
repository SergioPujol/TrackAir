// ........................................................
// mainTest1.js
// ........................................................

var request = require('request')
var assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

describe("Test 2: Todos los post", function () {

    it("probar POST /usuario", function (hecho) {

        var datosUsuario = {

            id: 1,
            nombre_usuario: "admin",
            contrasenya: "ContraseñaHasheada",
            correo: "micorreo@gmail.com",
            puntuacion: 200
        }

        request.post({

                url: IP_PUERTO + "/asignatura",
                headers: {

                    'User-Agent': 'David',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(datosUsuario)
            },

            function (err, respuesta, carga) {

                res = JSON.stringify({

                    id: 1,
                    nombre_usuario: "admin",
                    contrasenya: "ContraseñaHasheada",
                    correo: "micorreo@gmail.com",
                    puntuacion: 200
                })
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                assert.equal(carga, res, "¿La carga no es " + res)
                hecho()
            } // callback
        ) // .post
    }) // it

    it("probar POST /medicion", function (hecho) {

        var datosMedicion = {

            valor: 12345,
            momento: "2018-10-22 05:00:00",
            ubicacion: "98.92999, 45",
            tipoMedicion: "CO2",
            idUsuario: 1
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
                    momento: "2018-10-22 05:00:00",
                    ubicacion: "98.92999, 45",
                    tipoMedicion: "CO2",
                })

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                assert.equal(carga, res, "¿La carga no es " + res)
                hecho()
            } // callback
        ) // .post
    }) // it
}) //describe    

// ........................................................
// mainTest2.js
// ........................................................

var request = require('request')
var assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

describe("Test 3: Todos los get", function () {

    it("probar GET /mediciones", function (hecho) {

        request.get({

                url: IP_PUERTO + "/mediciones",
                headers: {

                    'User-Agent': 'David'
                }
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")

                var solucion = JSON.parse(carga)

                assert.equal(solucion[0].valor, 12345, "¿El valor no es 12345?")
                assert.equal(solucion[0].momento, "2018-10-22 05:00:00", "¿El momento no es 2018-10-22 05:00:00?")
                assert.equal(solucion[0].ubicacion, "98.92999, 45", "¿La ubicación no es 98.92999, 45?")
                assert.equal(solucion[0].tipoMedicion, "CO2", "¿El tipo de medición no es CO2?")

                hecho()
            } // callback
        ) // .get
    }) // it

    it("probar GET /mediciones/:idUsuario", function (hecho) {

        request.get({

                url: IP_PUERTO + "/mediciones/1",
                headers: {

                    'User-Agent': 'David'
                }
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")

                var solucion = JSON.parse(carga)

                assert.equal(solucion[0].valor, 12345, "¿El valor no es 12345?")
                assert.equal(solucion[0].momento, "2018-10-22 05:00:00", "¿El momento no es 2018-10-22 05:00:00?")
                assert.equal(solucion[0].ubicacion, "98.92999, 45", "¿La ubicación no es 98.92999, 45?")
                assert.equal(solucion[0].tipoMedicion, "CO2", "¿El tipo de medición no es CO2?")

                hecho()
            } // callback
        ) // .get
    }) // it

    it("probar GET /tipoMedicion/:idMedicion", function (hecho) {

        request.get({

                url: IP_PUERTO + "/tipoMedicion/CO2",
                headers: {

                    'User-Agent': 'David'
                }
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")

                var solucion = JSON.parse(carga)

                assert.equal(solucion.id, "CO2", "¿El id no es CO2?")
                assert.equal(solucion.descripcion, "Sensor de CO2", "¿La descripción no es: Sensor de CO2?")
                assert.equal(solucion.limite_max, 5000, "¿El limite no es 5000?")

                hecho()
            } // callback
        ) // .get
    }) // it

    it("probar GET /usuario/:idUsuario", function (hecho) {

        request.get({

                url: IP_PUERTO + "/usuario/1",
                headers: {

                    'User-Agent': 'David'
                }
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")

                var solucion = JSON.parse(carga)

                assert.equal(solucion.id, 1, "¿El id no es 1?")
                assert.equal(solucion.nombre_usuario, "admin", "¿El nombre de usuario no es admin?")
                assert.equal(solucion.contrasenya, "ContraseñaHasheada", "¿La contraseña no es ContraseñaHasheada?")
                assert.equal(solucion.correo, "micorreo@gmail.com", "¿La contraseña no es micorreo@gmail.com?")
                assert.equal(solucion.puntuacion, 200, "¿La puntuación no es 200?")

                hecho()
            } // callback
        ) // .get
    }) // it

    it("probar GET /recompensas", function (hecho) {

        request.get({

                url: IP_PUERTO + "/recompensas",
                headers: {

                    'User-Agent': 'David'
                }
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")

                var solucion = JSON.parse(carga)

                assert.equal(solucion[0].id, 1, "¿El id no es 1?")
                assert.equal(solucion[0].titulo, "Cine", "¿El titulo no es Cine?")
                assert.equal(solucion[0].descripcion, "Entrada de cine", "¿La descripción no es: Entrada de cine?")
                assert.equal(solucion[0].coste, 8000, "¿El coste no es 8000?")


                hecho()
            } // callback
        ) // .get
    }) // it
}) //describe

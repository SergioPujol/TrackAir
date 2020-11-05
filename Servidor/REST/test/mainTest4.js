// ........................................................
// mainTest2.js
// ........................................................

var request = require('request')
var assert = require('assert')

const IP_PUERTO = "http://localhost:8080"

describe("Test 4: Todos los put", function () {

    it("probar PUT /editarUsuario", function (hecho) {

        var datosPersona = {

            id: 1,
            nombre_usuario: "admin",
            contrasenya: "ContraseñaHasheada",
            correo: "micorreo@gmail.com",
            puntuacion: 400
        }

        request.put({

                url: IP_PUERTO + "/editarUsuario",
                headers: {

                    'User-Agent': 'Datos',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(datosPersona)
            },

            function (err, respuesta, carga) {

                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                assert.equal(carga, "Se ha actualizado correctamente el id:1", "¿La carga no es esa?")
                hecho()
            } // callback
        ) // .delete
    }) // it
})//describe
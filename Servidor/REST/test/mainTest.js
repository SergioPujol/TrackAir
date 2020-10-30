var request = require('request')
var assert = require('assert')
const { isMainThread } = require('worker_threads')
const { json } = require('express')

const IP_PUERTO = "http://192.168.43.245:8080"

describe("Test 1: ", function () {
    //3 pruebas: Insertar, Actualizar, Obtener
    it("probar que puedo insertar una medicion /", function(hecho) {
        var dato = {
            valor: 21, 
            momento: "2020-03-26 00:00:05",
            ubicacion: "hola"
        }
        request.post({
            url: IP_PUERTO + "/insertarMedicion",
            headers: {
                'User-Agent': 'SergioPujol',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dato)
        },
        function (error, respuesta, carga) {
            assert.strictEqual(error, null, "¿algun error?")
            assert.strictEqual(respuesta.statusCode, 200, "¿el codigo no es 200?")
            assert.strictEqual(carga, "OK", "¿La carga no es OK?")
            hecho()
        }
        )   
    })

    it("probar que puedo obtener mediciones /", function(hecho) {
        request.get({
            url: IP_PUERTO + "/obtenerMediciones",
            headers: {
                'User-Agent': 'SergioPujol',
            },
        },
        function (error, respuesta, carga) {
            assert.strictEqual(error, null, "¿algun error?")
            assert.strictEqual(respuesta.statusCode, 200, "¿el codigo no es 200?")
            var sol = JSON.parse(carga)
            var jsonString = '{"momento":"2020-03-25T23:00:01.000Z","ubicacion":"hola","valor":21}';
            var res = JSON.parse(jsonString)
            assert.strictEqual(sol[0].momento, res.momento, "¿No es el momento correcto?")
            hecho()
        }
        )   
    })
})
// ........................................................
// mainTest1.js
// ........................................................

const Logica = require("../Logica.js")
var assert = require("assert")

// ........................................................
// main ()
// ........................................................

describe("Test 1: insertar una medicion", function () {

    var laLogica = null

    it("conectar a la base de datos", function (hecho) {

        laLogica = new Logica("bd", function (err) {

            if (err) {

                throw new Error("No he podido conectar con la base de datos")
            }

            hecho()
        })
    }) // it

    it("borrar todas las filas", async function () {

        await laLogica.borrarFilasDeTodasLasTablas()
    }) // it

    it("puedo insertar una medicion", async function () {

        await laLogica.insertarMedicion({

            valor: 12345,
            momento: "2018-10-20T03:00:00.000Z",
            ubicacion: "32.9666700,-0.1833300"

        })

        var res = await laLogica.buscarMedicionConMomentoYUbicacion({momento: "2018-10-20T03:00:00.000Z", ubicacion: "38.9666700,-0.1833300"})
        assert.equal(res.length, 1, "¿no hay un resultado?")
        assert.equal(res[0].momento.toString(), "Mon Oct 20 2018 03:00:00 GMT+0200 (GMT+02:00)", "¿no es ese momento?") //Es otro formato porque es una rowdatapacket, por eso tambien hay que convertirlo a string 
        assert.equal(res[0].ubicacion.toString(), "32.9666700,-0.1833300", "¿no es esa ubicacion?") //Al ser una rowdatapacket hay que convertirlo a string
    }) // it

    it("no puedo insertar una medicion con un momento y una ubicacion que ya está", async function () {

        var error = null
        try {

            await laLogica.insertarMedicion({

                valor: 23456,
                momento: "2018-10-20T03:00:00.000Z",
                ubicacion: "32.9666700,-0.1833300"

            })

        } catch (err) {

            error = err
        }

        assert(error, "¿Ha insertado la ubicacion y el momento que ya estaba? (¿No ha pasado por el catch()?")
    }) // it

    it("cerrar conexión a la base de datos", async function () {

        try {

            await laLogica.cerrar()

        } catch (err) {

            throw new Error("cerrar conexión a BD fallada: " + err)
        }
    }) // it
}) // describe

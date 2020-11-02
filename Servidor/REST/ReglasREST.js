// .....................................................................
// ReglasREST.js
// .....................................................................

module.exports.cargar = function (servidorExpress, laLogica) {

    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba/', function (peticion, respuesta) {

        console.log(" * GET /prueba ")

        respuesta.send("¡Funciona!")
    }) // get /prueba

    // .......................................................
    // GET /medicion
    // .......................................................

    servidorExpress.get('/medicion',  async function (peticion, respuesta) {
        
            console.log(" * GET /medicion ")
            
            // llamo a la función adecuada de la lógica
            var res = await laLogica.buscarUltimaMedicion();
            // si el array de resultados no tiene una casilla ...
            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No encontré la ultima medicion")
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) // get /medicion

    // .......................................................
    // POST /medicion
    // .......................................................

    servidorExpress.post('/medicion', async function (peticion, respuesta) {

        console.log(" * POST /medicion ")

        var datos = JSON.parse(peticion.body)
        
        await laLogica.insertarMedicion(datos)
        var res = await laLogica.buscarMedicionConMomentoYUbicacion(datos)
        
        // supuesto procesamiento
        if (res.length != 1) {

            respuesta.status(404).send("No se ha podido insertar la medicion")
            return
        }

        respuesta.send(JSON.stringify(res[0]))
    }) // post /medicion
} // cargar()

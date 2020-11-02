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
    // GET /mediciones
    // .......................................................

    servidorExpress.get('/mediciones', async function (peticion, respuesta) {

        console.log(" * GET /mediciones ")

        // llamo a la función adecuada de la lógica
        var res = await laLogica.buscarTodasLasMediciones();
        // si el array de resultados no tiene una casilla ...
        if (res.length != 1) {
            // 404: not found
            respuesta.status(404).send("No encontré la medicion")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res[0]))
    }) // get /mediciones

    // .......................................................
    // GET /mediciones/:idUsuario
    // .......................................................

    servidorExpress.get('/mediciones/:idUsuario', async function (peticion, respuesta) {

        console.log(" * GET /mediciones/:idUsuario ")
        
        // averiguo el id
        var id = peticion.params.idUsuario
        // llamo a la función adecuada de la lógica
        var res = await laLogica.buscarMedicionesDeUsuario(id)

        if (res.length != 1) {
            // 404: not found
            respuesta.status(404).send("No encontré la medicion")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res[0]))
    }) // get /mediciones/:idUsuario

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
    
    // .......................................................
    // GET /tipoMedicion/:idMedicion
    // .......................................................

    servidorExpress.get('/tipoMedicion/:idMedicion', async function (peticion, respuesta) {

        console.log(" * GET /tipoMedicion/:idMedicion ")
        
        // averiguo el id
        var id = peticion.params.idMedicion
        // llamo a la función adecuada de la lógica
        var res = await laLogica.buscarTipoMedidicionConID(id)

        if (res.length != 1) {
            // 404: not found
            respuesta.status(404).send("No encontré el tipo de medicion")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res[0]))
    }) // get /tipoMedicion/:idMedicion
    
    // .......................................................
    // GET /login/
    // .......................................................

    servidorExpress.get('/login/:nombre/:contrasenya', async function (peticion, respuesta) {

        console.log(" * GET /login/:idMedicion ")
        
        // averiguo el nombre y la contrasenya
        datos= {
            
            nombreUsuario: peticion.params.nombre,
            contrasenya: peticion.params.contrasenya
        }
        // llamo a la función adecuada de la lógica
        var res = await laLogica.buscarUsuarioConNombreYContrasenya(datos)

        if (res.length != 1) {
            // 404: not found
            respuesta.status(404).send("No encontré el usuario")
            return
        }
        // todo ok
        respuesta.send(JSON.stringify(res[0]))
    }) // get /login
    
    // .......................................................
    // POST /login
    // .......................................................

    servidorExpress.post('/login', async function (peticion, respuesta) {

        console.log(" * POST /login ")

        var datos = JSON.parse(peticion.body)

        await laLogica.insertarUsuario(datos)
        var res = await laLogica.buscarUsuarioConNombreYContrasenya(datos)

        // supuesto procesamiento
        if (res.length != 1) {

            respuesta.status(404).send("No se ha podido insertar el usuario")
            return
        }

        respuesta.send(JSON.stringify(res[0]))
    }) // post /login
    
    
} // cargar()

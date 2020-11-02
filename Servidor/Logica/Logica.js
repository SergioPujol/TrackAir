// .....................................................................
// Logica.js
// .....................................................................

const mysql = require("mysql")

// .....................................................................
// .....................................................................

module.exports = class Logica {

    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................

    constructor(nombreBD, cb) {

        this.laConexion = new mysql.createConnection({
            host: 'localhost',
            user: 'David',
            password: '1234',
            database: nombreBD
        })
        
        this.laConexion.connect(function (err) {
            
            if (err) throw err;
            console.log("Connected!");
            cb(this.laConexion)
        });

    } // ()

    // .................................................................
    // nombreTabla:Texto
    // -->
    // borrarFilasDe() -->
    // .................................................................

    borrarFilasDe(tabla) {

        return new Promise((resolver, rechazar) => {

            this.laConexion.query("delete from " + tabla + ";", (err) => (err ? rechazar(err) : resolver()))
        })
    } // ()

    // .................................................................
    // borrarFilasDeTodasLasTablas() -->
    // .................................................................

    async borrarFilasDeTodasLasTablas() {

        await this.borrarFilasDe("mediciones")
    } // ()

    // .................................................................
    // datos:{valor:Real, momento:Datetime, ubicacion:Texto}
    // -->
    // insertarMedicion() -->
    // .................................................................

    insertarMedicion(datos) {

        var textoSQL = 'insert into mediciones values(?, ?, ?);'

        return new Promise((resolver, rechazar) => {

            this.laConexion.query(textoSQL, [datos.valor, datos.momento, datos.ubicacion], function (err) {

                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    // 
    //datos:{momento:Datetime, ubicacion:Texto}
    // -->
    // buscarMedicionConMomentoYUbicacion() <--
    // <--
    // datos:{valor:Real, momento:Datetime, ubicacion:Texto}
    // .................................................................

    buscarMedicionConMomentoYUbicacion(datos) {

        var textoSQL = "select * from mediciones where momento= ? and ubicacion= ?";
        
        return new Promise((resolver, rechazar) => {
            this.laConexion.query(textoSQL, [datos.momento, datos.ubicacion], (err, res) => {
                (err ? rechazar(err) : resolver(res))
            })
        })
    }

    // .................................................................
    // 
    // buscarUltimaMedicion() <--
    // <--
    // datos:{valor:Real, momento:Datetime, ubicacion:Texto}
    // .................................................................

    buscarUltimaMedicion() {

        var textoSQL = "select * from mediciones order by momento desc limit 1";

        return new Promise((resolver, rechazar) => {
            this.laConexion.query(textoSQL, (err, res) => {
                (err ? rechazar(err) : resolver(res))
            })
        })
    }

    // .................................................................
    // cerrar() -->
    // .................................................................

    cerrar() {

        return new Promise((resolver, rechazar) => {
            
            this.laConexion.end((err) => {

                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
} // class

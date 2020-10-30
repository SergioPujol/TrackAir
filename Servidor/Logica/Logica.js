const mysql = require("mysql");

module.exports = class Logica {

    // Texto --> constructor() , Modifica
    constructor(nombreBDD, callback) {
        this.laConexion = new mysql.createConnection({
            host: "192.168.64.2", //localhost
            user: "sergiopujol",
            password: "12345",
            database: nombreBDD
        });
        this.laConexion.connect(function (error) {
            if (error) callback(error);
            console.log("Conectado");

            callback(this.laConexion)
        })
    }


    // {valor: int , momento: texto, ubicacion: texto} --> insertarMedicion(), Modifica
    insertarMedicion(dato) {
        var textoSQL = 'insert into Mediciones values(?, ?, ?);'
        var valoresParaSQL = {
            $momento: dato.momento,
            $ubicacion: dato.ubicacion,
            $valor: dato.valor
        }
        return new Promise((resolver, rechazar) => {
            this.laConexion.query(textoSQL, [valoresParaSQL.$momento, valoresParaSQL.$ubicacion, valoresParaSQL.$valor], function (error) {
                (error ? rechazar(error) : resolver(true))
            })
        })
    }

    buscarMedicionConMomentoYUbicacion(datos) {
		var textoSQL = "select * from Mediciones where momento = ? and ubicacion = ?;";
		var valoresParaSQL = {
			$momento: datos.momento,
			$ubicacion: datos.ubicacion
		}
		return new Promise((resolver, rechazar) => {
			this.laConexion.query(textoSQL, [valoresParaSQL.$momento,valoresParaSQL.$ubicacion], (err, res) => {
				(
					err ? rechazar(err) : resolver(res))
			})
		})
	} // ()

    // obtenerMedicion() --> {valor: int , momento: tiempo, ubicacion: texto}, Consulta
    obtenerMediciones() {
        var textoSQL = 'select * from Mediciones';
        return new Promise((resolver, rechazar) => {
            this.laConexion.query(textoSQL, (err, res) => {
                (
                    err ? rechazar(err) : resolver(res))
            })
        })
    }

    // cerrar() , Modifica
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.Conexion.close((error) => {
                (error ? rechazar(error) : resolver())
            })
        })
    }

}
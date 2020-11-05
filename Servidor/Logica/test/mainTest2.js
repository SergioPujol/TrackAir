// ........................................................
// mainTest1.js
// ........................................................

const Logica = require("../Logica.js");
var assert = require("assert");
let idUsuario = null;
// ........................................................
// main ()
// ........................................................

describe("Test 2: insertar una medicion", function () {
  var laLogica = null;

  it("conectar a la base de datos", function (hecho) {
    laLogica = new Logica("p3a", function (err) {
      if (err) {
        throw new Error("No he podido conectar con la base de datos");
      }

      hecho();
    });
  }); // it

  it("puedo insertar una medición", async function () {
    let xres = await laLogica.buscarUsuarioConNombreYContrasenya({
      nombreUsuario: "David",
      contrasenya: "ContraseñaHasheada",
    });

    idUsuario = xres[0].id;

    await laLogica.insertarMedicion({
      valor: 12345,
      momento: "2018-10-22 05:00:00",
      ubicacion: "98.92999, 45",
      tipoMedicion: "CO2",
      idUsuario: idUsuario,
    });

    var res = await laLogica.buscarMedicionConMomentoYUbicacion({
      momento: "2018-10-22 05:00:00",
      ubicacion: "98.92999, 45",
    });

    assert.equal(res.length, 1, "¿no hay un resultado?");
    assert.equal(res[0].valor.toString(), "12345", "¿no es ese valor?");
    assert.equal(
      res[0].momento.toString(),
      "Mon Oct 22 2018 05:00:00 GMT+0200 (GMT+02:00)",
      "¿no es ese momento?"
    );
    assert.equal(
      res[0].ubicacion.toString(),
      "98.92999, 45",
      "¿no es esa ubicacion?"
    );
    assert.equal(
      res[0].tipoMedicion.toString(),
      "CO2",
      "¿no es ese tipo de medicion?"
    );
  }); // it

  it("puedo buscar la medición insertada del usuario", async function () {
    let res = await laLogica.buscarMedicionesDeUsuario(idUsuario);

    //console.log(res);
    assert.equal(res.length, 1, "¿no hay un resultado?");
    assert.equal(res[0].valor.toString(), "12345", "¿no es ese valor?");
    assert.equal(
      res[0].momento.toString(),
      "Mon Oct 22 2018 05:00:00 GMT+0200 (GMT+02:00)",
      "¿no es ese momento?"
    );
    assert.equal(
      res[0].ubicacion.toString(),
      "98.92999, 45",
      "¿no es esa ubicacion?"
    );
    assert.equal(
      res[0].tipoMedicion.toString(),
      "CO2",
      "¿no es ese tipo de medicion?"
    );
  }); // it

  it("puedo buscar todas las mediciones", async function () {
    var res = await laLogica.buscarTodasLasMediciones();

    assert.equal(res.length, 1, "¿no hay un resultado?");
    assert.equal(res[0].valor.toString(), "12345", "¿no es ese valor?");
    assert.equal(
      res[0].momento.toString(),
      "Mon Oct 22 2018 05:00:00 GMT+0200 (GMT+02:00)",
      "¿no es ese momento?"
    );
    assert.equal(
      res[0].ubicacion.toString(),
      "98.92999, 45",
      "¿no es esa ubicacion?"
    );
    assert.equal(
      res[0].tipoMedicion.toString(),
      "CO2",
      "¿no es ese tipo de medicion?"
    );
  }); // it

  it("cerrar conexión a la base de datos", async function () {
    try {
      await laLogica.cerrar();
    } catch (err) {
      throw new Error("cerrar conexión a BD fallada: " + err);
    }
  }); // it
}); // describe

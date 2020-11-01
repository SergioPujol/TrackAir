// -------------------------------------
// ------ Autor: Ignasi Marí Giner
// ------ 21-10-2020
// -------------------------------------

class Logica {
  constructor() {}

  contadorTest = 0;

  //Llama al servidor para recuperar las mediciones de la base de datos
  // Devuelve un objeto con los datos.
  // recuperarMediciones() : {valor, ubicacion, momento}
  async recuperarMediciones() {
    let res = await axios.get("http://localhost:3333/mediciones");

    let data = res.data;
    console.log(data);
    return data;
  }

  async recuperarMediciones() {
    let res = await axios.get("http://localhost:3333/mediciones");

    let data = res.data;
    console.log(data);
    return data;
  }

  //Postea mediciones fake con un contador para comprobar que funciona el servidor
  //Devuelve un objeto con {guardado:true} o {guardado:false}
  async testPOST() {
    this.contadorTest++;
    let res = await axios.post("http://localhost:3333/mediciones", {
      valor: this.contadorTest,
      ubicacion: { lat: 11.44231, lng: 98.92999 },
      momento: Date.now().toString(),
    });

    let data = res.data;
    console.log(data);
    return data;
  }

  //Envia un POST para saber si el usuario está en la base de datos
  // {email: Texto, contrasenya: Texto} -> login() -> VoF
  async login(correo, contrasenya) {
    //console.log("LOGIN pass: " + CryptoJS.SHA256(contrasenya).toString());
    try {
      this.contadorTest++;
      let res = await axios.post("http://localhost:3333/login", {
        correo: correo,
        contrasenya: CryptoJS.SHA256(contrasenya).toString(),
      });

      let data = res.data;
      /*console.log("data:");
      console.log(data);
      console.log(res.status);
      return data;*/
      if (res.status != 200) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}

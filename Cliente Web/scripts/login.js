let btnSubmit = document.querySelector("#btnSubmit");
let form = document.querySelector("form");
let inputCorreo = document.querySelector("#inputCorreo");
let inputContrasenya = document.querySelector("#inputContrasenya");

const laLogica = new Logica();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = inputCorreo.value;
  const contrasenya = inputContrasenya.value;

  let promesa = laLogica.login(correo, contrasenya).then((res) => {
    console.log(res);
    
  });
});

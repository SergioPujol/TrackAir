let botonUsuario = document.querySelector(".icono-usuario");
let modal = document.querySelector(".modal");

// Si le da click al botón de usuario, se abre el popup
botonUsuario.addEventListener("click", (e) => {
  modal.style.display = "block";
});

// Si le da click a cualquier cosa que no sea el modal, este se cierra
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

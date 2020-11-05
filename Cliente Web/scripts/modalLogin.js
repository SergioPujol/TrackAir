let botonUsuario = document.querySelector(".icono-usuario");
let modal = document.querySelector(".modal");

// Si le da click al botón de usuario, se abre el popup
botonUsuario.addEventListener("click", (e) => {
  let id = getCookie("id");
  if (id != "") {
    let logout = confirm(`UserId: ${id} \n Quiere cerrar sesión?`);
    if (logout) laLogica.logout();
  } else {
    modal.style.display = "block";
  }
});

// Si le da click a cualquier cosa que no sea el modal, este se cierra
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// texto -> getCookie() -> texto
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

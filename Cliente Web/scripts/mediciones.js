// -------------------------------------
// ------ Autor: Ignasi Marí Giner
// ------ 21-10-2020
// -------------------------------------

//Cuando se carga la página
window.onload = function () {
    main();
};
let laLogica;
let intervalo;
let testMode = false;

// Punto de arranque
function main() {
    //Creamos objeto de la Logica
    laLogica = new Logica();
    //mostrarMediciones();

    //Cada 4 segundos recuperamos los datos

    intervalo = setInterval(() => {
        mostrarMediciones();
    }, 4000);

    //Cada 6 segundos hace post con mediciones fake
    setInterval(() => {
        testPOST();
    }, 6000);

    //Botón para activar y desactivar
    var btn = document.getElementById("btn-test");
    btn.onclick = () => {
        testMode = !testMode;
    };
}
// ()

// mostrarMediciones() llama a la logica.recuperarMediciones y las inserta en el html
function mostrarMediciones() {
    var medicionesContent = document.getElementById("mediciones-content");
    console.log(medicionesContent);

    //console.log("mostrarMediciones()");
    let promesa = laLogica.recuperarMediciones().then((mediciones) => {
        if (mediciones) {
            medicionesContent.innerHTML = "";
            mediciones.forEach((medicion) => {
                //console.log(medicion);
                let row = document.createElement("div");
                row.classList.add("row");

                let divHora = document.createElement("div");
                divHora.innerText = medicion.momento
                    .toString()
                    .replace("T", "  ")
                    .replace("Z", "  ");
                divHora.classList.add("cell");
                let divValor = document.createElement("div");
                divValor.innerText = medicion.valor;
                divValor.classList.add("cell");

                let divUbicacion = document.createElement("div");
                divUbicacion.innerText =
                    "lat: " + medicion.ubicacion.x + ", lng: " + medicion.ubicacion.y;
                divUbicacion.classList.add("cell");

                row.append(divHora);
                row.append(divValor);
                row.append(divUbicacion);
                medicionesContent.appendChild(row);
            });
        } else {
        }
    });
}

//llama a la logica y hace postea mediciones fake
function testPOST() {
    if (testMode) {
        let promesa = laLogica.testPOST().then((res) => {
            console.log(res);
        });
    }
}
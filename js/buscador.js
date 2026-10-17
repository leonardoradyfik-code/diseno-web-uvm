const formulario = document.querySelector(".buscador");
const campo = document.querySelector("#buscar");
const contenido = document.querySelector(".contenido");
const aviso = document.querySelector("#estado-busqueda");

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  contenido.querySelectorAll(".resultado-busqueda").forEach((elemento) => {
    elemento.classList.remove("resultado-busqueda");
  });

  const termino = normalizar(campo.value.trim());

  if (!termino) {
    aviso.textContent = "Escribe una palabra para buscar.";
    aviso.hidden = false;
    campo.focus();
    return;
  }

  const elementos = contenido.querySelectorAll(
    "h1, h2, h3, p, li, figcaption"
  );

  const coincidencias = [...elementos].filter((elemento) =>
    normalizar(elemento.textContent).includes(termino)
  );

  if (coincidencias.length === 0) {
    aviso.textContent = `No encontré “${campo.value.trim()}” en esta página.`;
    aviso.hidden = false;
    return;
  }

  coincidencias.forEach((elemento) => {
    elemento.classList.add("resultado-busqueda");
  });

  aviso.textContent = `Encontré ${coincidencias.length} coincidencia(s).`;
  aviso.hidden = false;

  coincidencias[0].scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});// JavaScript Document
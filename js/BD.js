const form = document.getElementById("form");
const lista = document.getElementById("lista");

// Cuando se envíe el formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evitar recargar la página
  const datos = new FormData(form);

  // Enviar los datos a PHP
  const res = await fetch("api/guardar.php", {
    method: "POST",
    body: datos,
  });

  const text = await res.text();
  if (text.trim() === "ok") {
    alert("Usuario guardado correctamente ✅");
    form.reset();
    cargarUsuarios();
  } else {
    alert("Error al guardar: " + text);
  }
});

// Cargar los usuarios guardados
async function cargarUsuarios() {
  const res = await fetch("api/obtener.php");
  const data = await res.json();

  lista.innerHTML = data
    .map((u) => `<li>${u.nombre} (${u.email})</li>`)
    .join("");
}

// Cargar al iniciar
cargarUsuarios();
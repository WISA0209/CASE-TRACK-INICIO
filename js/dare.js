let diferencia = 0; // diferencia entre hora local y hora de Internet (en ms)

    // ✅ Actualiza el reloj en pantalla cada segundo
    function actualizarReloj() {
      const ahora = new Date(Date.now() + diferencia); // ajustada si hay sincronización
      const horas = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      const segundos = ahora.getSeconds().toString().padStart(2, '0');

      const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                     "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

      const diaSemana = dias[ahora.getDay()];
      const dia = ahora.getDate();
      const mes = meses[ahora.getMonth()];
      const año = ahora.getFullYear();

      document.getElementById("reloj").textContent = `${horas}:${minutos}:${segundos}`;
      document.getElementById("fecha").textContent = `${diaSemana}, ${dia} de ${mes} de ${año}`;
    }

    // 🌐 Intenta obtener hora precisa desde Internet
    async function sincronizarConInternet() {
      try {
        document.getElementById("estado").textContent = "Sincronizando con Internet...";
        const respuesta = await fetch("https://worldtimeapi.org/api/ip");
        const datos = await respuesta.json();
        const horaInternet = new Date(datos.datetime);
        const horaLocal = new Date();
        diferencia = horaInternet.getTime() - horaLocal.getTime(); // ajusta la diferencia
        document.getElementById("estado").textContent = "Sincronizado con hora de Internet ✅";
      } catch (error) {
        document.getElementById("estado").textContent = "No se pudo conectar a Internet. Usando hora local.";
        diferencia = 0;
      }
    }

    // ⏰ Iniciar reloj
    actualizarReloj(); // primera actualización
    setInterval(actualizarReloj, 1000); // cada segundo
    sincronizarConInternet(); // intenta sincronizar una vez al inicio

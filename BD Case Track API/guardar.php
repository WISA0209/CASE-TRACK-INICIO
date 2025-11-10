<?php
// Incluir el archivo de conexión (asegúrate que el nombre sea correcto)
include 'conexiones.php';

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // 1️⃣ Recibir los datos del formulario
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $grado = trim($_POST['grado']);
    $tipoDocumento = trim($_POST['tipoDocumento']);
    $numeroDocumento = trim($_POST['numeroDocumento']);
    $password = trim($_POST['password']);
    $genero = trim($_POST['genero'] ?? '');
    $fechaNacimiento = trim($_POST['fechaNacimiento'] ?? '');
    $telefono = trim($_POST ['telefono'] ?? '');
    $idrol = 2; //1=adminisgtrador, 2= estudiante
    $aceptoTerminos = isset($_POST['acepto_terminos']) ? 1 : 0;

    // 2️⃣ Validar que todos los campos estén completos
    if (empty($nombre) || empty($correo) || empty($grado) || empty($tipoDocumento) ||
        empty($numeroDocumento) || empty($password)) {
        die("❌ Error: Todos los campos son obligatorios.");
    }

    if ($aceptoTerminos !== 1) {
        die("❌ Debes aceptar los términos y condiciones.");
    }

    // 3️⃣ Encriptar la contraseña (seguridad)
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // 4️⃣ Insertar los datos en la tabla `usuarios`
    $sql = "INSERT INTO usuarios (nombre, correo, grado, tipoDocumento, numeroDocumento, password)
            VALUES ('$nombre', '$correo', '$grado', '$tipoDocumento', '$numeroDocumento', '$passwordHash')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
                alert('✅ Registro exitoso. ¡Bienvenido!');
                window.location.href='../Vistas/F_ingreso.html';
              </script>";
    } else {
        echo "❌ Error al registrar: " . $conn->error;
    }

    // 5️⃣ Cerrar la conexión
    $conn->close();

} else {
    echo "⚠️ Acceso no válido. Debes enviar el formulario desde el método POST.";
}
?>
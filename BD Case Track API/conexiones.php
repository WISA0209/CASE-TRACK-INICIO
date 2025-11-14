<?php
//Datos del servidor (xampp local)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "case_track";
//Crear conexion
$conn = new mysqli($servername, $username, $password, $dbname);
//Verificar conexion
if ($conn->connect_error) {
    die("Error de conexion: " . $conn->connect_error);
}
?>
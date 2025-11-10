<?php
include '/BD Case Track API/conexiones.php'; //importar conexion
$result = $conn->query("SELECT * FROM usuarios ORDER BY id DESC");
$usuarios = [];
while ($row = $result->fetch_assoc()){
    $usuarios[] = $row;
}
echo json_encode($usuarios);//convertir los datos a JSON para JS
$conn->close();
?>
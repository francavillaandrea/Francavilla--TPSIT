<?php
if (empty($_POST['nome']) || empty($_POST['classe'])) {
    header("Location: index.php");
    exit;
}

$_SESSION['nome'] = $_POST["nome"];
$_SESSION['classe'] = $_POST["classe"];
$_SESSION['materia'] = $_POST["materia"];

setcookie("studente", $_POST['nome'], time() + 3600);

header("Location: profilo.php")
?>


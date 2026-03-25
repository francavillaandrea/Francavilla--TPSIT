<?php
session_start();
if (!isset(($_SESSION['nome']))) {
    header("Location: index.php");
    exit();
}
$voti = [5, 8, 9, 7, 5, 7, 8, 4, 9, 8, 8, 8, 8];
$media = array_sum($voti) / count($voti);


?>

<!DOCTYPE html>
<html lang="it">

    <head>
        <meta charset="UTF-8">
        <title>Profilo Studente</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body class="bg-light">

        <div class="container mt-5">
            <div class="card p-4 shadow">
                <h2>Profilo Studente</h2>

                <p><strong>Nome:</strong> <?= $_SESSION['nome'] ?> </p>
                <p><strong>Classe:</strong> <?= $_SESSION['classe'] ?></p>
                <p><strong>Materia preferita:</strong> <?= $_SESSION['materia'] ?></p>

                <?php
                if (isset($_COOKIE['studente'])) {
                    echo ("<p class='text-success'>Bentornato, {$_COOKIE['studente']}!</p>");
                }
                ?>
                <h4 class="mt-4">Voti</h4>
                <ul>

                </ul>

                <p><strong>Media:</strong> </p>

                <h5 class="mt-4">Info tecniche</h5>
                <p>Metodo richiesta: </p>

                <a href="logout.php" class="btn btn-danger mt-3">Logout</a>
            </div>
        </div>

    </body>

</html>

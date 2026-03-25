<!DOCTYPE html>
<html lang="it">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Esercitazione PHP - Superglobali</title>
        <!-- Inclusione del CDN di Bootstrap per la grafica -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>

    <body>
        <div class="container mt-5">
            <h1 class="text-center mb-4">Esercitazione PHP: Variabili Superglobali</h1>
            <!-- ===================== -->
            <!-- SEZIONE 1: $_GET -->
            <!-- ===================== -->
            <section class="my-4 p-4 border rounded shadow-sm">
                <h2>1. $_GET</h2>
                <p>$_GET serve per leggere i dati passati tramite URL.</p>

                <a href="index.php?nome=Mario&eta=16" class="btn btn-primary">Clicca qui per passare dati</a>

                <?php
                if (isset($_GET['nome']) && isset($_GET['eta'])) {
                    echo ("<p> Ciao <b> {$_GET['nome']}</b>, hai <b> {$_GET['eta']}</b> anni</p>");
                }
                ?>

            </section>

            <!-- ===================== -->
            <!-- SEZIONE 2: $_POST -->
            <!-- ===================== -->
            <section class="my-4 p-4 border rounded shadow-sm">
                <h2>2. $_POST</h2>
                <p>$_POST si usa per leggere i dati inviati da un form.</p>

                <form method="post">
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome:</label>
                        <input type="text" id="nome" name="nome" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="citta" class="form-label">Città:</label>
                        <input type="text" id="citta" name="citta" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-success">Invia</button>
                </form>
                <?php
                if (!empty($_POST)) {
                    echo ("<p>Nome: <b>{$_POST['nome']}</b> Città: <b> {$_POST['citta']}</b></p>");
                }
                ?>
            </section>

            <!-- ===================== -->
            <!-- SEZIONE 3: $_REQUEST -->
            <!-- ===================== -->
            <section class="my-4 p-4 border rounded shadow-sm">
                <h2>3. $_REQUEST</h2>
                <p>$_REQUEST contiene dati sia da GET che da POST.</p>

                <?php
                if (isset($_REQUEST["nome"])) {
                    echo ("<p> Ciao <b> {$_GET['nome']}</b>, hai <b> {$_GET['eta']}</b> anni</p>");
                }
                ?>

            </section>

            <!-- ===================== -->
            <!-- SEZIONE 4: $_SERVER -->
            <!-- ===================== -->
            <section class="my-4 p-4 border rounded shadow-sm">
                <h2>4. $_SERVER</h2>
                <p>$_SERVER contiene informazioni sul server e sulla richiesta.</p>

                <ul class="list-group">
                    <li class="list-group-item">Nome file: <?php $_SERVER['PHP_SELF']?> </li>
                    <li class="list-group-item">Metodo di richiesta: <?php $_SERVER['REQUEST_METHOD'] ?> </li>
                    <li class="list-group-item">User Agent: <?php $_SERVER['HTTP_USER_AGENT'] ?> </li>
                </ul>
            </section>
        </div>

    </body>

</html>

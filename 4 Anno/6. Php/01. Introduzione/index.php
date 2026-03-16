<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esercizio 1 PHP</title>

    <!-- Bootstrap 5 CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Bootstrap JS CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <link rel="stylesheet" src="./style.css">
</head>

<body>
<div class="container py-5">

    <h1 class="mb-1 fw-bold text-primary">
        <i class="bi bi-code-slash"></i> Esercizio 1 &mdash; Introduzione a PHP
    </h1>
    <p class="text-muted mb-4">Variabili, <code>echo</code> e funzioni di base</p>

    <?php
        $name = "Andrea";
        $surname = "Francavilla";
        $age = 18;
        $currentYear = date("Y");
        $overage = ($age >= 18) ? "Si" : "No";
    ?>

    <!-- Card studente -->
    <div class="card card-studente shadow-sm mb-4" style="max-width: 420px;">
        <div class="card-header bg-primary text-white fw-semibold">
            <i class="bi bi-person-badge"></i> Scheda Studente
        </div>
        <div class="card-body">
            <table class="table table-borderless mb-0">
                <tbody>
                    <tr>
                        <td class="text-muted">Nome</td>
                        <td><strong><?php echo($name);?></strong></td>
                    </tr>
                    <tr>
                        <td class="text-muted">Cognome</td>
                        <td><strong><?php print($surname);?></strong></td>
                    </tr>
                    <tr>
                        <td class="text-muted">Età</td>
                        <td>
                            <span class="badge bg-info text-dark badge-eta">
                                <?= "$age anni";?>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-muted">Anno di nascita</td>
                        <td><?php echo($currentYear-$age)?></td>
                    </tr>
                    <tr>
                        <td class="text-muted">Maggiorenne</td>
                        <td>
                            <?php if($overage == "Si"): ?>
                                <span class="badge bg-success">
                                    Si
                                </span>
                            <?php else:?>
                                <span class="badge bg-danger">
                                    No
                                </span>
                            <?php endif;?>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Saluto generato dalla funzione -->
    <div class="alert alert-primary d-inline-flex align-items-center gap-2" role="alert">
        <i class="bi bi-chat-quote-fill fs-5"></i>
        <span>
            <?php
                function saluta($nome) {
                    return "Ciao, <b>$nome</b>! Benvenuto nel mondo di PHP!";
                }
                echo(saluta($name));
            ?>
        </span>
    </div>
    <hr class="my-4">
</div>

</body>
</html>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Portale Studenti - Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="card p-4 shadow">
        <h2 class="mb-3">Accesso Studente</h2>

        <form method="post" action="login.php">
            <div class="mb-3">
                <label class="form-label">Nome</label>
                <input type="text" name="nome" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Classe</label>
                <input type="text" name="classe" class="form-control" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Materia preferita</label>
                <select name="materia" class="form-select">
                    <option>Informatica</option>
                    <option>Matematica</option>
                    <option>Storia</option>
                    <option>Inglese</option>
                </select>
            </div>

            <button class="btn btn-primary">Entra</button>
        </form>
    </div>
</div>

</body>
</html>

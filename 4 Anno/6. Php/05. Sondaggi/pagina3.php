<!doctype html>
<html>

    <head>
        <meta charset="UTF-8">
        <title>Risultati Sondaggio</title>
        <link rel="stylesheet" href="./lib/bootstrap@4/bootstrap.min.css" />
        <link rel="stylesheet" href="./css/pagina3.css" />
        <script src="./lib/bootstrap@4/jquery-3.5.1.min.js"></script>
        <script src="./lib/bootstrap@4/bootstrap.bundle.min.js"></script>
        <script defer type="application/javascript" src="./pagina3.js"></script>
    </head>

    <body>
        <?php
        require("./ClsMySQL.php");
        $db = new MySQL();
        $idSondaggio = $db->check_params("id");
        $optRisposta = $db->check_params("optRisposta");

        $cookieName = "voted_$idSondaggio";
        $alreadyVoted = isset($_COOKIE[$cookieName]);

        if (!$alreadyVoted) {
            //Creazione query di aggiornamento
            //Non posso parametrizzare i nomi dei campi
            $sql = "UPDATE sondaggi SET $optRisposta = $optRisposta + 1 WHERE id = ?";
            $res = $db->executeNonQuery($sql, [$idSondaggio], "i");
            // Set cookie for 7 days
            setcookie($cookieName, "1", time() + 7 * 24 * 3600);
        }

        // QUery per prendere risultati attuali
        $res = $db->execute_query("SELECT titolo, domanda, nSi, nNo, nNS FROM sondaggi WHERE id = ?", [$idSondaggio], "i");
        $sondaggio = $res[0];
        $nSi = $sondaggio['nSi'];
        $nNo = $sondaggio['nNo'];
        $nNS = $sondaggio['nNS'];
        $total = $nSi + $nNo + $nNS;
        $percSi = $total > 0 ? round(($nSi / $total) * 100, 2) : 0;
        $percNo = $total > 0 ? round(($nNo / $total) * 100, 2) : 0;
        $percNS = $total > 0 ? round(($nNS / $total) * 100, 2) : 0;

        $db->close_connection();
        ?>
        <div class="container">

            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <h2>Risultati del Sondaggio: <?php echo $sondaggio['titolo']; ?></h2>
                    <p><?php echo $sondaggio['domanda']; ?></p>
                    <?php if ($alreadyVoted): ?>
                        <p style="color: red;">Hai già votato per questo sondaggio questa settimana.</p>
                    <?php else: ?>
                        <p>Grazie per aver votato!</p>
                    <?php endif; ?>
                    <h3>Risultati finora:</h3>
                    <p>Numero totale dei votanti: <?php echo $total; ?></p>
                    <p>Percentuale dei Sì: <?php echo $percSi; ?>%</p>
                    <p>Percentuale dei No: <?php echo $percNo; ?>%</p>
                    <p>Percentuale dei Non so: <?php echo $percNS; ?>%</p>
                </div>
                <div class="col-sm-3"></div>
                <button><a href="index.php">Torna alla home</a> </button>
            </div>
        </div>
    </body>

</html>

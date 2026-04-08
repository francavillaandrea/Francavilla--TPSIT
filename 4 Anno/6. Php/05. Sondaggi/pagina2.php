<!doctype html>
<html>

    <head>
        <meta charset="UTF-8">
        <title>Verifica</title>
        <link rel="stylesheet" href="./lib/bootstrap@4/bootstrap.min.css" />
        <script src="./lib/bootstrap@4/jquery-3.5.1.min.js"></script>
        <script src="./lib/bootstrap@4/bootstrap.bundle.min.js"></script>
        <!-- user link -->
        <script defer type="application/javascript" src="./js/pagina2.js"></script>
    </head>

    <body>
        <?php
        require("./ClsMySQL.php");
        $db = new MySQL();
        $id_sondaggio = $db->check_params("lstSondaggi");

        $res = $db->execute_query(
            "SELECT * FROM sondaggi WHERE id = ?;",
            [$id_sondaggio],
            "i"
        );
        $sondaggio = $res[0];
        /* echo "<pre>";
        print_r($res);
        echo "</pre>"; */
        ?>
        <div class="container">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">

                    <form class="text-center">
                        <?php
                        echo "<h2>Sondaggio su: {$sondaggio['titolo']}</h2>";
                        echo "<hr/>";
                        echo "<img src='./img/$sondaggio[img]' />";
                        echo "<h5>Rispondi alla domanda: </h5>";
                        echo "{$sondaggio['domanda']}";
                        echo "<br/>";
                        ?>
                        <div class="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optRisposta" value="nSi">Sì
                            </label>
                        </div>
                        <div class="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optRisposta" value="nNo">No
                            </label>
                        </div>

                        <div class="form-check-inline">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optRisposta" value="nNS">Non so
                            </label>
                        </div>

                        <!-- Campo non visibile nel browser -->
                        <!-- Inserisco l'id del sondaggio così da facilitare l'aggiornamento
                         in pagina3.php: verrà inviato dal submit insieme a optRisposta -->
                        <input type="hidden" name="id" value='<?= $id_sondaggio ?>'>

                        <br><br>
                        <div class="form-button text-center">
                            <input type="button" id="btnInvia" class="btn btn-primary" value="Invia">
                        </div>
                    </form>

                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
        <?php $db->close_connection(); ?>
    </body>

</html>

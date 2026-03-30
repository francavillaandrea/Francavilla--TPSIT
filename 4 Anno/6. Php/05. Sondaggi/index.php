<!DOCTYPE html>
<html lang="it">

    <head>
        <meta charset="UTF-8" />
        <title> Sondaggi </title>
        <script defer type="application/javascript" src="index.js"></script>
    </head>

    <body>
        <?php
        require("ClsMySQL.php");
        //Creiamo la connesione al DB
        $dbClient = new ClsMySQL();
        //sql è case sensitive sui campi ma non sulle istruzioni delle query (select, from, like ecc)
        $sql = "SELECT id,titolo FROM sondaggi";
        //richiama il metodo che manda la query al db
        $data = $dbClient->select($sql);
        ?>
        <div id="wrapper">
            <h1 align="center"> Seleziona il sondaggio a cui desideri partecipare</h1>
            <hr>
            <h3>Sondaggi disponibili:</h3>
            <form>
                <select id='lstSondaggi' name='lstSondaggi'>
                    <?php
                    //echo ("<option>Ok</option>");
                    ?>
                </select>
                <button type="button" id="btnInvia"> invia </button>
            </form>
        </div>

    </body>

</html>

<?php

class ClsMySQL
{
    const DB_NAME = "4b_sondaggi";

    const DB_HOST = "localhost";
    const DB_USER = "root";
    const DB_PASS = "";
    const DB_PORT = 3306;
    private $connection;

    public function __construct()
    {
        //abilita la generaziobne degli errori che di default su Php è bloccata
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        try {
            //libreria php che gestisce interfacciamento con MySql (la i finale sta per improved)
            //il costruttore si aspetta 5 costanti, ovvero quelle sopra e per usare le costanti su usa la sintassi self::
            new mysqli(
                self::DB_HOST,
                self::DB_USER,
                self::DB_PASS,
                self::DB_NAME,
                self::DB_PORT //Questa è facoltativa in caso usa quella di default MySQL (3306)
            );
        } catch (mysqli_sql_exception $err) {
            die("Errore di connessione al database" . $err->getMessage());
        }
    }

    public function select($query, $params = array(), $types = "")
    {
        try {
            $statement = $this->prepareAndBind($query, $params, $types);
            $statement->execute();
        } catch (mysqli_sql_exception $err) {

        }
    }
}
?>


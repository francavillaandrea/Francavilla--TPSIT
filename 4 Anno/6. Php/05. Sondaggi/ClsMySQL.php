<?php
/**
 * Helper class for mysqli.
 */
class MySQL
{
    public const DB_NAME = "4b_sondaggi";
    public const DB_HOST = "localhost";
    public const DB_USER = "root";
    public const DB_PASS = "";
    private $connection;

    public function __construct()
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        try {
            $this->connection = new mysqli(MySQL::DB_HOST, MySQL::DB_USER, MySQL::DB_PASS, MySQL::DB_NAME);
        } catch (Exception $ex) {
            die("Errore connessione database {$ex->getMessage()}" . PHP_EOL);
        }
    }

    public function execute_query($sql, $params = [], $types = "")
    {
        try {
            $statement = $this->prepareAndBind($sql, $params, $types);
            $statement->execute();
            $rs = $statement->get_result();
            $statement->close();
            // fetch_all trasforma il recordset di get_result in array (Associativo con MYSQLI_ASSOC | Enumerativo con MYSQLI_NUM)
            return $rs->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $ex) {
            $this->close_connection();
            die("Errore esecuzione query {$ex->getMessage()}" . PHP_EOL);
        }
    }

    public function executeNonQuery($sql, $params = [], $types = "")
    {
        try {
            $statement = $this->prepareAndBind($sql, $params, $types);
            //Eseguo query e salvo totale dei record interessati
            $rowsAffected = $statement->execute();
            //Restituisce l'id dell'ultimo inserimento
            $resId = $this->connection->insert_id;
            $statement->close();
            return $resId ?: $rowsAffected;


        } catch (Exception $ex) {
            $this->close_connection();
            die("Errore esecuzione query {$ex->getMessage()}" . PHP_EOL);
        }
    }

    public function close_connection()
    {
        $this->connection->close();
    }

    public function check_params($param_name)
    {
        if (!isset($_REQUEST[$param_name])) {
            http_response_code(400);
            die("Parametro mancante: $param_name");
        }

        return $_REQUEST[$param_name];
    }

    /**
     * Crea uno statement in cui i segnaposto della query vengono sostituiti dai parametri.
     * @param mixed $query
     * @param mixed $params
     * @param mixed $types
     * @return bool|mysqli_stmt
     */
    private function prepareAndBind($query, $params, $types)
    {
        $statement = $this->connection->prepare($query);

        if ($statement == false) {
            $this->close_connection();
            die("Errore nella preparazione della query {$this->connection->error}");
        }

        if (!empty($params)) {
            if (!$statement->bind_param($types, ...$params)) {
                $this->close_connection();
                die("Errore nel bind dei parametri {$statement->error}");
            }
        }

        return $statement;
    }
}

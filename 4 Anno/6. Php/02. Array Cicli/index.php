<!-- Inclusione del CDN di Bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<div class="container">
    <!-- Sezione 1: Introduzione -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>1. Introduzione ai Cicli e Array in PHP</h2>
        <p>In questa sezione vedremo l'uso dei cicli e degli array in PHP, con vari esempi pratici di come manipolare i
            dati e usarli nei nostri script.</p>
    </section>

    <!-- Sezione 2: Trovare il numero maggiore in un array -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>2. Trovare il numero maggiore nell'array</h2>
        <?php
        $vNumeri = [4, 7, 1, 8, 10, 5];
        $max = $vNumeri[0];

        for ($i = 1; $i < count($vNumeri); $i++) {
            if ($vNumeri[$i] > $max) {
                $max = $vNumeri[$i];
            }
        }
        echo ("<p> Il numero maggiore dell'array è <b>$max</b></p>");
        //echo("<p>Il numero maggiore dell'array è <b>".max($vNumeri);"</b></p>")
        ?>

    </section>

    <!-- Sezione 3: Stampa tutti gli elementi di un array con foreach -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>3. Stampa tutti gli elementi di un array con <code>foreach</code></h2>
        <?php
        $vFrutti = ["Mela", "Banana", "Arancia", "Pera"];
        echo ("<ul class='list-group'>");
        foreach ($vFrutti as $frutto) {
            echo ("<li class='list-group-item'>$frutto</li>");
        }
        echo ("</ul>");
        ?>

    </section>

    <!-- Sezione 4: Stampare solo i numeri pari -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>4. Stampare solo i numeri pari</h2>
        <?php
        $vNumeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        echo ("<ul class='list-group'>");
        foreach ($vNumeri as $n) {
            if ($n % 2 == 0) {
                echo "<li class='list-group-item'>$n</li>";
            }
        }
        ?>


    </section>

    <!-- Sezione 5: Invertire l'ordine di un array -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>5. Invertire l'ordine di un array</h2>
        <?php
        $vNumeri = [1, 2, 3, 4, 5];
        $vNumeriInv = [];

        for ($i = count($vNumeri) - 1; $i >= 0; $i--) {
            $vNumeriInv[] = $vNumeri[$i];

        }
        echo ("<p>Array Invertito</p>");
        echo json_encode($vNumeriInv);
        echo ("<br><pre>");
        echo (print_r($vNumeriInv));
        echo ("</pre> <br>");
        echo (implode(", ", $vNumeriInv));
        ?>

    </section>

    <!-- Sezione 6: Trova una chiave in un json -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>6. Trova una chiave in un JSON</h2>
        <?php
        $persone = array(
            "Pietro" => 32,
            "Anna" => 67,
            "Giovanni" => 58
        );

        foreach ($persone as $key => $value) {
            if ($key == "Anna") {
                echo ("<p>L'età di Anna è <b>$value</b> anni </p>");
            }
        }

        echo ("<p>L'età di Pietro è <b>" . $persone["Pietro"] . "</b> anni </p>");
        ?>
    </section>

    <!-- Sezione 7: Trova un record in un vettore enumerativo di json -->
    <section class="my-4 p-4 border rounded shadow-sm">
        <h2>7. Trova un record in un vettore enumerativo di JSON</h2>
        <?php
        $persone = [
            [
                "nome" => "Pietro",
                "residenza" => "Torino",
                "eta" => 32,
                "genere" => "M"
            ],
            [
                "nome" => "Anna",
                "residenza" => "Alba",
                "eta" => 67,
                "genere" => "F"
            ],
            [
                "nome" => "Luca",
                "residenza" => "Fossano",
                "eta" => 75,
                "genere" => "M"
            ],
        ];
        //echo ("<pre>" . json_encode($persone, JSON_PRETTY_PRINT) . "</pre>");
        foreach ($persone as $key => $person) {
            if (isset($person["nome"]) && $person["nome"] == "Anna") {
                echo ("<pre>" . json_encode($person, JSON_PRETTY_PRINT) . "</pre>");
            }
        }
        ?>

    </section>
</div>

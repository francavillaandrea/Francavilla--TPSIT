<!DOCTYPE html>
<html lang="it">

<head>
	<meta charset="UTF-8" />
	<title> Sondaggi </title>
	<script defer src="./js/index.js"></script>
</head>

<body>
	<?php
		require("./ClsMySQL.php");
		$db = new MySQL();
		$result = $db->execute_query("SELECT id, titolo FROM sondaggi;");
	?>
	<div id="wrapper">
		<h1 align="center"> Seleziona il sondaggio a cui desideri partecipare</h1>
		<hr>
		<h3>Sondaggi disponibili:</h3>
		<form>
			<select id='lstSondaggi' name='lstSondaggi'>
				<?php
				foreach ($result as $item) {
					echo "<option value={$item['id']}>{$item['titolo']}</option>";
				}
				?>`
			</select>
			<button type="button" id="btnInvia"> invia </button>
		</form>
	</div>
	<?php $db->close_connection(); ?>
</body>

</html>
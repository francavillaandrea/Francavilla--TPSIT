<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Verifica</title>
	<link rel="stylesheet" href="./bootstrap@4/bootstrap.min.css" />
	<script src="./bootstrap@4/jquery-3.5.1.min.js"></script>
	<script src="./bootstrap@4/bootstrap.bundle.min.js"></script>
	<script defer type="application/javascript" src="pagina2.js"></script>
</head>

<body>
 <div class="container">

		
	<div class="row">
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
	
			<form class="text-center">
			
				<div class="form-check-inline">
					<label class="form-check-label">
						<input type="radio" class="form-check-input" 
						       name="optRisposta" value="nSi" >Sì
					</label>
				</div>
				<div class="form-check-inline">
					<label class="form-check-label">
						<input type="radio" class="form-check-input" 
						       name="optRisposta" value="nNo" >No
					</label>
				</div>

				<div class="form-check-inline">
					<label class="form-check-label">
						<input type="radio" class="form-check-input" 
						       name="optRisposta" value="nNs" >Non so
					</label>
				</div>

				
				<input type="hidden" name="id" value='<?php echo($id) ?>'>		
				
				<br><br>
				<div class="form-button text-center">
					<input type="button" id="btnInvia" 
					       class="btn btn-primary" value="Invia">
				</div>
			</form>
			
		</div>
		<div class="col-sm-3"></div>
	</div>
 </div>
</body>
</html>
window.onload=function(){
	
    const body = document.body;
    const toggleButton = document.querySelector('.theme-button');

    toggleButton.addEventListener('click', function(){
        //se body contiene la classe dark-mode la toglie 
        //altrimenti la aggiunge 
        body.classList.toggle('dark-mode');
 
		// toggleButton.innerHTML = body.classList.contains('dark-mode') ? '🌙' : '☀️';
	    if(body.classList.contains('dark-mode'))
		   toggleButton.innerHTML = '&#x1F319;' 
		else
           // Unicode emoji SUN è su 2 + 2 bytes	
		   toggleButton.innerHTML = '&#x2600;&#xFE0F;'
    });

}

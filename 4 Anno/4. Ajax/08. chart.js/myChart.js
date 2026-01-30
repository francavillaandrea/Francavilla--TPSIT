"use strict";

// Classe di visualizzazione per un diagramma a barre
// (singolo dataset). Colore e spessore del bordo sono fissi

class BarChart {

 #chartOptions = {
	type: "bar",   // pie, doughnut, line, radar
	data: {
		"labels": [], 
		"datasets": [{	
            //	label riassuntiva di ogni singolo dataset	
			"label": "n. persone = ",
			"data": [],
			"backgroundColor": [],
			"borderColor": "#555",
			"borderWidth": 1  // default=2  
		}]
	},
	options: {
		// scales Y è relativo solo ai diagrammi a barre
		scales: {            
			y: {						 
				suggestedMax: +1,
				suggestedMin: -1,
				beginAtZero: true
			}
		},
		plugins: {			
			title: {
				display: true,
				text: 'Main Title',
				font: {
					size: 20,
					weight: 'bold',
					family: 'Arial'
				},
				color: '#333'
			},
			// visualizzazione e posizione della label di ogni singolo dataset
			// true ha senso per diagrammi a torta o a barre multiple
			legend: {           
				display: false, // permane comunque la visualizzazione sull'hover
				//  position: 'top', 
			}, 
		},
		// impostzione del responsive
		responsive:true,
		aspectRatio:true,
		maintainAspectRatio:false,
	}	 
 }
 
 setChartOptions(title, keysArray, valuesArray, colorsArray, maxValue){
	this.#chartOptions.options.plugins.title.text = title
	this.#chartOptions.data.labels = keysArray
	this.#chartOptions.data.datasets[0].data = valuesArray
	this.#chartOptions.data.datasets[0].backgroundColor = colorsArray
	this.#chartOptions.options.scales.y.suggestedMax = maxValue + 1
 }
 
 getChartOptions(){
	 return this.#chartOptions
 }
 
 setWhiteBackground(canvas){
	const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);	 
 }
  
} // End Class

let barChart = new BarChart()

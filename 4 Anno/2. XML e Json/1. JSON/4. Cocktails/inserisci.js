let ingredients = JSON.parse(DBingredients);
let ings = ingredients["ingredients"];
let cocktails = JSON.parse(DBcocktails);
let drinks =  cocktails["drinks"];


let img="./cocktail.jpg";

btnSalva.addEventListener("click", SaveDrink);
btnAnnulla.addEventListener("click", Return);

visualizzaListbox();

function visualizzaListbox(){
    let ingredientsVet = [];

    for(let ing of ings){
      if(!ingredientsVet.includes(ing.strIngredient1)){
        ingredientsVet.push(ing.strIngredient1);
      }
    }

    ingredientsVet.sort();
    
    for(let ing of ingredientsVet){
        let opt = document.createElement("option");
        lstIngredienti.appendChild(opt);
        opt.textContent = ing;
        opt.value = ing;
    }
    lstIngredienti.selectedIndex = -1;
}

function SaveDrink(){
  if(txtId.value == "" || txtName.value == "" || lstIngredienti.selectedIndex == -1){
    alert("tutti i campi devono essere compilati");
  }
  else{
    let opt;

    if(optAlcoholic.checked){
      opt = "Alcoholic";
    }
    else{
      opt = "Non alcoholic";
    }

    let newDrink={
      "idDrink": txtId.value,
      "strDrink": txtName.value,
      "strAlcoholic": opt,
      "strDrinkThumb": img,
      "strIngredient1": lstIngredienti.value
    }

    drinks.push(newDrink);
    localStorage.setItem("drinks", JSON.stringify(drinks));

    console.log(drinks);


    location.href = "./index.html";
  }
}

function Return(){
  location.href = "./index.html";
}
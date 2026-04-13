
btnInvia.addEventListener("click", function(){
    const FORM = this.parentElement.parentElement;
    FORM.method = "POST";
    FORM.action = "./pagina3.php";
    FORM.submit();
});
maltir.color = {};

maltir.color.putButton = function(){
	var positionButton = $("#ah_mid h2");
	
	//Create an input type dynamically.
	var form = document.createElement("form");
    var element1 = document.createElement("input");
	var element2 = document.createElement("input");
	var element3 = document.createElement("input");
	var button = document.createElement("input");
 
    //Assign different attributes to the element.
	form.setAttribute("style", "text-align:right;margin-top:-20px;");
	form.setAttribute("type", "post");
	form.setAttribute("onsubmit", "return false;"); //a ajouter la fonction pour modifier la couleur par défaut
	
    element1.setAttribute("type", "color");
	element1.setAttribute("title", "Couleur principal");
    element1.setAttribute("name", "colorMain");
	element1.setAttribute("id", "colorMain");
	
	element2.setAttribute("type", "color");
	element2.setAttribute("title", "Couleur RP");
    element2.setAttribute("name", "colorChucho");
	element2.setAttribute("id", "colorChucho");
	
	element3.setAttribute("type", "color");
	element3.setAttribute("title", "Couleur arrière-plan");
    element3.setAttribute("name", "colorBack");
	element3.setAttribute("id", "colorBack");
	
	button.setAttribute("type", "submit");
	button.setAttribute("value", "edit");
	
	form.appendChild(element1);
	form.appendChild(element2);
	form.appendChild(element3);
	form.appendChild(button);
	positionButton[0].appendChild(form);
}
var theTitle=document.title;
var check = self.setInterval(function(){testNewMessageChat()},100);
var checkAttack = self.setInterval(function(){newAttack()},10000);
var childCount=$("#chatmsgtable tbody").children().length;
var count = 0;
var lolchat = {};


window.onclick=function(){
	document.title=theTitle;
	count=0;
}
window.onload=function(){
  boutonAttaque();
   
   document.getElementById("btnMutePalais").onclick= function () {  
		if(document.getElementById("btnMutePalais").value  ==="sonP")
		  {
				
				document.getElementById("btnMutePalais").value = "muteP";
		  }
		  else
		  {
				document.getElementById("btnMutePalais").value = "sonP";

			}
	};
   document.getElementById("btnMuteCombat").onclick=function () { 
		if(document.getElementById("btnMuteCombat").value === "sonC")
	  {
			document.getElementById("btnMuteCombat").value = "muteC";

	  }
	  else
	  {
			document.getElementById("btnMuteCombat").value = "sonC";

		} 
	};

/*	lolchat.color.putButton();
	lolchat.bdm.open();
	lolchat.bdm.createTable();
	lolchat.bdm.temp();
	lolchat.bdm.getByMembre('0',lolchat.bdm.loadColorMembre);
	f
	document.getElementById("editDefaultBtn").onclick=function(){lolchat.color.edit('0');};*/
	
}

function boutonAttaque()
{
	var positionButton = $("#ah_mid h1");
	
	var  boutonMute1 = document.createElement("input");
	var boutonMute2 = document.createElement("input");
	var form = document.createElement("form");
  	
	  //Assign different attributes to the element.
	form.setAttribute("style", "text-align:left;");
	form.setAttribute("type", "post");
	form.setAttribute("onsubmit", "return false;"); 
	
	boutonMute1.setAttribute("type", "button");
	boutonMute1.setAttribute("value", "sonC");
	boutonMute1.setAttribute("id", "btnMuteCombat");
	
	boutonMute2.setAttribute("type", "button");
	boutonMute2.setAttribute("value", "sonP");
	boutonMute2.setAttribute("id", "btnMutePalais");
	
	form.appendChild(boutonMute1);
	form.appendChild(boutonMute2);
	positionButton[0].appendChild(form);
}



document.getElementById("chatinput").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    if (e.keyCode == 13) { childCount++;}
}, false);

function testNewMessageChat(){
	if($("#uchat").attr("style")=="display: block;"){
		titleChange();
	}
	var child = $("#chatmsgtable tbody").children().length;
	if(child>childCount){
		titleChange();
		count++;
		titleChangeNumber(count);
		childCount=child;
		lolchat.bdm.getByMembre('0',lolchat.color.changeColor);
	}
}

function titleChange(){

	document.title="*Nouveau message*";
	if( document.getElementById("btnMutePalais").value  ==="muteP")
	{
		var newMessageSound = new Audio('http://s1download-universal-soundbank.com/mp3/sounds/newemail.mp3');
		newMessageSound.play();
	}
}

function titleChangeNumber(number){
	document.title="("+number+") " + document.title;
}

function newAttack(){
	if($("#cbtbadge").attr("style")=="display: block;" && document.getElementById("btnMuteCombat").value === "muteC"){
		var newMessageSound = new Audio('http://s1download-universal-soundbank.com/mp3/sounds/4212.MP3');
		newMessageSound.play();
	}
}

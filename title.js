var theTitle=document.title;
var check = self.setInterval(function(){testNewMessageChat()},100);
//var checkAttack = self.setInterval(function(){newAttack()},10000);
var childCount=$("#chatmsgtable tbody").children().length;
var count = 0;
var lolchat = {};


window.onclick=function(){
	document.title=theTitle;
	count=0;
}
setTimeout(function(){

  //pour pouvoir selectionner le texte a la souris
  document.body.onmousedown= function (e){
      return true;
  };

  boutonSound();
   /*document.getElementById("btnMuteCombat").onclick=function () { 
		if(document.getElementById("btnMuteCombat").src === "http://images.fire-pigeon.com/uploads/1404008976.png")
	  {
			document.getElementById("btnMuteCombat").src = "http://images.fire-pigeon.com/uploads/1404009008.png";
	  }
	  else
	  {
			document.getElementById("btnMuteCombat").src = "http://images.fire-pigeon.com/uploads/1404008976.png";
		} 
	};*/
}, 2000);

function boutonSound()
{
	var positionButton = $("#uname .name");
	
	var  boutonMute1 = document.createElement("input");
	//var boutonMute2 = document.createElement("input");
	var form = document.createElement("form");

	form.setAttribute("style", "text-align:left;");
	form.setAttribute("type", "post");
	form.setAttribute("onsubmit", "return false;"); 
	
	boutonMute1.setAttribute("type", "image");
	boutonMute1.setAttribute("id", "btnMutePalais");
	boutonMute1.setAttribute("value", "palais");
	boutonMute1.setAttribute("style", "padding:0px 5px 0px 0px;");
	boutonMute1.setAttribute("src", "http://images.fire-pigeon.com/uploads/1404008976.png");
	
	/*boutonMute2.setAttribute("type", "image");
	boutonMute2.setAttribute("id", "btnMuteCombat");
	boutonMute2.setAttribute("value", "combat");
	boutonMute2.setAttribute("style", "padding:0px 0px 0px 5px;");
	boutonMute2.setAttribute("src", "http://images.fire-pigeon.com/uploads/1404008976.png");
	*/
	form.appendChild(boutonMute1);
	//form.appendChild(boutonMute2);
	positionButton[0].appendChild(form);
	
 document.getElementById("btnMutePalais").onclick= function () {  
	if(document.getElementById("btnMutePalais").src  ==="http://images.fire-pigeon.com/uploads/1404008976.png")
	  {
			document.getElementById("btnMutePalais").src = "http://images.fire-pigeon.com/uploads/1404009008.png";
	  }
	  else
	  {
			document.getElementById("btnMutePalais").src = "http://images.fire-pigeon.com/uploads/1404008976.png";
	  }
	};
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
	}
}

function titleChange(){

	document.title="*Nouveau message*";
	if( document.getElementById("btnMutePalais").src  ==="http://images.fire-pigeon.com/uploads/1404009008.png")
	{
		var newMessageSound = new Audio('http://s1download-universal-soundbank.com/mp3/sounds/newemail.mp3');
		newMessageSound.play();
	}
}

function titleChangeNumber(number){
	document.title="("+number+") " + document.title;
}

function newAttack(){
	if($("#cbtbadge").attr("style")=="display: block;" && document.getElementById("btnMuteCombat").src === "http://images.fire-pigeon.com/uploads/1404009008.png"){
		var newMessageSound = new Audio('http://s1download-universal-soundbank.com/mp3/sounds/4212.MP3');
		newMessageSound.play();
	}
}

var theTitle=document.title;
var check = setInterval(function(){testNewMessageChat()},100);
//var checkAttack = setInterval(function(){newAttack()},10000);
var childCount=$("#chatmsgtable tbody").children().length;
var count = 0;
var lolchat = {};
var palaisOn="http://images.fire-pigeon.com/uploads/1414722342.png";
var palaisOff="http://images.fire-pigeon.com/uploads/1414722316.png";
var attackOn="http://images.fire-pigeon.com/uploads/1414723652.png";
var attackOff="http://images.fire-pigeon.com/uploads/1414723631.png";

//pour pouvoir selectionner le texte a la souris
document.body.onmousedown= function (e){
	return true;
};

window.onclick=function(){
	document.title=theTitle;
	count=0;
}
setTimeout(function(){
	boutonSound();
	var cookSoundPalais = readCookie('palais');
	var cookSoundAttack = readCookie('attack');
	if(cookSoundPalais){
		if(cookSoundPalais==="true")
			document.getElementById("btnMutePalais").src = palaisOn;
		else if(cookSoundPalais==="false")
			document.getElementById("btnMutePalais").src = palaisOff;
	}
	else
		createCookie('palais','false',30);
	/*if(cookSoundAttack){
		if(cookSoundAttack==="true")
			document.getElementById("btnMuteCombat").src = attackOn;
		else if(cookSoundAttack==="false")
			document.getElementById("btnMuteCombat").src = attackOff;
		}
	else
		createCookie('attack','false',30);*/
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
	boutonMute1.setAttribute("src", palaisOff);

	/*boutonMute2.setAttribute("type", "image");
	boutonMute2.setAttribute("id", "btnMuteCombat");
	boutonMute2.setAttribute("value", "combat");
	boutonMute2.setAttribute("style", "padding:0px 0px 0px 5px;");
	boutonMute2.setAttribute("src", attackOff);*/

	form.appendChild(boutonMute1);
	//form.appendChild(boutonMute2);
	positionButton[0].appendChild(form);

	document.getElementById("btnMutePalais").onclick= function () {
		if(document.getElementById("btnMutePalais").src  ===palaisOff)
		{
			document.getElementById("btnMutePalais").src = palaisOn;
			createCookie('palais','true',30);
		}
		else
		{
			document.getElementById("btnMutePalais").src = palaisOff;
			createCookie('palais','false',30);
		}
	};
	/*document.getElementById("btnMuteCombat").onclick=function () {
		if(document.getElementById("btnMuteCombat").src === attackOff)
		{
			document.getElementById("btnMuteCombat").src = attackOn;
			createCookie('attack','true',30);
		}
		else
		{
			document.getElementById("btnMuteCombat").src = attackOff;
			createCookie('attack','false',30);
		}
	};*/
}

if(document.getElementById("chatinput") !== null){
	document.getElementById("chatinput").addEventListener("keydown", function(e) {
		if (!e) { var e = window.event; }
		if (e.keyCode == 13) { childCount++;}
	}, false);
}

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
	if( document.getElementById("btnMutePalais").src  ===palaisOn)
	{
		var newMessageSound = new Audio('http://up.meewan.fr/data/meewan/newemail.ogg');
		newMessageSound.play();
	}
}

function titleChangeNumber(number){
	document.title="("+number+") " + document.title;
}

function newAttack(){
	if($("#cbtbadge").attr("style")=="display: block;" && document.getElementById("btnMuteCombat").src === attackOn){
		var newMessageSound = new Audio('http://up.meewan.fr/data/meewan/4212.ogg');
		newMessageSound.play();
	}
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
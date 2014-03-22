var theTitle=document.title;
var check = self.setInterval(function(){testNewMessageChat()},100);
var childCount=$("#chatmsgtable tbody").children().length;
var count = 0;
var lolchat = {};
window.onclick=function(){
	document.title=theTitle;
	count=0;
}
window.onload=function(){
	lolchat.color.putButton();
	lolchat.bdm.open();
	lolchat.bdm.createTable();
	lolchat.bdm.temp();
	lolchat.bdm.getByMembre('0',lolchat.bdm.loadColorMembre);
	
	document.getElementById("editDefaultBtn").onclick=function(){lolchat.color.edit('0');};
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
	var newMessageSound = new Audio('bip.mp3');
	newMessageSound.play();
}

function titleChangeNumber(number){
	document.title="("+number+") " + document.title;
}
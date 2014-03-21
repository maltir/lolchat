var theTitle=document.title;
var check = self.setInterval(function(){testNewMessageChat()},1);
var childCount=$("#chatmsgtable tbody").children().length;
var count = 0;
var maltir = {};
window.onclick=function(){
	document.title=theTitle;
	count=0;
}
window.onload=function(){
	maltir.color.putButton();
	maltir.bdm.open();
	maltir.bdm.createTable();
	maltir.bdm.temp();
	maltir.bdm.getByMembre(0,maltir.bdm.loadColorMembre);
}

document.getElementById("chatinput").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    if (e.keyCode == 13) { childCount++; }
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
	var newMessageSound = new Audio('bip.mp3');
	newMessageSound.play();
}

function titleChangeNumber(number){
	document.title="("+number+") " + document.title;
}

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }
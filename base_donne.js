lolchat.bdm = {};
lolchat.bdm.bd = null;
lolchat.bdm.table="color";
lolchat.bdm.bool = false;
	
setInterval(function(){lolchat.bdm.temp();},500);

lolchat.bdm.open=function(){
	var dbSize = 5 * 1024 * 1024; // 5MB
	lolchat.bdm.bd = openDatabase("patate","1.0","bd web pour lolchat",dbSize);
}

lolchat.bdm.onError = function(tx, e) {
	  alert("Une erreur est survenue: " + e.message);
	}
	
lolchat.bdm.onSuccess = function(tx, r) {
  //webbd.getAllTestItems(loadTestItems);
}

lolchat.bdm.createTable = function() {
		var bd = lolchat.bdm.bd;
		bd.transaction(function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS " +lolchat.bdm.table+
					  "(ID INTEGER PRIMARY KEY ASC, idperso TEXT, colormain TEXT , colorchucho TEXT , colorback TEXT, nom TEXT, img TEXT)", []);		  
		});
		lolchat.bdm.getAllColor(lolchat.bdm.test);
}

lolchat.bdm.addColor = function(id,color1,color2,color3,nom,img) {
		var bd = lolchat.bdm.bd;
		bd.transaction(function(tx){
			tx.executeSql("INSERT INTO "+lolchat.bdm.table+"(idperso,colormain,colorchucho,colorback,nom,img) VALUES (?,?,?,?,?,?)",
				[id,color1,color2,color3,nom,img],
				lolchat.bdm.onSuccess,
				lolchat.bdm.onError);
		   });
}

lolchat.bdm.getAllColor = function(renderFunc) {
	  var db = lolchat.bdm.bd;
	  db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM "+lolchat.bdm.table, [], renderFunc,
			lolchat.bdm.onError);
	  });
}

lolchat.bdm.deleteColor = function(id) {
	  var db = lolchat.bdm.bd;
	  db.transaction(function(tx){
		tx.executeSql("DELETE FROM "+lolchat.bdm.table+" WHERE ID=?", [id],
			lolchat.bdm.onSuccess,
			lolchat.bdm.onError);
		});
}

lolchat.bdm.updateColor = function(id,color1,color2,color3) {
	  var db = lolchat.bdm.bd;
	  db.transaction(function(tx){
		tx.executeSql("UPDATE "+lolchat.bdm.table+" SET colormain=? , colorchucho=? ,colorback=? WHERE idperso=?", [color1,color2,color3,id],
			lolchat.bdm.onSuccess,
			lolchat.bdm.onError);
		});
}

lolchat.bdm.loadColorItems=function(tx, rs) {
	  var rowOutput = "<tr><th>ID</th><th>texte</th><th>Supprimer</th></tr>";
	  var colorItems = document.getElementById("lolchatTable");
	  for (var i=0; i < rs.rows.length; i++) {
		rowOutput += lolchat.bdm.renderColor(rs.rows.item(i));
	  }

	  colorItems.innerHTML = rowOutput;
	}
	
lolchat.bdm.renderColor=function(row) {
  return "<tr><td>" + row.nom + "</td><td><a href='javascript:void(0);' onclick=\'webbd.deleteTest(" + row.ID +");\'>Supprimer</a></td></tr>";
}

lolchat.bdm.getByMembre=function(id,renderFunc){
	var db = lolchat.bdm.bd;
	  db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM "+lolchat.bdm.table+" WHERE idperso=?", [id], renderFunc,
			lolchat.bdm.onError);
	});
}

lolchat.bdm.loadColorMembre=function(tx, rs){
	var main = document.getElementById("colorMain");
	var chucho = document.getElementById("colorChucho");
	var back = document.getElementById("colorBack");

	main.value = rs.rows.item(0).colormain;
	chucho.value = rs.rows.item(0).colorchucho;
	back.value = rs.rows.item(0).colorback;
}

lolchat.bdm.temp = function(){
		if(lolchat.bdm.bool){
			lolchat.bdm.addColor('0','#000000','#666633','#FFFFFF','default','');
			lolchat.bdm.bool = false;
		}
	}
	
lolchat.bdm.test = function(tx, rs){
	if(rs.rows.length == 0){
		lolchat.bdm.bool = true;
	}
}
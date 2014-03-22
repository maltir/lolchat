maltir.bdm = {};
maltir.bdm.bd = null;
maltir.bdm.table="color";
maltir.bdm.bool = false;
	
setInterval(function(){maltir.bdm.temp();},500);

maltir.bdm.open=function(){
	var dbSize = 5 * 1024 * 1024; // 5MB
	maltir.bdm.bd = openDatabase("patate","1.0","bd web pour lolchat",dbSize);
}

maltir.bdm.onError = function(tx, e) {
	  alert("Une erreur est survenue: " + e.message);
	}
	
maltir.bdm.onSuccess = function(tx, r) {
  //webbd.getAllTestItems(loadTestItems);
}

maltir.bdm.createTable = function() {
		var bd = maltir.bdm.bd;
		bd.transaction(function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS " +maltir.bdm.table+
					  "(ID INTEGER PRIMARY KEY ASC, idperso TEXT, colormain TEXT , colorchucho TEXT , colorback TEXT, nom TEXT, img TEXT)", []);		  
		});
		maltir.bdm.getAllColor(maltir.bdm.test);
}

maltir.bdm.addColor = function(id,color1,color2,color3,nom,img) {
		var bd = maltir.bdm.bd;
		bd.transaction(function(tx){
			tx.executeSql("INSERT INTO "+maltir.bdm.table+"(idperso,colormain,colorchucho,colorback,nom,img) VALUES (?,?,?,?,?,?)",
				[id,color1,color2,color3,nom,img],
				maltir.bdm.onSuccess,
				maltir.bdm.onError);
		   });
}

maltir.bdm.getAllColor = function(renderFunc) {
	  var db = maltir.bdm.bd;
	  db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM "+maltir.bdm.table, [], renderFunc,
			maltir.bdm.onError);
	  });
}

maltir.bdm.deleteColor = function(id) {
	  var db = maltir.bdm.bd;
	  db.transaction(function(tx){
		tx.executeSql("DELETE FROM "+maltir.bdm.table+" WHERE ID=?", [id],
			maltir.bdm.onSuccess,
			maltir.bdm.onError);
		});
}

maltir.bdm.loadColorItems=function(tx, rs) {
	  var rowOutput = "<tr><th>ID</th><th>texte</th><th>Supprimer</th></tr>";
	  var colorItems = document.getElementById("maltirTable");
	  for (var i=0; i < rs.rows.length; i++) {
		rowOutput += maltir.bdm.renderColor(rs.rows.item(i));
	  }

	  colorItems.innerHTML = rowOutput;
	}
	
maltir.bdm.renderColor=function(row) {
  return "<tr><td>" + row.nom + "</td><td><a href='javascript:void(0);' onclick=\'webbd.deleteTest(" + row.ID +");\'>Supprimer</a></td></tr>";
}

maltir.bdm.getByMembre=function(id,renderFunc){
	var db = maltir.bdm.bd;
	  db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM "+maltir.bdm.table+" WHERE idperso=?", [id], renderFunc,
			maltir.bdm.onError);
	});
}

maltir.bdm.loadColorMembre=function(tx, rs){
	var main = document.getElementById("colorMain");
	var chucho = document.getElementById("colorChucho");
	var back = document.getElementById("colorBack");

	main.value = rs.rows.item(0).colormain;
	chucho.value = rs.rows.item(0).colorchucho;
	back.value = rs.rows.item(0).colorback;
}

maltir.bdm.temp = function(){
		if(maltir.bdm.bool){
			maltir.bdm.addColor('0','#000000','#666633','#FFFFFF','default','');
			maltir.bdm.bool = false;
		}
	}
	
maltir.bdm.test = function(tx, rs){
	if(rs.rows.length == 0){
		maltir.bdm.bool = true;
	}
}
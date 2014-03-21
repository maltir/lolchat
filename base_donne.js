maltir.bdm = {};
maltir.bdm.bd = null;
maltir.bdm.table="color";
maltir.bdm.insert=null;

maltir.bdm.open=function(){
	var dbSize = 5 * 1024 * 1024;
	maltir.bdm.bd = openDatabase("toast","1.0","bd web pour lolchat",dbSize);
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
			//tx.executeSql("INSERT IGNORE INTO " +maltir.bdm.table+ " SET ID=1, idperso='0', colormain='#000000', colorchucho='#666633', colorback='#FFFFFF', nom='default', img=''",[] );		  
		});
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
	if(rs.rows.item(1).idperso == '0'){
		var main = document.getElementById("colorMain");
		var chucho = document.getElementById("colorChucho");
		var back = document.getElementById("colorBack");
		alert(rs.rows.item(1).colormain);
		alert(rs.rows.item(1).colorchucho);
		alert(rs.rows.item(1).colorback);
		main.value = rs.rows.item(1).colormain;
		chucho.value = rs.rows.item(1).colorchucho;
		back.value = rs.rows.item(1).colorback;
	}
}

maltir.bdm.verifInsert=function(){
	var db = maltir.bdm.bd;
	  db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM "+maltir.bdm.table, [], maltir.bdm.checkSiVide,
			maltir.bdm.onError);
	});
}

maltir.bdm.checkSiVide=function(tx, rs){
	if(rs.rows.length >= 1){
		maltir.bdm.insert = false;
	}else{
		maltir.bdm.insert = true;
	}
}

maltir.bdm.insertDefault=function(){
	maltir.bdm.verifInsert();
	while(maltir.bdm.insert === null){
		if(maltir.bdm.insert){
			var db = maltir.bdm.bd;
		  db.transaction(function(tx){
			tx.executeSql("INSERT INTO "+maltir.bdm.table+"(idperso,colormain,colorchucho,colorback,nom,img) VALUES ('0','#000000','#666633','#FFFFFF','default','')",
			[],
			maltir.bdm.onSuccess,
			maltir.bdm.onError);
			});
		}
	}
}
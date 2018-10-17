$(document).ready(function(){

	var home;
	$(".btn-savehome").click(function(){
		var nameHome = $(".nameHome").val();
		saveHome(nameHome);
	})
	function saveHome(nameHome){
		$.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({ nameHome:nameHome }),
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/createhome"
		}).done(function(data, textStatus, xhr){
			status_create = xhr.status;
		});
	}

	function getHome(nameHome){
		$.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({ nameHome:nameHome }),
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome"
		}).done(function(data, textStatus, xhr){
			home = data;
		});
		$(".nameHome").val(home.nameHome);
		$(".idHome").val(home.idHome);
	}
});

$(document).ready(function(){

	var home;
	var status_create;
	var userinfo;
	// $(".btn-savehome").click(function(){
	// 	var nameHome = $(".nameHome").val();
	// 	saveHome(nameHome);
	// })
	var getUserName = localStorage.getItem("username");

	var homenum=0;
	$(".addhome-btn").click(function(){
		setHomeName();
	});
	var listHome = getUser(getUserName).home;
	for(homenum; homenum<listHome.length; homenum++){
		appendHome(homenum,listHome[homenum].nameHome);
		$(".nameHome"+homenum).val(listHome[homenum].nameHome);
		$(".idHome"+homenum).val(listHome[homenum].idHome);
		deleteHome(homenum);
		detailHome(homenum);
	}

	function getUser(username){
		$.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost/getaccount/"+username
		}).done(function(data, textStatus, xhr){
			userinfo = data;
		});
		return userinfo;
	}

	function saveHome(nameHome){
		$.ajax({
			async : false,
			method: "post",
			data: JSON.stringify({ nameHome:nameHome}),
			contentType: "application/json",
			url: "http://localhost/smarthome/createhome/"+ getUserName
		}).done(function(data, textStatus, xhr){
			status_create = xhr.status;
		}).fail(function(data, textStatus, xhr){
			 status_create = data.status;
		});
		return status_create;
	}

	function getHome(nameHome, homecount){
		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost/smarthome/gethome/"+nameHome
		}).done(function(data, textStatus, xhr){
			home = data;
		});
		$(".nameHome"+homecount).html(home.nameHome);
		$(".idHome"+homecount).html(home.idHome);
	}

	function getListHome(){
		$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost/smarthome/gethome/"+nameHome
		}).done(function(data, textStatus, xhr){
			home = data;
		})
	}

	function setHomeName(){
		$(".ok-btn").click(function(){
			var homename = $(".homename").val();
			if(saveHome(homename)==302){
				$("p.anncounce").css("display", "block");
			}else{
				appendHome(homenum, homename);
				getHome(homename, homenum);
				deleteHome(homenum);
			}
		})
		homenum++;
	}

	function deleteHome(homecount){
		$(".del-btn"+homecount).click(function(){
			var idhome = $(".idHome"+homecount).val();
			$.ajax({
				method: "delete",
				data: JSON.stringify({ idHome:idhome }),
				contentType: "application/json",
				url: "http://localhost/smarthome/deletehome/"+idhome
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			}).fail(function(data, textStatus, xhr){
				 status_create = data.status;
			});
			if(status_create==200){
				$(".homeobject"+homecount).remove();
			}
		})
	}//review here

	function detailHome(homecount){
		$(".detail-btn"+homecount).click(function(){
			document.location.href = "newroom.html"
		})
	}

	function appendHome(homecount, homename){
		$(".row").append(
			'<div class="col-sm-4 homeobject'+homecount+'" style= "padding-bottom:20px !important;">'
				+'<div class="card">'
					+'<div class="view overlay">'
						+'<a><div class="mask rgba-white-slight"></div></a>'
					+'</div>'
					+'<div class="card-body elegant-color white-text rounded-bottom">'
						+'<a class="activator waves-effect mr-4"><i class="fa fa-share-alt white-text"></i></a>'
						+'<h4 class="card-title nameHome'+homecount+'">'+homename+'</h4>'
						+'<h4 class="card-title idHome'+homecount+'" id = "homeid"></h4>'
						+'<hr class="hr-light">'
						+'<p class="card-text white-text mb-4">Some quick example</p>'
						+'<a href="#" class="btn btn-primary detail-btn'+homecount+'">Detail</a>'
						+'<a href="#" class="btn btn-primary del-btn'+homecount+'" id= "btn-delete">Delete</a>'
						+'<a href="#" class="btn btn-primary edit-btn'+homecount+'" id= "btn-delete">Edit</a>'
					+'</div>'
				+'</div>'
			+'</div>'
		)
	}
});

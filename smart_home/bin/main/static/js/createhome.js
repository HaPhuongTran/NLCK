$(document).ready(function(){

	// var home;
	// $(".btn-savehome").click(function(){
	// 	var nameHome = $(".nameHome").val();
	// 	saveHome(nameHome);
	// })
	// function saveHome(nameHome){
	// 	$.ajax({
	// 		async : false,
	// 		method: "post",
	// 		data: JSON.stringify({ nameHome:nameHome }),
	// 		contentType: "application/json",
	// 		url: "http://localhost:8080/smarthome/createhome"
	// 	}).done(function(data, textStatus, xhr){
	// 		status_create = xhr.status;
	// 	});
	// }

	// function getHome(nameHome){
	// 	$.ajax({
	// 		async : false,
	// 		method: "post",
	// 		data: JSON.stringify({ nameHome:nameHome }),
	// 		contentType: "application/json",
	// 		url: "http://localhost:8080/smarthome/gethome"
	// 	}).done(function(data, textStatus, xhr){
	// 		home = data;
	// 	});
	// 	$(".nameHome").val(home.nameHome);
	// 	$(".idHome").val(home.idHome);
	// }
	var homecount = 0;
	$(".addhome-btn").click(function(){
		appendHome(0);
	});

	function appendHome(homecount){
		$(".row").append(
			'<div class="col-sm-4">'
				+'<div class="card">'
					+'<div class="view overlay">'
						+'<img class="card-img-top" src="" alt="Card image cap">'
						+'<a><div class="mask rgba-white-slight"></div></a>'
					+'</div>'
					+'<div class="card-body elegant-color white-text rounded-bottom">'
						+'<a class="activator waves-effect mr-4"><i class="fa fa-share-alt white-text"></i></a>'
						+'<h4 class="card-title">Card title</h4>'
						+'<hr class="hr-light">'
						+'<p class="card-text white-text mb-4">Some quick example</p>'
						+'<a href="#!" class="white-text d-flex justify-content-end"><h5>Read more <i class="fa fa-angle-double-right"></i></h5></a>'
					+'</div>'
				+'</div>'
			+'</div>'
		)
	}
});

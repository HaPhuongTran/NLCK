// Animations init
new WOW().init();
$(document).ready(function(){
	var status_create = 0;
	$(".signUp").click(function(){
		var username = $(".uName").val();
		var password = $(".pWord").val();
		var email = $(".uEmail").val();

		// $.ajax({
		// 	async : false,
		// 	method: "post",
		// 	data: JSON.stringify({ nameHome:nameHome }),
		// 	contentType: "application/json",
		// 	url: "http://localhost:8080/smarthome/createhome"
		// }).done(function(data, textStatus, xhr){
		// 	status_create = xhr.status;
		// });

		$.ajax({
			async:false,
			method: "post",
			data: JSON.stringify({ userName: username, 	password:password, email:email }),
			contentType: "application/json",
			url: "http://localhost:80/createaccount"
		}).done(function(data, textStatus, xhr){
			status_create = xhr.status;
		});

		if(status_create == 201){
			// localStorage.setItem("storageNameHome",nameHome);
			// document.location.href = "newhome.html";
			alert("Create Account success. ");
		}else if(status_create == 403){
			alert("Username already exist");
		}
	});
});
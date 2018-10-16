// Animations init
new WOW().init();

$(document).ready(function(){

	var username;
	var password;

	$(".login-form").load("model_login.html");
	$(".alert").hide();
	var status_create = 0;

	$(".signUp").click(function(){
		createAccount();
	});

	$(".btn-login").click(function(){
		username = $(".nameLogin").val();
		password = $(".passLogin").val();
		login(username, password);
	});

	function login(username, password){
		$.ajax({
		async:false,
		method: "post",
		data: JSON.stringify({ userName: username, 	password:password}),
		contentType: "application/json",
		url: "http://localhost:80/login"
		})
		// .done(function(data, textStatus, xhr){
		// 	status_create = textStatus;
		// }).fail(function(data, textStatus, xhr){
		// 	 status_create = textStatus;
		// });
	}

	function createAccount(){
		username = $(".uName").val();
		password = $(".pWord").val();
		var email = $(".uEmail").val();

		$.ajax({
		async:false,
		method: "post",
		data: JSON.stringify({ userName: username, 	password:password, email:email }),
		contentType: "application/json",
		url: "http://localhost:80/createaccount"
		}).done(function(data, textStatus, xhr){
			status_create = textStatus;
		}).fail(function(data, textStatus, xhr){
			 status_create = textStatus;
		});
		signUpAccount();
	}

	function signUpAccount(){

		// $.ajax({
		// 	async : false,
		// 	method: "post",
		// 	data: JSON.stringify({ nameHome:nameHome }),
		// 	contentType: "application/json",
		// 	url: "http://localhost:8080/smarthome/createhome"
		// }).done(function(data, textStatus, xhr){
		// 	status_create = xhr.status;
		// });
		if(status_create == "success"){
			// localStorage.setItem("storageNameHome",nameHome);
			// document.location.href = "newhome.html";
			$(".uName").css("border-color", "");
			$(".alert strong").html("Create Account success. Please login to start!!!");
			$(".alert").show('slow').delay(1000);
			$(".alert").hide('slow');
		}else if(status_create == "error"){
			$(".uName").css("border-color", "red");
			$(".alert strong").html("Username already exist");
			$(".alert").show('slow').delay(1000);
			$(".alert").hide('slow');
		}
	}
});
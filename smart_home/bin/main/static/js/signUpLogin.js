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
		if(login(username, password)==0){
			document.location.href = "createhome.html";
		}
		else{
			alertAnnounce("Username or Password is not correct.");
		}
	});

	function login(username, password){
		$.ajax({
		async:false,
		method: "post",
		data: JSON.stringify({ userName: username, 	password:password}),
		contentType: "application/json",
		url: "http://localhost:8080/login"
		})
		.done(function(data, textStatus, xhr){
			status_create = xhr.status;
		}).fail(function(data, textStatus, xhr){
			 status_create = xhr.status;
		});

		return status;
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
		url: "http://localhost:8080/createaccount"
		}).done(function(data, textStatus, xhr){
			status_create = textStatus;
		}).fail(function(data, textStatus, xhr){
			 status_create = textStatus;
		});
		signUpAccount();
	}

	function signUpAccount(){
		if(status_create == "success"){
			// localStorage.setItem("storageNameHome",nameHome);
			$(".uName").css("border-color", "");
			alertAnnounce("Create Account success. Please login to start!!!");
		}else if(status_create == "error"){
			$(".uName").css("border-color", "red");
			alertAnnounce("Username already exist");
		}
	}

	function alertAnnounce(stringAnnounce){
		$(".alert strong").html(stringAnnounce);
		$(".alert").show('slow').delay(1000);
		$(".alert").hide('slow');
	}
});
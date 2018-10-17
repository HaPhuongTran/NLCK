// Animations init
new WOW().init();

$(document).ready(function(){

	$(".login-form").load("model_login.html");
	var username;
	var password;

	$(".alert").hide();
	var status_create = 0;

	$(".login").click(function(){
		listenLogin();
	});

	$(".signUp").click(function(){
		username = $(".uName").val();
		password = $(".pWord").val();
		var email = $(".uEmail").val();
		if(username.length == 0){
			$(".uName").css("border-color", "red");
			alertAnnounce("Please input username");
		}else if(password.length ==0){
			$(".pWord").css("border-color", "red");
			alertAnnounce("Please input password");
		}else{
			createAccount(username, password,email);
		}
	});


	function listenLogin(){
		$(".login-btn").click(function(){
			username = $(".nameLogin").val();
			password = $(".passLogin").val();
			if(login(username, password)== 302){
				localStorage.setItem("username",username);
				document.location.href = "newhome.html";
			}
			else{
				$(".modal-content p").attr('display', '');//review here
			}
		});
	}

	function login(username, password){
		$.ajax({
		async:false,
		method: "post",
		data: JSON.stringify({ userName: username, 	password:password}),
		contentType: "application/json",
		url: "http://localhost:80/login"
		})
		.done(function(data, textStatus, xhr){
			status_create = xhr.status;
		}).fail(function(data, textStatus, xhr){
			 status_create = data.status;
		});

		return status_create;
	}

	function createAccount(username, password, email){
		$.ajax({
		async:false,
		method: "post",
		data: JSON.stringify({ userName: username, 	password:password, email:email }),
		contentType: "application/json",
		url: "http://localhost/createaccount"
		}).done(function(data, textStatus, xhr){
			status_create = xhr.status;
		}).fail(function(data, textStatus, xhr){
			status_create = data.status;
		});
		signUpAccount();
	}

	function signUpAccount(){
		if(status_create == 201){
			$(".uName").css("border-color", "");
			$(".pWord").css("border-color", "");
			alertAnnounce("Create Account success. Please login to start!!!");
		}else if(status_create == 409){
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
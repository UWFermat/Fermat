$("button#login_button").on("click", function(event){
	event.preventDefault();
	var loginEmail = $("input#login_email").val();
	var loginPassword = $("input#login_password").val();

	$.ajax({
		type: "post",
		url: "/api/v1/login",
		data:{
			email: loginEmail,
			password: loginPassword
		},
		success: function(response){
			alert("Login Success!")
		},
		error: function(response){
			// console.log(response);
			alert("Bad Username or Password! Please try again!");
		}


	})


});
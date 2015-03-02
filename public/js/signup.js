$("button#register_button").on("click", function(event){
	event.preventDefault();

	var signupFirstName = $("input#register_first_name").val();
	var signupLastName = $("input#register_last_name").val();
	var signupEmail = $("input#register_email").val();
	var signupPassword = $("input#register_password").val();

	$.ajax({
		type: "post",
		url: "/api/v1/signup",
		data:{
			first_name: signupFirstName,
			last_name: signupLastName,
			email: signupEmail,
			password: signupPassword
		},
		success: function(response){
			alert("Signup Success!")
		},
		error: function(response){
			// console.log(response);
			alert("Username already exists! Please try another one");
		}


	})


});

function showOrHideButton(){
        if (passwordInputPass.value.length > 0) {
                document.querySelector("#pass").classList.add("input-password");
                document.getElementById("toggle-password-pass").classList.remove("d-none");
    } else {
    document.querySelector("#pass").classList.remove("input-password");
    document.getElementById("toggle-password-pass").classList.add("d-none");
    }
}

function showOrHideButtonNewpass(){
    if (passwordInputPass.value.length > 0) {
	document.querySelector("#newpass").classList.add("input-password");
	document.getElementById("toggle-password-newpass").classList.remove("d-none");
	$("#toggle-password-pass").prop('tabindex','-1')
    } else {
	document.querySelector("#newpass").classList.remove("input-password");
	document.getElementById("toggle-password-newpass").classList.add("d-none");
    }
}

var ShowPasswordTogglePass = document.querySelector("#pass");
ShowPasswordTogglePass.addEventListener("keyup", showOrHideButton);
const passwordInputPass = document.querySelector("#pass");
const togglePasswordButtonPass = document.getElementById("toggle-password-pass");
togglePasswordButtonPass.addEventListener("click", togglePassword);
function togglePassword() {
    if (passwordInputPass.type === "password") {
        passwordInputPass.type = "text";
        togglePasswordButtonPass.setAttribute("aria-label", "Hide password.")
    } else {
        passwordInputPass.type = "password";
        togglePasswordButtonPass.setAttribute("aria-label", "Show password as plain text.")
    }
}

var ShowPasswordToggleNewpass = document.querySelector("#newpass");
ShowPasswordToggleNewpass.addEventListener("keyup", showOrHideButtonNewpass);
const passwordInputNewpass = document.querySelector("#newpass");
const togglePasswordButtonNewpass = document.getElementById("toggle-password-newpass");
togglePasswordButtonNewpass.addEventListener("click", togglePasswordNewpass);
function togglePasswordNewpass() {
    if (passwordInputNewpass.type === "password") {
        passwordInputNewpass.type = "text";
        togglePasswordButtonNewpass.setAttribute("aria-label", "Hide password.")
    } else {
        passwordInputNewpass.type = "password";
        togglePasswordButtonNewpass.setAttribute("aria-label", "Show password as plain text.")
    }
}

$('#pass').keydown(function (e) {
        var key = e.which;
        if(key == 13 || key == 9)  // the enter key code
        {
                $('#newpass').focus();
                return false;
        }
});

$('#newpass').keydown(function (e) {
	var key = e.which;
        if(key == 13 || key == 9)  // the enter key code
        {
		$("#newpass").blur();
       	    	setTimeout(function () {
			$('#passwrd').focus();
		}, 100);
                return false;
        }
});

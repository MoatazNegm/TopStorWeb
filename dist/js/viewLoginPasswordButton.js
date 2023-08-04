var ShowPasswordTogglePass = document.querySelector("#pass");

function showOrHideButton(){
        if (passwordInputPass.value.length > 0) {
                document.querySelector("#pass").classList.add("input-password");
                document.getElementById("toggle-password-pass").classList.remove("d-none");
    } else {
    document.querySelector("#pass").classList.remove("input-password");
    document.getElementById("toggle-password-pass").classList.add("d-none");
    }
}

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


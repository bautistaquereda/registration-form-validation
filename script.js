document.addEventListener("DOMContentLoaded", function(){

    const registrationForm = document.getElementById("registrationForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorConfirmPassword = document.getElementById("errorConfirmPassword");
    const showHideButton = document.getElementById("show-hide");
    
    registrationForm.addEventListener("submit", function(event){
        event.preventDefault();
        validateForm();
    })

    emailInput.addEventListener("blur", function(){
        validateEmail();
    })

    emailInput.addEventListener("change", function(){
        hideError(errorEmail);
    })

    passwordInput.addEventListener("blur", function(){
        validatePassword();
    })

    passwordInput.addEventListener("change", function(){
        hideError(errorPassword);
    })

    confirmPasswordInput.addEventListener("blur", function(){
        validatePasswordMatch();
    })

    confirmPasswordInput.addEventListener("change", function(){
        hideError(errorConfirmPassword);
    })

    showHideButton.addEventListener("click", function(){
        if(passwordInput.type == "password"){
            passwordInput.type = "text"
            confirmPasswordInput.type = "text"
        } else {
            passwordInput.type = "password"
            confirmPasswordInput.type = "password"
        }
    })

    function validateForm(){
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        const arePasswordMatching = validatePasswordMatch();

        if(isValidEmail && isValidPassword && arePasswordMatching){
            saveToLocalStorage();
            alert("Registration completed.");
        }
    }

    function validateEmail(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = emailInput.value.trim();

        if(!emailRegex.test(emailValue)){
            showError(errorEmail, "Enter a valid email.");

            return false;
        }
        return true;
    }

    function validatePassword(){
    const passwordValue = passwordInput.value.trim();

    const hasMinLength = passwordValue.length >= 6;
    const hasUpperCase = /[A-Z]/.test(passwordValue);
    const hasSymbol = /[^A-Za-z0-9]/.test(passwordValue);
    const hasNumber = /[0-9]/.test(passwordValue);

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;

    if(!hasMinLength){
        showError(errorPassword, "Password must be at least 6 characters long.");
        return false;
    }
    if(!hasUpperCase){
        showError(errorPassword, "Password must contain at least 1 uppercase letter.");
        return false;
    }
    if(!hasNumber){
        showError(errorPassword, "Password must contain at least 1 number.");
        return false;
    }
    if(!hasSymbol){
        showError(errorPassword, "Password must contain at least 1 symbol.");
        return false;
    }

    if(!passwordRegex.test(passwordValue)){
        showError(errorPassword, "Password must be at least 6 characters long, include 1 number, 1 uppercase letter and 1 symbol.");
        return false;
    }

    return true;
}

    function validatePasswordMatch(){
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

    if(confirmPasswordValue !== passwordValue){
        showError(errorConfirmPassword, "Passwords do not match.")

        return false;
    }
    return true;

    }
    
    function showError (errorElement, message){
        errorElement.innerHTML = message;
        errorElement.style.display = "block";
    }

    function hideError (errorElement){
        errorElement.innerHTML = "";
        errorElement.style.display = "none"; 
    }

    function saveToLocalStorage(){
        const emailValue = emailInput.value.trim();
        localStorage.setItem("email", emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON(){
        return {
            "email": emailInput.value,
            "password": passwordInput.value,
        }
    }

})
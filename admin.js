// =====================================
// 4SHOYULZ CART
// Admin Login
// =====================================

const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("password");
const error = document.getElementById("error");

// Change this later!
const ADMIN_PASSWORD = "4shoyulz";

loginBtn.addEventListener("click", login);

passwordInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        login();

    }

});

function login(){

    const password = passwordInput.value.trim();

    if(password === ADMIN_PASSWORD){

        sessionStorage.setItem("adminLoggedIn","true");

        window.location.href = "dashboard.html";

    }else{

        error.textContent = "Incorrect password.";

        passwordInput.value = "";

    }

}

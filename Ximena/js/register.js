document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById("registerForm");
    const messageArea = document.getElementById("message");
    
    if (!form || !messageArea) {
        console.error("ERROR: Form elements not found");
        return;
    }
    
    function showMessage(text, type) {
        messageArea.innerHTML = `
            <div class="alert alert-${type} mb-3" role="alert">
                ${text}
            </div>
        `;
    }
    
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    function handleRegistration(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value.trim();
        const fullName = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
        if (!username || !fullName || !email || !password || !confirmPassword) {
            showMessage("Please fill all fields", "warning");
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage("Please enter a valid email", "warning");
            return;
        }
        
        if (!validatePassword(password)) {
            showMessage("Password must have at least 6 characters", "warning");
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage("Passwords do not match", "danger");
            return;
        }
        
        const userData = {
            usuario: username,
            nombreCompleto: fullName,
            email: email,
            contraseña: password,
            fechaRegistro: new Date().toLocaleDateString()
        };
        
        const existingUser = localStorage.getItem("taskflow_usuario");
        if (existingUser) {
            const existingData = JSON.parse(existingUser);
            if (existingData.usuario === username) {
                showMessage("This username is already registered", "danger");
                return;
            }
        }
        
        localStorage.setItem("taskflow_usuario", JSON.stringify(userData));
        
        showMessage("Registration successful! You can now log in.", "success");
        
        form.reset();
        
        setTimeout(function() {
            window.location.href = "login.html";
        }, 1000);
    }
    
    form.addEventListener("submit", handleRegistration);
    
    console.log("Registration system initialized correctly");
});
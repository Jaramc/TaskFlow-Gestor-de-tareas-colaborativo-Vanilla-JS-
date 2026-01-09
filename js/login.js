document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById("loginForm");
    const messageArea = document.getElementById("message");
    
    function showMessage(text, type) {
        messageArea.innerHTML = `
            <div class="alert alert-${type} mb-3" role="alert">
                ${text}
            </div>
        `;
    }
    
    function handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value;
        
        if (username === "" || password === "") {
            showMessage("Please fill all fields", "warning");
            return;
        }
        
        const savedUser = localStorage.getItem("taskflow_usuario");
        
        if (!savedUser) {
            showMessage("No users registered. Please register first.", "danger");
            return;
        }
        
        const userData = JSON.parse(savedUser);
        
        if (username === userData.usuario && password === userData.contraseña) {
            showMessage(`Welcome ${userData.nombreCompleto}!`, "success");
            
            localStorage.setItem("taskflow_sesion_activa", "true");
            localStorage.setItem("taskflow_usuario_actual", userData.usuario);
            
            setTimeout(function() {
                window.location.href = "../index.html";
            }, 1500);
            
        } else {
            showMessage("Incorrect username or password", "danger");
        }
    }
    
    form.addEventListener("submit", handleLogin);
    
    console.log("Login system initialized correctly");
});
function updateTime() {
    const now = new Date();
    
    const timeElement = document.getElementById("currentTime");

    if (timeElement) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        timeElement.textContent = now.toLocaleDateString("en-US", options);
    }
}

function verifySession() {
    const activeSession = localStorage.getItem("taskflow_sesion_activa");
    const currentUser = localStorage.getItem("taskflow_usuario_actual");
    
    if (!activeSession || activeSession !== "true") {
        alert("You must log in to access the dashboard");
        window.location.href = "auth/login.html";
        return false;
    }
    
    showUserInfo(currentUser);
    return true;
}

function showUserInfo(userName) {
    const userData = localStorage.getItem("taskflow_usuario");
    
    if (userData) {
        const user = JSON.parse(userData);
        
        const userElement = document.getElementById("userName");
        if (userElement) {
            userElement.textContent = user.nombreCompleto;
        }
        
        console.log(`Active user: ${user.nombreCompleto}`);
    }
}

function logOut() {
    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("taskflow_sesion_activa");
        localStorage.removeItem("taskflow_usuario_actual");
        
        window.location.href = "auth/login.html";
    }
}

function initializeTaskFlow() {
    console.log("Initializing TaskFlow...");
    
    if (!verifySession()) {
        return;
    }
    
    updateTime();
    
    setInterval(updateTime, 60000);
    
    const logoutButton = document.getElementById("logoutBtn");
    if (logoutButton) {
        logoutButton.addEventListener("click", logOut);
    }
    
    console.log('TaskFlow initialized correctly');
}

document.addEventListener('DOMContentLoaded', initializeTaskFlow);
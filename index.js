function changeCalendarBackground(imageName) {
    const featuredPanel = document.querySelector('.featured-panel');
    if (featuredPanel) {
        featuredPanel.classList.remove('starry-night', 'sunset', 'ocean');
        
        const imageUrl = `Imagenes/${imageName}`;
        featuredPanel.style.backgroundImage = `
            linear-gradient(to bottom, 
                rgba(0, 20, 40, 0.3) 0%, 
                rgba(0, 10, 30, 0.4) 100%),
            url('${imageUrl}')`;
    }
}

function setCalendarTheme(theme) {
    const featuredPanel = document.querySelector('.featured-panel');
    if (featuredPanel) {
        featuredPanel.classList.remove('starry-night', 'sunset', 'ocean');
        
        if (theme && theme !== 'default') {
            featuredPanel.classList.add(theme);
        }
    }
}

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
        window.location.href = "Ximena/login.html";
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
        
        window.location.href = "Ximena/login.html";
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
    
    const backgroundSelector = document.getElementById("backgroundSelector");
    if (backgroundSelector) {
        backgroundSelector.addEventListener("change", function() {
            const selectedImage = this.value;
            changeCalendarBackground(selectedImage);
        });
    }
    
    initializeCalendar();
    
    console.log('TaskFlow initialized correctly');
}

function initializeCalendar() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const today = new Date();
    let selectedDate = today;
    
    function updateFeaturedDisplay(date) {
        const monthYearElement = document.getElementById("monthYearDisplay");
        const largeDayElement = document.getElementById("largeDayDisplay");
        
        if (monthYearElement) {
            monthYearElement.textContent = `${monthNames[date.getMonth()].toUpperCase()} - ${date.getFullYear()}`;
        }
        
        if (largeDayElement) {
            largeDayElement.textContent = date.getDate();
        }
    }
    
    function generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const calendarDaysElement = document.getElementById("calendarDays");
        
        if (calendarDaysElement) {
            calendarDaysElement.innerHTML = "";
            
            for (let i = 0; i < 42; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                
                const dayElement = document.createElement("div");
                dayElement.className = "calendar-day";
                dayElement.textContent = currentDate.getDate();
                
                if (currentDate.getMonth() !== month) {
                    dayElement.classList.add("other-month");
                }
                
                if (currentDate.toDateString() === today.toDateString()) {
                    dayElement.classList.add("today");
                }
                
                if (currentDate.getDate() === 8 && currentDate.getMonth() === month) {
                    dayElement.classList.add("special");
                }
                
                if (currentDate.toDateString() === selectedDate.toDateString()) {
                    if (!dayElement.classList.contains("today") && !dayElement.classList.contains("special")) {
                        dayElement.classList.add("selected");
                    }
                }
                
                dayElement.addEventListener("click", function() {
                    if (currentDate.getMonth() === month) {
                        document.querySelectorAll(".calendar-day.selected").forEach(el => {
                            el.classList.remove("selected");
                        });
                        
                        if (!dayElement.classList.contains("today") && !dayElement.classList.contains("special")) {
                            dayElement.classList.add("selected");
                        }
                        
                        selectedDate = new Date(currentDate);
                        updateFeaturedDisplay(selectedDate);
                    }
                });
                
                calendarDaysElement.appendChild(dayElement);
            }
        }
        
        updateFeaturedDisplay(selectedDate);
    }
    
    const prevButton = document.getElementById("prevMonth");
    const nextButton = document.getElementById("nextMonth");
    const todayButton = document.querySelector(".today-button");
    
    if (prevButton) {
        prevButton.addEventListener("click", function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    if (todayButton) {
        todayButton.addEventListener("click", function() {
            const today = new Date();
            currentMonth = today.getMonth();
            currentYear = today.getFullYear();
            selectedDate = today;
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    generateCalendar(currentMonth, currentYear);
}

let timeLeft = 0;0
let timerId = null;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function startTimer() {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    
    if (timerId) return;
    startBtn.disabled = true;
    timerDisplay.classList.remove('completed');

    timerId = setInterval(() => {
        timeLeft++;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            timerDisplay.classList.add('completed');
            startBtn.disabled = false;
            alert('Time\'s up!');
        }
    }, 1000);
}

function resetTimer() {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    
    clearInterval(timerId);
    timerId = null;
    timeLeft = 0;
    timerDisplay.textContent = formatTime(timeLeft);
    timerDisplay.classList.remove('completed');
    startBtn.disabled = false;
}

function initializeTimer() {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    if (timerDisplay) {
        timerDisplay.textContent = formatTime(timeLeft);
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', startTimer);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTimer);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeTaskFlow();
    initializeTimer();
});
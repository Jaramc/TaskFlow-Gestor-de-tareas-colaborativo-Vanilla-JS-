// Function to change calendar background
function changeCalendarBackground(imageName) {
    const featuredPanel = document.querySelector('.featured-panel');
    if (featuredPanel) {
        // Remove existing background classes
        featuredPanel.classList.remove('starry-night', 'sunset', 'ocean');
        
        // Update background image
        const imageUrl = `Imagenes/${imageName}`;
        featuredPanel.style.backgroundImage = `
            linear-gradient(to bottom, 
                rgba(0, 20, 40, 0.3) 0%, 
                rgba(0, 10, 30, 0.4) 100%),
            url('${imageUrl}')`;
    }
}

// Function to set predefined themes
function setCalendarTheme(theme) {
    const featuredPanel = document.querySelector('.featured-panel');
    if (featuredPanel) {
        // Remove all theme classes
        featuredPanel.classList.remove('starry-night', 'sunset', 'ocean');
        
        // Add the selected theme class
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
    
    // Background selector event listener
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
            
            // Generate 6 weeks (42 days)
            for (let i = 0; i < 42; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                
                const dayElement = document.createElement("div");
                dayElement.className = "calendar-day";
                dayElement.textContent = currentDate.getDate();
                
                // Add classes for styling
                if (currentDate.getMonth() !== month) {
                    dayElement.classList.add("other-month");
                }
                
                // Today highlighting (day 13 with dark blue)
                if (currentDate.toDateString() === today.toDateString()) {
                    dayElement.classList.add("today");
                }
                
                // Special day highlighting (day 8 with pink) - matching the image
                if (currentDate.getDate() === 8 && currentDate.getMonth() === month) {
                    dayElement.classList.add("special");
                }
                
                // Selected date highlighting
                if (currentDate.toDateString() === selectedDate.toDateString()) {
                    if (!dayElement.classList.contains("today") && !dayElement.classList.contains("special")) {
                        dayElement.classList.add("selected");
                    }
                }
                
                // Click event listener
                dayElement.addEventListener("click", function() {
                    // Only select if it's in the current month
                    if (currentDate.getMonth() === month) {
                        // Remove previous selections (but keep today and special)
                        document.querySelectorAll(".calendar-day.selected").forEach(el => {
                            el.classList.remove("selected");
                        });
                        
                        // Add selection only if it's not today or special day
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
        
        // Update the featured display to show the current selected date
        updateFeaturedDisplay(selectedDate);
    }
    
    // Event listeners for navigation
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
    
    // Initialize the calendar
    generateCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', initializeTaskFlow);
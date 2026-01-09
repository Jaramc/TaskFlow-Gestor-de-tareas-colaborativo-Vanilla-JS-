let tasks = [
    { id: 1, title: "UI Wireframes", status: "progress" },
    { id: 2, title: "Mobile App", status: "pending" },
    { id: 3, title: "Dashboard Design", status: "done" }
];

function renderTasks() {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    tasks.forEach(task => {
        container.innerHTML += `
            <div class="task-card">
                <button class="delete-btn" data-id="${task.id}">✖</button>
                <div class="task-title">${task.title}</div>
                <div class="status ${task.status}">
                    ${task.status === "pending" ? "Pending" :
                        task.status === "progress" ? "In Progress" : "Completed"}
                </div>
            </div>
    `;
    });
}

/* ELIMINAR TAREA */
document.getElementById("taskList").addEventListener("click", e => {
if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    tasks = tasks.filter(task => task.id != id);
    renderTasks();
}
});

/* MODO OSCURO */
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark"));
});

if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
}

renderTasks();

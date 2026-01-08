let tasks = [];
const tasklist = document.getElementById("task-list");
const taskcounter = document.getElementById("task-counter");
const taskform = document.getElementById("task-form");
const filters = document.querySelectorAll(".filter-btn");

const title = document.getElementById("title");
const priority = document.getElementById("priority");

const taskModal = document.getElementById("taskModal");


function updatecounter() {
    taskcounter.textContent = `Tasks: ${tasks.length}`;
}
function rendertasks(filter = "All") {
    tasklist.innerHTML="";

    const filtered = tasks.filter(task => filter === "All" ? true : task.status === filter
    );

    filtered.forEach((task, index) => {
        const item = document.createElement("div");
        item.className = "list-group-item d-flex justify-content-between align-items-center"
        
        item.innerHTML = `
        <div>
            <h6 class="mb-1">${task.title}</h6>
            <span class="badge bg-secondary me-1">${task.status}</span>
            <span class="badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}">
            ${task.priority}
            </span>
        </div>
        <button class="btn btn-sm btn-outline-danger">Delete</button>
        `;

        item.querySelector("button").onclick = () => {
            tasks.splice(index, 1);
            updatecounter();
            rendertasks(btn.dataset.filter);
        };
        tasklist.appendChild(item);
    });
}
filters.forEach(btn => {
    btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    rendertasks();
    };
});

taskform.addEventListener("submit", e =>{
    e.preventDefault();
    tasks.push({
        title: title.value,
        status: "Pending",
        priority: priority.value
    });

    updatecounter();
    rendertasks();
    taskform.reset();
    bootstrap.Modal.getInstance(taskModal).hide();
});


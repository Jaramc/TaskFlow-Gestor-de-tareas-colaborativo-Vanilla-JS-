let tasks = [];
const tasklist = document.getElementById("task-list");
const taskcounter = document.getElementById("task-counter");
const taskform = document.getElementById("task-form");
const filters = document.querySelectorAll(".filter-btn");
const process = document.getElementById("status")

const STATUS_FLOW = ["Pending", "In Process", "Complete"];


const desc = document.getElementById("description");
const title = document.getElementById("title");
const priority = document.getElementById("priority");

const taskModal = document.getElementById("taskModal");

function getActiveFilter() {
    return document.querySelector(".filter-btn.active").dataset.filter;
}


function updatecounter() {
    taskcounter.textContent = `Tasks: ${tasks.length}`;
}
function rendertasks(filter = "All") {
    tasklist.innerHTML="";

    const filtered = tasks.filter(task => filter === "All" ? true : task.status === filter
    );

    filtered.forEach(task  => {
        const item = document.createElement("div");
        item.className = "list-group-item d-flex justify-content-between align-items-center"
        item.style="z-index: 2;"
        
        item.innerHTML = `
        <div class="w-100">
            <h4 class="mb-2">${task.title}</h4>
            <h6 class="mb-3 text-break me-3 fw-400">${task.desc}</h6>
            <span class="badge status-pill ${task.status.replace(" ", "-")}">${task.status}</span>
            <span class="mb-2 badge priority-pill ${task.priority}">${task.priority}</span>
        </div>
        <div class="d-flex gap-3 me-2">
            <div class="dropdown">
                <button 
                    class="btn btn-sm btn-outline-primary dropdown-toggle change-status"
                    type="button"
                    data-bs-display="static"
                    data-bs-toggle="dropdown">
                    
                    Change Status
                </button>
                <ul class="dropdown-menu status-menu">
                    <li><button class="dropdown-item" data-status="Pending">Pending</button></li>
                    <li><button class="dropdown-item" data-status="In Process">In Process</button></li>
                    <li><button class="dropdown-item" data-status="Complete">Complete</button></li>
                </ul>
            </div>
        <button class="btn btn-sm btn-outline-danger delete-task">Delete</button>
        `;
        item.querySelectorAll(".dropdown-item").forEach(option => {
            option.onclick = () => {
            task.status = option.dataset.status;
            rendertasks(getActiveFilter());
        };
    });
        item.querySelector(".delete-task").onclick = () => {
            tasks=tasks.filter(t => t.id !== task.id);
            updatecounter();
            rendertasks(getActiveFilter());
        };
        tasklist.appendChild(item);
    });
}
filters.forEach(btn => {
    btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    rendertasks(btn.dataset.filter);
    };
});

taskform.addEventListener("submit", e =>{
    e.preventDefault();
    tasks.push({
        id: Date.now(),
        title: title.value,
        desc: desc.value,
        status: "Pending",
        priority: priority.value
    });

    updatecounter();
    rendertasks();
    taskform.reset();
    bootstrap.Modal.getInstance(taskModal).hide();
});

